// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract SupplyChain {

    address payable owner;
    uint256 public containerCount;

    enum TransferStatus {
        PLEDGED,
        SOLD,
        UNPLEDGED
    }

    event Transactions(
        uint indexed containerId,
        address owner,
        address receiver,
        uint256 price,
        TransferStatus containerStatus
    );

    event ContainerList(
        uint256 pledgedTime,
        uint256 indexed containerId,
        address owner,
        address receiver,
        uint256 price,
        TransferStatus containerStatus
    );

    event Unpledged(
        uint256 indexed containerId,
        uint256 unpledgeTime,
        TransferStatus containerStatus
    );

    struct Container {
        address owner;
        address receiver;
        uint256 pledgeTime;
        uint256 unpledgeTime;
        uint256 price;
        TransferStatus status;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    mapping(uint => Container) public containers;

    modifier onlyOwner() {
        require(msg.sender == owner, "You dont have the permission");
        _;
    }

    function pledgeContainer(
        address _owner,
        address _receiver,
        uint256 _price
        ) public onlyOwner {
        containers[containerCount] = Container({
            owner: _owner,
            receiver: _receiver,
            pledgeTime: block.timestamp,
            unpledgeTime: 0,
            price: _price,
            status: TransferStatus.PLEDGED
        });

        emit ContainerList(block.timestamp ,containerCount,owner,_receiver,_price,TransferStatus.PLEDGED);
        containerCount++;
    }

    function buyContainer (
        uint256 containerId
    ) public payable {
        Container storage container =  containers[containerId];
        require(msg.value == container.price,"please enter valid amount");
        require(msg.sender == container.receiver,"You are the not receiver");
        payable(container.owner).transfer(msg.value);
        container.status = TransferStatus.SOLD;
        container.unpledgeTime = block.timestamp;

        emit Transactions(containerId,container.owner,container.receiver,container.price,container.status);
    }

    function unPledgeContainer(uint256 containerId) public onlyOwner{
        Container storage container =  containers[containerId];
        require(container.status == TransferStatus.SOLD);
        container.status = TransferStatus.UNPLEDGED;
        container.unpledgeTime = block.timestamp;

        emit Unpledged(containerId, block.timestamp,container.status);
    }
}