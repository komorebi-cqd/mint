<script setup>
import Header from "./components/header/index.vue";
import CommercialCity from "./components/CommercialCity.vue";
import MyLand from "./components/MyLand.vue";
import OriginalCity from "./components/OriginalCity.vue";
import WorldMap from "./components/WorldsMap.vue";

import { ref } from "vue";
const currentPage = ref(1);

const switchPage = (page) => {
    currentPage.value = page;
};
</script>

<template>
    <Header />
    <div class="container">
        <nav class="nav">
            <div :class="{ active: currentPage === 1 }" @click="switchPage(1)">
                Commercial City
            </div>
            <div :class="{ active: currentPage === 2 }" @click="switchPage(2)">
                World Map
            </div>
            <div :class="{ active: currentPage === 3 }" @click="switchPage(3)">
                Original City
            </div>
            <div :class="{ active: currentPage === 4 }" @click="switchPage(4)">
                My Land
            </div>
        </nav>
        <div class="content">
            <CommercialCity v-if="currentPage === 1" />
            <WorldMap v-else-if="currentPage === 2" />
            <OriginalCity v-else-if="currentPage === 3" />
            <MyLand v-else />
        </div>
    </div>
</template>

<style lang="scss">
@font-face {
    font-family: "XMetaverse-Bold";
    src: url("./font/XMetaverse-Bold.otf");
}
html,
body {
    font-family: "XMetaverse-Bold", Avenir, Helvetica, Arial, sans-serif;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    max-width: 100vw;
    font-weight: bold;
}
ul {
    padding: 0;
    list-style: none;
    margin: 0;
}
</style>

<style scoped lang="scss">
.container {
    width: 1200px;
    min-height: calc(100vh - 77px);
    margin: 0 auto;
    padding-top: 44px;
    box-sizing: border-box;
}
.nav {
    display: flex;
    font-size: 20px;
    color: #333333;
    margin-bottom: 8px;
    div {
        width: 220px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #f7f7f7;
        margin-right: 2px;
        cursor: pointer;
    }
    .active {
        color: #ffffff;
        background: #ff0e6b;
    }
}
</style>
