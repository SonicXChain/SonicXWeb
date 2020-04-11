const broadcaster = require('../test/helpers/broadcaster');
const sonicxwebBuilder = require('../test/helpers/sonicxwebBuilder');
const SonicxWeb = sonicxwebBuilder.SonicxWeb;

const privateKey = 'D8B708BFFFA424473D83349CF4C6A2395E4436E065B60F0BF31E582281256D1C';

const sonicxWeb = new SonicxWeb({
    fullNode: 'https://fullnode-testnet.sonicxhub.com',
    solidityNode: 'https://solnode-testnet.sonicxhub.com',
    eventServer: 'https://event-testnet.sonicxhub.com/',
    privateKey: privateKey
})

const address = sonicxWeb.address.fromPrivateKey(privateKey)

// Proposal types
const PT_MAINTENANCE_TIME_INTERVAL = 0; //ms  ,0
const PT_ACCOUNT_UPGRADE_COST = 1; //drop ,1
const PT_CREATE_ACCOUNT_FEE = 2; //drop ,2
const PT_TRANSACTION_FEE = 3; //drop ,3
const PT_ASSET_ISSUE_FEE = 4; //drop ,4
const PT_WITNESS_PAY_PER_BLOCK = 5; //drop ,5
const PT_WITNESS_STANDBY_ALLOWANCE = 6; //drop ,6
const PT_CREATE_NEW_ACCOUNT_FEE_IN_SYSTEM_CONTRACT = 7; //drop ,7
const PT_CREATE_NEW_ACCOUNT_BANDWIDTH_RATE = 8; // 1 ~ ,8
const PT_ALLOW_CREATION_OF_CONTRACTS = 9; // 0 / >0 ,9
const PT_REMOVE_THE_POWER_OF_THE_GR = 10;  // 1 ,10
const PT_ENERGY_FEE = 11; // drop, 11
const PT_EXCHANGE_CREATE_FEE = 12; // drop, 12
const PT_MAX_CPU_TIME_OF_ONE_TX = 13; // ms, 13
const PT_ALLOW_UPDATE_ACCOUNT_NAME = 14; // 1, 14
const PT_ALLOW_SAME_TOKEN_NAME = 15; // 1, 15
const PT_ALLOW_DELEGATE_RESOURCE = 16; // 0, 16
const PT_TOTAL_ENERGY_LIMIT = 17; // 50,000,000,000, 17
const PT_ALLOW_TVM_TRANSFER_TRC10 = 18; // 1, 18
const PT_TOTAL_CURRENT_ENERGY_LIMIT = 19; // 50,000,000,000, 19
const PT_ALLOW_MULTI_SIGN = 20; // 1, 20
const PT_ALLOW_ADAPTIVE_ENERGY = 21; // 1, 21
const PT_UPDATE_ACCOUNT_PERMISSION_FEE = 22; // 100, 22
const PT_MULTI_SIGN_FEE = 23; // 1, 23
const PT_ALLOW_PROTO_FILTER_NUM = 24; // 1, 24
const PT_ALLOW_ACCOUNT_STATE_ROOT = 25; // 1, 25
const PT_ALLOW_TVM_CONSTANTINOPLE = 26; // 1, 26
const PT_ADAPTIVE_RESOURCE_LIMIT_MULTIPLIER = 29; // 1000, 29
const PT_ALLOW_CHANGE_DELEGATION = 30; //1, 30
const PT_WITNESS_127_PAY_PER_BLOCK = 31; //drop, 31
const PT_ALLOW_TVM_SOLIDITY_059 = 32; // 1, 32
const PT_ADAPTIVE_RESOURCE_LIMIT_TARGET_RATIO = 33; // 10, 33
const PT_FORBID_TRANSFER_TO_CONTRACT = 35; // 1, 35

async function getProposals() {
    try {
        return await sonicxWeb.trx.listProposals();
    } catch(e) {
        console.log("Failed in getProposals: " + e)
        return null;
    }
}

async function createProposal() {
    let parameters = [{"key": PT_ENERGY_FEE, "value": 5}]

    try {
        await broadcaster(
            null,
            privateKey,
            await sonicxWeb.transactionBuilder.createProposal(parameters[0], address)
        );
    } catch(e) {
        console.log("Failed in createProposal: " + e)
    }
}

async function test() {
    await createProposal()

    const proposals = await getProposals()
    if (!proposals) {
        return
    }
    console.log("proposals=", proposals)
}

test()