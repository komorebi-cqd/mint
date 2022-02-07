<template>
    <div class="message-box">
        <div class="box">
            <div class="close" @click="close"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

const hiddenPointBox = computed(() => store.state.hiddenPointBox);

const close = () => {
    store.commit("saveState", {
        key: "hiddenPointBox",
        value: !hiddenPointBox.value,
    });
};

watchEffect(() => {
    if (hiddenPointBox.value === true) {
        document.body.className = "hidden-scroll";
    } else {
        document.body.removeAttribute("class", "hidden-scroll");
    }
});
</script>

<style lang="scss" scoped>
.message-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    z-index: 99;
}
.box {
    width: 480px;
    min-height: 340px;
    background: #ffffff;
    border-radius: 10px;
    z-index: 199;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 57px 36px;

    .close {
        position: absolute;
        top: 25px;
        right: 25px;
        width: 20px;
        height: 20px;
        background: url("../assets/close.png") no-repeat;
        cursor: pointer;
    }
}
</style>