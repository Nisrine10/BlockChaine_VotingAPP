// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Voting {
    struct Candidate {
        string name;
        string description;
        string imageLink;
        uint256 voteCount;
    }

    struct Voter {
        string name;
        string cin;
        string region;
        string imageLink;
        string cinLink;
        bool isApproved;
        bool hasVoted;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    mapping(string => address) public voterCINMap; 
    address[] public voterAddresses;
    uint256 public candidatesCount;
    address public owner;
    uint256 public votingEndTime;
    bool public votingStarted;

    event CandidateAdded(string name, string description, string imageLink);
    event VoteCast(address voter, uint candidateNum);
    event VoterRegistered(address voter, string name, string cin, string region);
    event VoterApproved(address voter);
    event VotingStarted(uint256 endTime);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this operation");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
        votingStarted = false;
    }

    function addCandidate(string memory _name, string memory _description, string memory _imageLink) public onlyOwner {
        require(!votingStarted, "Cannot add candidates after voting has started");
        candidates[candidatesCount] = Candidate(_name, _description, _imageLink, 0);
        candidatesCount++;
        emit CandidateAdded(_name, _description, _imageLink);
    }

    function startVoting(uint256 _votingDuration) public onlyOwner {
        require(!votingStarted, "Voting has already started");
        votingEndTime = block.timestamp + _votingDuration;
        votingStarted = true;
        emit VotingStarted(votingEndTime);
    }

    function registerVoter(string memory _name, string memory _cin, string memory _region, string memory _imageLink, string memory _cinLink) public {
        require(voterCINMap[_cin] == address(0), "Voter with this CIN already registered");
        voters[msg.sender] = Voter(_name, _cin, _region, _imageLink, _cinLink, false, false);
        voterAddresses.push(msg.sender);
        voterCINMap[_cin] = msg.sender;
        emit VoterRegistered(msg.sender, _name, _cin, _region);
    }

    function approveVoter(address _voter) public onlyOwner {
        require(bytes(voters[_voter].name).length != 0, "Voter not registered");
        voters[_voter].isApproved = true;
        emit VoterApproved(_voter);
    }

    function isVoterApproved(address _voter) public view returns (bool) {
        return voters[_voter].isApproved;
    }

    function isVoterRegistered(string memory _cin) public view returns (bool) {
        return voterCINMap[_cin] != address(0);
    }

    function getVotersCount() public view returns (uint256) {
        return voterAddresses.length;
    }

    function getVoterAddress(uint256 index) public view returns (address) {
        require(index < voterAddresses.length, "Index out of bounds");
        return voterAddresses[index];
    }

    function getCandidate(uint256 index) public view returns (string memory, string memory, string memory, uint256) {
        require(index < candidatesCount, "Index out of bounds");
        Candidate memory candidate = candidates[index];
        return (candidate.name, candidate.description, candidate.imageLink, candidate.voteCount);
    }

    function vote(uint256 candidateIndex) public {
        require(votingStarted, "Voting has not started yet");
        require(block.timestamp < votingEndTime, "Voting period has ended");
        require(voters[msg.sender].isApproved, "Voter not approved");
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        require(candidateIndex < candidatesCount, "Invalid candidate index");

        voters[msg.sender].hasVoted = true;
        candidates[candidateIndex].voteCount++;

        emit VoteCast(msg.sender, candidateIndex);
    }
}
