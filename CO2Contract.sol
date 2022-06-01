pragma solidity ^0.5.5;

/*
CO2 TokenEx 
Create an efficient digital market for buying and selling Carbon tokens. 
These carbon certificates will be tokenized (I.e minted) on the same chain using Smart contract concepts. 
Carbon certificates can ONLY be tokenized by contract owner (e.g. US Treasury). Additional tokens can only be minted by contract owner (i.e. US Treasury)

Step 1 - Deploy contract with initial supply of CO2 tokens
Stem 2 - Add compnaies that are major carbon producers
Step 3 - Allocate portion or all CO2 tokens among the companies
Step 4 - Sellers can offer excess tokens to potential buyers at a requested price
Step 5 - Buyers can buy additional tokens from many potential buyers 

Note : A company can be both, a buyer and a seller. The contract owner (US Treasury in this case) can also be a seller to stabilize the market
*/

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Detailed.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";


contract CO2Token is ERC20, ERC20Detailed {
    address payable owner;
    uint noOfCorporations = 0; // This counter is incremented anytime a new corporation is added. Note the contract owner has index 0.
    uint noOfSellers = 0; // This counter is incremented anytime a new seller is added.

    // Structure to define a corporation.
    struct corporation {
        address corporationAddress;
        string name;
        string logo;
        uint pctAllocated;
        uint CO2tokens;
    }


    // Structure to define a Seller
    struct Seller {
        address sellerAddress;
        string name;
        uint tokensForSale;
        uint pricePerToken;
    }


    mapping (uint => address) private corporateIndex; // mapping table to keep track of index and corporation address
    mapping (address => corporation) public balances; // mapping table to keep track of corporation address and corporate details (including tokens)

    mapping (uint => address) private sellerIndex; // mapping table to keep track of index and seller
    mapping (address => Seller) public sellers; // mapping table to keep track of seller address and seller details (including tokens put up for sale and price requested)

    // modifier to limit function calls by the owner, i.e contract deployer (US Treasury in this case)
    modifier onlyOwner {
        require(msg.sender == owner,"You do not have rights. Pleae contact your jurisdiction office!!!");
        _;
    }

    // ERC 20 compatible token
    constructor(string memory name, uint initialSupply) ERC20Detailed("CarbonTokens","CO2",18) public {
        owner = msg.sender;
        corporateIndex[noOfCorporations] = owner;
        noOfCorporations++;
        balances[owner].corporationAddress = owner;
        balances[owner].name = name;
        mint(owner,initialSupply); // minting with initial supply

    }

    // function to mint tokens as and when needed. This can be only performed by the contract owner
    function mint(address recipient, uint amount) public onlyOwner {
        balances[recipient].CO2tokens += amount;
    }



    // function to add Corporation to the mapping. This can be only performed by the contract owner
    function addCorporation(address corpAddress, string memory name, uint pct_Allocated) public onlyOwner {
        balances[corpAddress].corporationAddress = corpAddress;
        balances[corpAddress].name = name;
        balances[corpAddress].pctAllocated = pct_Allocated; // pct of carbon producer at the national level
        corporateIndex[noOfCorporations] = corpAddress;
        noOfCorporations++;
    }

    // function to allocate tokens from government treasury to individual corporations
    // function allocate(uint pctTotalAllocation) public onlyOwner {
        function allocate() public onlyOwner {
        uint tokensForAllocation = balances[owner].CO2tokens / (noOfCorporations -1); // Equal allocation amoung companies
        for(uint8 i=1; i< noOfCorporations; i++) {
            // uint tokensForAllocation = (balances[corporateIndex[i]].pctAllocated) * (balances[owner].CO2tokens * pctTotalAllocation);
            balances[owner].CO2tokens -= tokensForAllocation;
            balances[corporateIndex[i]].CO2tokens += tokensForAllocation;
        }
    }

    // function to Sell your tokens. This can be called by any corporation, who is part of the chain. 
    // Using this function, the corporation can put their excess tokens for sale in the market
    function executeSell(uint _tokensForSale, uint _pricePerToken) public {
        require (_tokensForSale <= balances[msg.sender].CO2tokens, "You can not sell more tokens than you hold. Please try again with lower tokens.");
        sellers[msg.sender].sellerAddress = msg.sender;
        sellers[msg.sender].name = balances[msg.sender].name;
        sellers[msg.sender].tokensForSale += _tokensForSale; // it is possible that the corp had outstanding tokens for sale. This can also add to their existing standing order.
        sellers[msg.sender].pricePerToken = _pricePerToken;

        sellerIndex[noOfSellers] = msg.sender;
        noOfSellers++;
    }

    // function to display the sellers offering their tokens. This will be called by the corporation to see how many tokesn they have and they can only sell up to maximum token balance 
    function viewSellInfo() public view returns (string memory, uint) {
        corporation memory sellerInfo = balances[msg.sender];
        return (sellerInfo.name, sellerInfo.CO2tokens);
    }

    //function to view all sellers in the market with their tokens and their prices. This should be the dashborad showing all the existing sellers in the market
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

    // function to buy tokens. This function will be called by the buyer. When a buyer chooses to buy some tokens at a agreed price, 
    // then the tokens are transferred from seller to buyer and relevant ETH are transferred from Buyer to Seller.
    function executeBuy(address payable sellerAddress, uint _tokens, uint _pricePerToken) public payable {
        uint etherValue = _tokens * _pricePerToken;
        balances[msg.sender].CO2tokens += _tokens;
        balances[sellerAddress].CO2tokens -= _tokens;
        // owner.transfer(etherValue);
        address(this).transfer(etherValue);
        sellerAddress.transfer(etherValue);
        // transferFrom(msg.sender,sellerAddress,etherValue);
    }
    
    function () external payable { }

}