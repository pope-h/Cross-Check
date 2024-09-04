// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CrossCheck is ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;

    enum AssetType { Certificate, DigitalStamp, TradeDocument, Firearm, PetroleumBatch }

    struct Asset {
        AssetType assetType;
        string assetId;
        bytes4 accessToken;
        uint256 expiryTime;
        address[] custodyChain;
        bool isReturned;
    }

    mapping(uint256 => Asset) private _assets; // returns the assets associated with each tokenId
    mapping(address => mapping(AssetType => uint256[])) private _userAssets; // returns the tokenIds of the assets owned by the addr

    event AssetMinted(uint256 indexed tokenId, address indexed owner, AssetType assetType, string assetId);
    event AccessGranted(uint256 indexed tokenId, bytes32 accessToken, uint256 expirationTime);
    event CustodyTransferred(uint256 indexed tokenId, address indexed from, address indexed to, bool forced);
    event CustodyReturned(uint256 indexed tokenId, address indexed custodian);

    constructor() ERC721("CrossCheck", "XCHK") {}

    function generateRandom4DigitNumber() private view returns (uint256) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _tokenIds.current()))) % 9000 + 1000;
        return random;
    }

    function mintAsset(AssetType assetType, string memory uri) external {
        uint256 newAssetId = generateRandom4DigitNumber();
        while (_isAssetIdTaken(newAssetId)) {
            newAssetId = generateRandom4DigitNumber();
        }

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);

        Asset storage newAsset = _assets[newTokenId];
        newAsset.assetType = assetType;
        newAsset.assetId = Strings.toString(newAssetId);  // Convert to string
        newAsset.custodyChain.push(msg.sender);
        newAsset.isReturned = true;

        _userAssets[msg.sender][assetType].push(newTokenId);

        emit AssetMinted(newTokenId, msg.sender, assetType, newAsset.assetId);
    }

    function returnCustody(uint256 tokenId) external {
        require(_assets[tokenId].custodyChain[_assets[tokenId].custodyChain.length - 1] == msg.sender, "Not the current custodian");
        _assets[tokenId].isReturned = true;
        emit CustodyReturned(tokenId, msg.sender);
    }

    function transferCustody(uint256 tokenId, address newCustodian) external {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");

        bool wasForced = false;
        if (!_isReturned(tokenId)) {
            wasForced = true;
        }

        _assets[tokenId].custodyChain.push(newCustodian);
        _assets[tokenId].isReturned = false;
        emit CustodyTransferred(tokenId, msg.sender, newCustodian, wasForced);
    }

    function _isReturned(uint256 tokenId) private view returns (bool) {
        return _assets[tokenId].isReturned;
    }

    function _isAssetIdTaken(uint256 assetId) private view returns (bool) {
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (keccak256(bytes(_assets[i].assetId)) == keccak256(bytes(Strings.toString(assetId)))) {
                return true;
            }
        }
        return false;
    }

    function generateAccessToken(uint256 tokenId, uint256 duration) external {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");

        if (block.timestamp <= _assets[tokenId].expiryTime) {
            revokeAccessToken(tokenId);
        }

        bytes32 fullHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId, duration));
        _assets[tokenId].accessToken = bytes4(fullHash);
        _assets[tokenId].expiryTime = block.timestamp + duration;

        emit AccessGranted(tokenId, _assets[tokenId].accessToken, _assets[tokenId].expiryTime);
    }

    function getAccessToken(uint256 tokenId) external view returns (bytes4) {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(block.timestamp <= _assets[tokenId].expiryTime, "Access token expired");

        return _assets[tokenId].accessToken;
    }

    function revokeAccessToken(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        delete _assets[tokenId].accessToken;
        delete _assets[tokenId].expiryTime;
    }

    function getAssetDetails(uint256 tokenId, bytes4 accessToken) external view returns (
        AssetType assetType,
        string memory assetId,
        address[] memory custodyChain
    ) {
        require(_assets[tokenId].accessToken == accessToken && 
                 block.timestamp <= _assets[tokenId].expiryTime, 
                "Not authorized or access expired");
        
        Asset storage asset = _assets[tokenId];
        return (asset.assetType, asset.assetId, asset.custodyChain);
    }

    function getUserAssets(address user, AssetType assetType) external view returns (uint256[] memory) {
        return _userAssets[user][assetType];
    }

    function getCustodyChain(uint256 tokenId, bytes4 accessToken) external view returns (address[] memory) {
        require(balanceOf(ownerOf(tokenId)) > 0, "Asset does not exist");
        require(
            _assets[tokenId].accessToken == accessToken &&
            block.timestamp <= _assets[tokenId].expiryTime,
            "Not authorized or access expired"
        );

        return _assets[tokenId].custodyChain;
    }

    function checkAccessTokenValidity(uint256 tokenId) external view returns (bool isValid, uint256 expirationTime) {
        uint256 expiration = _assets[tokenId].expiryTime;
        isValid = (expiration != 0 && block.timestamp <= expiration);
        expirationTime = expiration;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}