pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Detailed.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";


contract CO2Token is ERC20, ERC20Detailed {
    address payable owner;
    uint noOfCorporations = 0;
    uint noOfSellers = 0;

    struct corporation {
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
    mapping (address => Seller) sellers;

    modifier onlyOwner {
        require(msg.sender == owner,"You do not have rights. Pleae contact your jurisdiction office!!!");
        _;
    }

    constructor(string memory name, uint initialSupply) ERC20Detailed("CarbonTokens","CO2",18) public {
        owner = msg.sender;
        corporateIndex[noOfCorporations] = owner;
        noOfCorporations++;
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
        balances[corpAddress].name = name;
        balances[corpAddress].pctAllocated = pct_Allocated;
        corporateIndex[noOfCorporations] = corpAddress;
        noOfCorporations++;
    }

    // function to allocate tokens from government treasury to individual corporations
    function allocate(uint pctTotalAllocation) public onlyOwner {
        for(uint8 i=1; i< noOfCorporations; i++) {
            uint tokensForAllocation = balances[corporateIndex[i]].pctAllocated * balances[owner].CO2tokens * pctTotalAllocation;
            balances[owner].CO2tokens -= tokensForAllocation;
            balances[corporateIndex[i]].CO2tokens += tokensForAllocation;
        }
    }

    // function to Sell your tokens
    function executeSell(uint _tokensForSale, uint _pricePerToken) public {
        require (_tokensForSale < balances[msg.sender].CO2tokens, "You can not sell more tokens than you hold. Please try again with lower tokens.");
        sellers[msg.sender].sellerAddress = msg.sender;
        sellers[msg.sender].name = balances[msg.sender].name;
        sellers[msg.sender].tokensForSale += _tokensForSale;
        sellers[msg.sender].pricePerToken = _pricePerToken;
    }

    // function to display all the sellers offering their tokens
    function viewSellInfo() public view returns (string memory, uint) {
        corporation memory sellerInfo = balances[msg.sender];
        return (sellerInfo.name, sellerInfo.CO2tokens);
    }

    // function to buy tokens
    function executeBuy(address payable sellerAddress, uint _tokens, uint _pricePerToken) public payable{
        uint etherValue = _tokens * _pricePerToken;
        balances[msg.sender].CO2tokens += _tokens;
        balances[sellerAddress].CO2tokens -= _tokens;
        owner.transfer(etherValue);
        sellerAddress.transfer(etherValue);
    }

}