require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      // Hardhat Network by default runs on port 8545 locally
    },
    hardhat: {
      // This configuration is typically left empty
    },
  },
};
