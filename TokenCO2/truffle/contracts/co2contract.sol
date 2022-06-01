pragma solidity ^0.5.5;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Detailed.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";


contract CO2Token is ERC20, ERC20Detailed {
    address payable owner;
    uint noOfCorporations = 0;
    uint noOfSellers = 0;

    struct corporation {
        address corporationAddress;
        string name;
        string logo;
        uint pctAllocated;
        uint CO2tokens;
    }

    struct Seller {
        address sellerAddress;
        string name;
        uint tokensForSale;
        uint pricePerToken;
    }


    mapping (uint => address) private corporateIndex;
    mapping (address => corporation) public balances;

    mapping (uint => address) private sellerIndex;
    mapping (address => Seller) public sellers;

    modifier onlyOwner {
        require(msg.sender == owner,"You do not have rights. Pleae contact your jurisdiction office!!!");
        _;
    }

    constructor(string memory name, uint initialSupply) ERC20Detailed("CarbonTokens","CO2",18) public {
        owner = msg.sender;
        corporateIndex[noOfCorporations] = owner;
        noOfCorporations++;
        balances[owner].corporationAddress = owner;
        balances[owner].name = name;
        mint(owner,initialSupply);
        // balances[owner].CO2tokens = initialSupply;

    }

    // function to mint tokens as and when needed. This can be only performed by the contract owner
    function mint(address recipient, uint amount) public onlyOwner {
        balances[recipient].CO2tokens += amount;
    }



    // function to add Corporation to the mapping. This can be only performed by the contract owner
    function addCorporation(address corpAddress, string memory name, uint pct_Allocated) public onlyOwner {
        balances[corpAddress].corporationAddress = corpAddress;
        balances[corpAddress].name = name;
        balances[corpAddress].pctAllocated = pct_Allocated;
        corporateIndex[noOfCorporations] = corpAddress;
        noOfCorporations++;
    }

    // function to allocate tokens from government treasury to individual corporations
    // function allocate(uint pctTotalAllocation) public onlyOwner {
        function allocate() public onlyOwner {
        uint tokensForAllocation = balances[owner].CO2tokens / (noOfCorporations -1);
        for(uint8 i=1; i< noOfCorporations; i++) {
            // uint tokensForAllocation = (balances[corporateIndex[i]].pctAllocated) * (balances[owner].CO2tokens * pctTotalAllocation);
            balances[owner].CO2tokens -= tokensForAllocation;
            balances[corporateIndex[i]].CO2tokens += tokensForAllocation;
        }
    }

    // function to Sell your tokens
    function executeSell(uint _tokensForSale, uint _pricePerToken) public {
        require (_tokensForSale <= balances[msg.sender].CO2tokens, "You can not sell more tokens than you hold. Please try again with lower tokens.");
        sellers[msg.sender].sellerAddress = msg.sender;
        sellers[msg.sender].name = balances[msg.sender].name;
        sellers[msg.sender].tokensForSale += _tokensForSale;
        sellers[msg.sender].pricePerToken = _pricePerToken;

        sellerIndex[noOfSellers] = msg.sender;
        noOfSellers++;
    }

    // function to display the sellers offering their tokens
    function viewSellInfo() public view returns (string memory, uint) {
        corporation memory sellerInfo = balances[msg.sender];
        return (sellerInfo.name, sellerInfo.CO2tokens);
    }

    //function to view all sellers in the market with their tokens and their prices. This should be called when Buy tab is clicked
    function viewSellers() public view returns (address[] memory, uint[] memory, uint[] memory) {
        address[] memory _sellerAddresses = new address[](noOfSellers);
        string[] memory _name = new string[](noOfSellers);
        uint[] memory _tokens = new uint[](noOfSellers);
        uint[] memory _priceTokens = new uint[](noOfSellers);

        for (uint i = 0; i< noOfSellers; i++) {
            Seller storage _seller = sellers[sellerIndex[i]];
            _sellerAddresses[i] = _seller.sellerAddress;
            _name[i] = _seller.name;
            _tokens[i] = _seller.tokensForSale;
            _priceTokens[i] = _seller.pricePerToken;
        }

        return (_sellerAddresses, _tokens, _priceTokens);
    }


    // function to view all sellers in the market with their token balances
    function viewDash() public view returns (address[] memory, uint[] memory) {
        address[] memory _dashAddresses = new address[](noOfCorporations);
        uint[] memory _tokens = new uint[](noOfCorporations);


        for (uint i = 1; i< noOfCorporations; i++) {
            corporation storage _corporation = balances[corporateIndex[i]];
            _dashAddresses[i] = _corporation.corporationAddress;
            _tokens[i] = _corporation.CO2tokens;
        }

        return (_dashAddresses, _tokens);
    }

    // function to buy tokens
    function executeBuy(address payable sellerAddress, uint _tokens, uint _pricePerToken) public payable {
        uint etherValue = _tokens * _pricePerToken;
        balances[msg.sender].CO2tokens += _tokens;
        balances[sellerAddress].CO2tokens -= _tokens;
        // owner.transfer(etherValue);
        // sellerAddress.transfer(etherValue);
        // address(this).transfer()
        // transferFrom(msg.sender,sellerAddress,etherValue);
    }
    
    function () external payable { }

}