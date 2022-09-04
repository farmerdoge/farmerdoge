import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  defaultNetwork: "hardhat",
  etherscan:{
    apiKey:{
      bsc: '6VJB6637ACCCUC2VDC5XQ8YTVNKXF2YMU5'
    }
  },
  networks: {
    hardhat:{
      chainId: 31337,
      forking: {
        url: "http://192.168.1.8:8545"
      }
    },
    bsc: {
      url: "http://192.168.1.8:8545"
    }
  },
  mocha: {
    timeout: 100000000
  }
};

export default config;
