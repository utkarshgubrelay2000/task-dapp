pragma solidity >=0.4.22 <0.9.0;

contract TaskManager {
    address owner;
    struct Task {
        uint256 taskId;
        string msg;
        bool isDeleted;
    }
    Task[] tasks;
    mapping(uint256 => address) users;
    mapping(address => uint256) usersAddress;

    constructor() {
        owner = msg.sender;
    }

    modifier _IsAdmin() {
        require(owner == msg.sender);
        _;
    }

    function CreateTask(string memory taskmsg) external {
        uint256 taskId = tasks.length;
        bool isDeleted=false;
        Task memory newTask= Task({taskId:taskId,msg:taskmsg,isDeleted:isDeleted});
        tasks.push(newTask);
        users[taskId] = msg.sender;
    }

    function getMTasks() public view returns (Task[] memory) {
        uint256 taskId = tasks.length;
        Task[] memory t = tasks;
        Task[] memory t2 = new Task[](taskId);
        uint256 counter = 0;
        for (uint256 index = 0; index < t.length; index++) {
            if (users[index] == msg.sender) {
                Task memory t3 = t[index];
                t2[counter] = t3;
            }
        }
        return t2;
    }

    function getTaskbyUser(uint256 id) public view returns (Task[] memory) {
        address currentuser = users[id];
        uint256 taskId = tasks.length;
        Task[] memory t = tasks;
        Task[] memory t2 = new Task[](taskId);
        uint256 counter = 0;
        for (uint256 index = 0; index < t.length; index++) {
            if (users[index] == currentuser) {
                Task memory t3 = t[index];
                t2[counter] = t3;
            }
        }
        return t2;
    }

    function getUsers() public view returns (address) {
        address user = users[1];
        return user;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
