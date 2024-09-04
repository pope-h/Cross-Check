import { ethers } from 'hardhat';

async function main() {
  const crossCheck = await ethers.deployContract('CrossCheck');

  await crossCheck.waitForDeployment();

  console.log('CrossCheck Contract Deployed at ' + crossCheck.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});