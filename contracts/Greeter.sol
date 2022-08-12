// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
    string private _greeting = "Hello World";
    //visibility idtifier ristricts its visibility only in the contract (blockchain data is public)
    /**
     address private _owner;
     //if _owner hasnt been set, initial value is 0x0000...00

     constructor() public {
         _owner = msg.sender;   //initialize owner by contract caller address
     }
     */
    
    function greet() external view returns(string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }

    /**
     modifier onlyOwner() { //modify the function attached this
         require(msg.sender == _owner, "should not update");
         _;  //exec rest
     }

     function owner() public view returns(address) {
         return _owner;
     }
     */
}