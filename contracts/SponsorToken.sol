pragma solidity ^0.4.21;
/// @author MinakoKojima (https://github.com/lychees)

contract SponsorToken {

  address public owner;
  mapping (address => bool) public admins;

  struct Order {
    address issuer;
    uint256 tokenId;
    uint256 ponzi; // This is a part of this world.
    uint256 head;
    uint256 tail;
    mapping (address => uint256) remain;
    mapping (uint => address) sponsor;
  }
  Order[] private orderBook;
  uint256 private orderBookSize;

  function SponsorToken() public {
    owner = msg.sender;
    admins[owner] = true;
  }

  /* Modifiers */
  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier onlyAdmins() {
    require(admins[msg.sender]);
    _;
  }

  /* Owner */
  function setOwner (address _owner) onlyOwner() public {
    owner = _owner;
  }

  function addAdmin (address _admin) onlyOwner() public {
    admins[_admin] = true;
  }

  function removeAdmin (address _admin) onlyOwner() public {
    delete admins[_admin];
  }

  /* Withdraw */
  function withdrawAll () onlyAdmins() public {
    msg.sender.transfer(address(this).balance);
  }

  function withdrawAmount (uint256 _amount) onlyAdmins() public {
    msg.sender.transfer(_amount);
  }

  /* ERC721 */
  function name() public pure returns (string _name) {
    return "Sponsor Token";
  }

  /* Read */
  function isAdmin(address _admin) public view returns (bool _isAdmin) {
    return admins[_admin];
  }
  function totalOrder() public view returns (uint256 _totalOrder) {
    return orderBookSize;
  }
  function getOrder(uint256 _id) public view returns (address _issuer, uint256 _tokenId, uint256 _ponzi) {
    return (orderBook[_id].issuer, orderBook[_id].tokenId, orderBook[_id].ponzi);
  }

  /* Util */
  function isContract(address addr) internal view returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) } // soliumdisableline
    return size > 0;
  }

  /* Sponsor */
  function put(address _issuer, uint256 _tokenId, uint256 _ponzi) public {
    Issuer issuer = Issuer(_issuer);
    require(issuer.ownerOf(_tokenId) == msg.sender);
    require(_ponzi > 104); // 3% for contract

    if (orderBookSize == orderBook.length) {
      orderBook.push(Order(_issuer, _tokenId, _ponzi, 0, 0));
    } else {
      orderBook[orderBookSize] = Order(_issuer, _tokenId,  _ponzi, 0, 0);
    }
    orderBookSize += 1;
  }
  function sponsor(uint256 _id, address _referrer) public payable{
    require(_id < orderBookSize);
    require(!isContract(msg.sender));
    require(_referrer != msg.sender);

    uint256 msgValue = msg.value * 97 / 100; // 3% cut off for contract

    orderBook[_id].sponsor[orderBook[_id].tail] = msg.sender;
    orderBook[_id].remain[msg.sender] += msgValue * orderBook[_id].ponzi / 100;
    orderBook[_id].tail++;

    if (_referrer != address(0) && orderBook[_id].remain[_referrer] != 0) {
      if (msgValue <= orderBook[_id].remain[_referrer]) {
        referrer.transfer(msgValue);
        orderBook[_id].remain[_referrer] -= msgValue;
        msgValue = 0;
      } else {
        msgValue -= orderBook[_id].remain[_referrer];
        referrer.transfer(orderBook[_id].remain[_referrer]);
        orderBook[_id].remain[_referrer] = 0;
      }
    }

    while (msgValue > 0){
      if (orderBook[_id].head + 1 == orderBook[_id].tail) {
        Issuer issuer = Issuer(orderBook[_id].issuer);
        issuer.ownerOf(orderBook[_id].tokenId).transfer(msgValue);
        return;
      }
      address referrer = orderBook[_id].sponsor[orderBook[_id].head];
      if (msgValue <= orderBook[_id].remain[referrer]) {
        referrer.transfer(msgValue);
        orderBook[_id].remain[_referrer] -= msgValue;
        msgValue = 0;
      } else {
        msgValue -= orderBook[_id].remain[_referrer];
        referrer.transfer(orderBook[_id].remain[_referrer]);
        orderBook[_id].remain[_referrer] = 0;
        orderBook[_id].head++;
      }
    }
  }
}

interface Issuer {
  function transferFrom(address _from, address _to, uint256 _tokenId) external;
  function transfer(address _to, uint256 _tokenId) external;
  function ownerOf (uint256 _tokenId) external view returns (address _owner);
}
