require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    fantomtest: {
      url: process.env.NETWORK_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};