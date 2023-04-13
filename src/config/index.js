export const netWorks = [
    {
        "chainId": "0x38",
        "rpcUrls": [
            "https://bsc-dataseed.binance.org/"
        ],
        "chainName": "BSC",
        "default": false,
        POT: '0x4c7b04d50e070848e3c7757995a57624563e0245',
        claim: '0x24367DD2a01e866e45eFEEE9cfaf483FD8aD25D2',
    },
    {
        "chainId": "0x42",
        "chainName": "OEC Main",
        "rpcUrls": ["https://exchainrpc.okex.org/"],
        "blockExplorerUrls": ["https://www.oklink.com/oec"]
    },
    {
        "chainId": "0x80",
        "chainName": "Heco Mainnet",
        "rpcUrls": ["https://http-mainnet-node.huobichain.com"],
        "blockExplorerUrls": ["https://hecoinfo.com"]
    },
    {
        "chainId": "0x7b",
        "chainName": "Wlblock Test Chian",
        "claim": "0x096bd91e851d3bd71a98053427da0394a732ab35",
        "default": true,
        "rpcUrls": ["https://testnet-eth.wlblock.io/"],
        "tokens": ["0xf7118ac23fa5e238e96d79a0504d7606effa2624"]
    }
]

export const pro_netWorks = [

    { 
        "name": "bsc", 
        "chainName": "BSC", 
        "chainId": "0x38",
        "rpcUrls": ["https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://bsc-dataseed3.binance.org", "https://bsc-dataseed4.binance.org", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed2.defibit.io", "https://bsc-dataseed3.defibit.io", "https://bsc-dataseed4.defibit.io", "https://bsc-dataseed1.ninicoin.io", "https://bsc-dataseed2.ninicoin.io", "https://bsc-dataseed3.ninicoin.io", "https://bsc-dataseed4.ninicoin.io", "https://bsc.publicnode.com", "wss://bsc-ws-node.nariox.org"], 
        "faucets": ["https://free-online-app.com/faucet-for-eth-evm-chains/"], 
        "nativeCurrency": { "name": "Binance Chain Native Token", "symbol": "BNB", "decimals": 18 }, 
        "infoURL": "https://www.binance.org", "shortName": "bnb", "chainId": 56, "networkId": 56, "slip44": 714, 
        "explorers": [{ "name": "bscscan", "url": "https://bscscan.com", "standard": "EIP3091" }],
        POT: '0x4c7b04d50e070848e3c7757995a57624563e0245',
        claim: '0x24367DD2a01e866e45eFEEE9cfaf483FD8aD25D2',
    },
    {
        "chainId": "0x42",
        "chainName": "OEC Main",
        "rpcUrls": ["https://exchainrpc.okex.org/"],
        "blockExplorerUrls": ["https://www.oklink.com/oec"]
    },
    {
        "chainId": "0x80",
        "chainName": "Heco Mainnet",
        "rpcUrls": ["https://http-mainnet-node.huobichain.com"],
        "blockExplorerUrls": ["https://hecoinfo.com"]
    },
    {
        "chainId": "0x7b",
        "chainName": "Wlblock Test Chian",
        "claim": "0x096bd91e851d3bd71a98053427da0394a732ab35",
        "default": true,
        "rpcUrls": ["https://testnet-eth.wlblock.io/"],
        "tokens": ["0xf7118ac23fa5e238e96d79a0504d7606effa2624"]
    }
]

export const errorChainMsg = "You are on the wrong network";
export const metaMaskDownload = "https://metamask.io";