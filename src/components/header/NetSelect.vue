<template>
    <ul class="net-select-container">
        <li class="net" :class="{ selectd: showNet }" @click="netSelect">
            {{ chainName }}
            <ul class="down" v-show="showNet">
                <li class="not-hover">Select a network</li>
                <li
                    v-for="net in netWorks"
                    :key="net.chainId"
                    @click="switchNet(net)"
                    :class="{
                        active: parseInt(net.chainId) === parseInt(chainId),
                    }"
                >
                    {{ net.chainName }}
                </li>
            </ul>
        </li>
        <li>{{ spliceAddress(address) }}</li>
    </ul>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { netWorks, errorChainMsg } from "../../config";
import { useStore } from "vuex";

const store = useStore();
const showNet = ref(false);

defineProps({
    address: String,
});

const chainId = computed(() => store.state.chainId);

// const netName = computed(() => store.state.metaMaskNetWork);

const chainName = computed(() => {
    const cName = netWorks.filter(
        (it) => parseInt(it.chainId) === parseInt(chainId.value)
    );
    return cName[0] ? cName[0].chainName : errorChainMsg;
});

const netSelect = () => {
    showNet.value = !showNet.value;
};

const spliceAddress = (address) =>
    (address && address.slice(0, 5) + "****" + address.slice(-4)) || "";

const switchNet = (net) => {
    store.dispatch("switchChainId", net);
};

const listenClick = (e) => {
    if (showNet.value && !e.target.classList.contains("net")) {
        showNet.value = false;
    }
};
onMounted(() => {
    window.addEventListener("click", listenClick, false);
});
onUnmounted(() => {
    window.removeEventListener("click", listenClick, false);
});
</script>

<style lang="scss" scoped>
.net-select-container {
    display: flex;
    flex-direction: row;
    border: 1px solid #999;
    border-radius: 10px;
    position: relative;
    background: rgba(19, 18, 19, 0.7);
    .net {
        position: relative;
        padding-right: 38px;
        &::after {
            content: "";
            position: absolute;
            width: 12px;
            height: 7px;
            background: url("../../assets/vector.png");
            background-size: cover;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.2s;
        }
    }
    .selectd {
        &::after {
            transform: translateY(-50%) rotate(-180deg);
        }
    }
    li {
        height: 40px;
        line-height: 40px;
        border-right: 1px solid #999;
        cursor: pointer;
        padding: 0 20px;
        &:last-child {
            border-right: none;
            cursor: auto;
        }
    }
}
.down {
    position: absolute;
    left: 0;
    top: 42px;
    border-radius: 10px;
    width: max-content;
    z-index: 9;
    border: 1px solid #999;
    transition: all 0.3s;
    background: rgba(19, 18, 19, 0.7);
    li {
        border: none;
        border-bottom: 1px solid #999;
        cursor: pointer;
        padding: 0 40px 0 20px;
        position: relative;
        &:not(.not-hover):after {
            content: "";
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            width: 19px;
            height: 19px;
            border: 1px solid #999;
            border-radius: 50%;
            box-sizing: border-box;
        }
        &:first-child {
            cursor: auto;
        }
        &:last-child {
            border-bottom: none;
            cursor: pointer;
        }
    }
    .active {
        &:not(.not-hover):after {
            border: none;
            background: url("../../assets/chain-select.png");
            background-size: cover;
        }
    }
}
</style>