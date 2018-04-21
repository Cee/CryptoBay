var SponsorToken = artifacts.require('./SponsorToken');

module.exports = function(deployer) {
  deployer.deploy(SponsorToken);
};