import { createStore } from 'vuex'
import { metaMaskDownload } from '../config'
import Web3 from 'web3'
const local_nets = localStorage.getItem('net')

export default createStore({
    state() {
        return {
            account: localStorage.getItem('account') || '',
            chainId: '',
            metaMaskNetWork: local_nets && JSON.parse(local_nets) || {},
            hiddenPointBox: false,
        }
    },
    mutations: {
        saveState(state, { key, value }) {
            state[key] = value
        },
        saveAccount(state, account) {
            localStorage.setItem('account', account || '')
            state.account = account
        },
        saveMetaMaskNetWork(state, net) {
            localStorage.setItem('net', JSON.stringify(net) || {})
            state.metaMaskNetWork = net
        },
    },
    actions: {
        async connect({ state, commit }) {
            if (window.etherum === null) {
                window.location = metaMaskDownload;
                return false
            }
            const ethereum = window.ethereum
            let web3 = null
            if (window.web3) {
                web3 = new Web3(ethereum);
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
                const chainId = await ethereum.request({ method: 'eth_chainId' })
                commit('saveAccount', accounts[0])
                commit('saveState', { key: 'chainId', value: chainId })
            }
        },
        subscribeChain({ commit, dispatch, state }) {
            console.log('subscribeChain')
            const ethereum = window.ethereum
            if (!ethereum) {
                return;
            }
            ethereum.on('connect', (accounts) => {
                console.log('connect-----');
                dispatch('connect')
            })
            ethereum.on('accountsChanged', (accounts) => {
                console.log('accountsChanged--------');
                commit('saveAccount', accounts[0])
            })
            ethereum.on('chainIdChanged', chainID => {
                console.log('chainIdChanged-' + chainID);
            })
            ethereum.on('chainChanged', (event) => {
                dispatch('changeChainId', event)
            })
            ethereum.on('disconnect', e => {
                console.log('disconnect-------', e);
                // 清空钱包连接类型
                localStorage.removeItem('account')
                commit("saveAccount", '')
            })

        },
        changeChainId({ state, commit }, chainId) {
            commit('saveState', { key: 'chainId', value: chainId })
        },
        async switchChainId({ commit }, chainObj) {
            const ethereum = window.ethereum;
            const { chainId, rpcUrls, chainName } = chainObj;
            const chainId_16 = `0x${(Number(chainId)).toString(16)}`
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainId_16 }],
                });
                commit('saveMetaMaskNetWork', { ...chainObj })
            } catch (switchError) {
                console.log(switchError,'switchError:::::::::')
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{ chainId: chainId_16, rpcUrls, chainName }],
                        });
                        commit('saveMetaMaskNetWork', { ...chainObj })
                    } catch (addError) {
                        // handle "add" error
                        console.log(addError, 'error');
                        ElNotification({
                            title: "Error",
                            message: addError,
                            type: 'error'
                        })
                    }
                }
            }
        },
    }
})