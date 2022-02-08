<template >
    <div class="my-land">
        <div class="box" @click="showMessageBox" v-for="i in 9" :key="i">
            <div class="content-box">
                <div class="box-left">
                    <img class="city" src="../assets/small-city.png" alt="" />
                    <img class="logo" src="../assets/logo.png" alt="" />
                </div>
                <div class="box-right">
                    <div class="top">
                        <h3>Industrial City</h3>
                        <div>Position:(-1,10)</div>
                    </div>
                    <div class="bottom">
                        <h3>Area Style</h3>
                        <img src="../assets/small-build.png" alt="" />
                    </div>
                </div>
            </div>
            <div class="footer-point">(123,-15)</div>
        </div>
    </div>
    <MessageBox v-if="hiddenPointBox">
        <div class="detail-box">
            <div class="wrap-box">
                <div class="title">坐标</div>
                <div class="detail">
                    <input type="text" disabled value="123,-15" class="text" />
                    <div class="box-right"></div>
                </div>
            </div>
            <div class="wrap-box">
                <div class="title">Contract Address</div>
                <div class="detail">
                    <input
                        type="text"
                        disabled
                        value="0xf87bds1yn2s73yn1792yn379y1293y791279s3"
                        class="text"
                    />
                    <div class="copy" @click="copy('22222222222')">Copy</div>
                </div>
            </div>
            <div class="wrap-box">
                <div class="title">Token ID</div>
                <div class="detail">
                    <input
                        type="text"
                        disabled
                        value="1157920892373161123123"
                        class="text"
                    />
                    <div class="copy" @click="copy('444444444444444')">
                        Copy
                    </div>
                </div>
            </div>
            <div class="wrap-box">
                <div class="title">Token Standard</div>
                <div class="detail">
                    <input type="text" disabled value="ERC-721" class="text" />
                </div>
            </div>
            <div class="wrap-box">
                <div class="title">Blockchain</div>
                <div class="detail">
                    <input type="text" disabled value="Ethereum" class="text" />
                </div>
            </div>
            <div class="understood" @click="close">Understood</div>
        </div>
    </MessageBox>
</template>

<script setup>
import MessageBox from "./MessageBox.vue";
import { ElNotification } from "element-plus";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const hiddenPointBox = computed(() => store.state.hiddenPointBox);

const showMessageBox = () => {
    store.commit("saveState", { key: "hiddenPointBox", value: true });
};

const close = () => {
    store.commit("saveState", {
        key: "hiddenPointBox",
        value: false,
    });
};

const copy = async (text) => {
    try {
        await toClipboard(text);
        ElNotification({
            title: "Success",
            message: "Copy Success",
            type: "success",
        });
    } catch (e) {
        console.error(e);
    }
};
</script>

<style lang="scss" scoped>
.my-land {
    min-height: 700px;
    max-height: 1145px;
    background: #f7f7f7;
    padding: 38px 38px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-x: auto;
    &::-webkit-scrollbar {
        width: 6px;
        height: 84px;
    }
    &::-webkit-scrollbar-track {
        background: #f7f7f7;
    }
    &::-webkit-scrollbar-thumb {
        background: #7f7f7f;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-corner {
        background: #179a16;
    }
}
.box {
    width: 250px;
    height: 320px;
    background: #f7f7f7;
    border: 2px solid #333;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 45px;
    &:hover {
        border: 2px solid #ff0e6b;
        box-shadow: 0px 0px 10px #ff0e6b;
    }
    .content-box {
        background: #000000;
        width: 100%;
        height: 250px;
        display: flex;
        justify-content: space-around;
        padding: 10px 10px;
        box-sizing: border-box;
    }
    .footer-point {
        width: 100%;
        text-align: center;
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.box-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .city {
        width: 120px;
        height: 120px;
    }
    .logo {
        width: 110px;
        height: 40px;
        margin-bottom: 30px;
    }
}
.box-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ccc;
    font-size: 12px;
    .bottom {
        img {
            width: 90px;
            height: 90px;
        }
    }
    .top {
        div {
            font-size: 12px;
            border: 2px solid #eee;
            border-radius: 2px;
            padding: 2px 5px;
        }
    }
}

.wrap-box {
    .title {
        font-weight: bold;
        color: #333333;
        font-size: 16px;
        margin-bottom: 12px;
    }
    .detail {
        display: flex;
        margin-bottom: 20px;
        .text {
            width: 399px;
            height: 30px;
            background: #f7f7f7;
            border: 1px solid #dddddd;
            font-size: 14px;
            font-family: "X Metaverse";
            font-weight: bold;
            color: #333333;
            padding: 0 6px;
            box-sizing: border-box;
            cursor: text;
        }
        .copy {
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #ff0e6b;
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
            margin-left: 12px;
        }
    }
}
.understood {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ff0e6b;
    border-radius: 20px;
    margin: 38px auto 0;
    font-weight: bold;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
}
</style>