var DecentralizedExchange = artifacts.require('./DecentralizedExchange');

module.exports = function(deployer) {
  deployer.deploy(DecentralizedExchange);
};