<script setup>
import logo from "../../assets/logo.png";
import NetSelect from "./NetSelect.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const account = computed(() => {
    return store.state.account;
});
const connect = () => {
    store.dispatch("connect");
};
</script>

<template>
    <header class="header-container">
        <div class="header">
            <img class="logo" :src="logo" alt="logo" />
            <button class="connect" @click="connect" v-if="!account">Connect</button>
            <NetSelect :address="account" v-else/>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header-container {
    max-width: 100vw;
    height: 77px;
    background: #000000;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
}
.header {
    width: 1200px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    height: 100%;
    .logo {
        width: 198px;
        height: 58px;
        display: block;
    }
    .connect {
        width: 61px;
        height: 12px;
        width: 100px;
        height: 40px;
        background: #ff0e6b;
        border-radius: 10px;
        border: none;
        color: #fff;
        cursor: pointer;
        font-family: inherit;
    }
}
</style>
