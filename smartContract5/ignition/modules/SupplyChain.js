const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SupplyChain", (m) => {

    const supplyChain = m.contract("SupplyChain")
    console.log("supply chain:", supplyChain)

    return { supplyChain };
})