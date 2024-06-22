// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Voting.sol";

contract VotingFactory {
    address[] public votings;
    address public owner;

    event VotingCreated(address votingAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this operation");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createVoting() public onlyOwner {
        Voting newVoting = new Voting(msg.sender);
        votings.push(address(newVoting));
        emit VotingCreated(address(newVoting));
    }

    function getVotings() public view returns (address[] memory) {
        return votings;
    }
}
