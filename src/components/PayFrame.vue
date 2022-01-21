<template>
    <div class="pay-frame-container">
        <div class="pay-frame">
            <div class="pay-price">
                <strong>{{ price }}</strong
                >POT
            </div>
            <slot></slot>
            <slot name="tipList"></slot>
            <button class="pay-button">Mint {{ price }} POT</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({
    price: Number,
});


</script>

<style lang="scss" scoped>
.pay-frame-container {
    width: 260px;
    height: 300px;
    background: #e6e6e6;
    background-image: linear-gradient(-50deg, #0fd2e5, #3e47f8, #e22b80);
    border-radius: 20px;
    padding: 2px;
    box-sizing: border-box;
    .pay-frame {
        width: 100%;
        height: 100%;
        border-radius: 18px;
        background: #fff;
        box-sizing: border-box;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        
    }
}
.pay-price {
    font-weight: bold;
    color: #ff0e6b;
    font-size: 24px;
    text-align: center;
    strong {
        font-size: 36px;
        word-spacing: 20px;
        padding-right: 10px;
    }
}
.pay-button {
    width: 200px;
    height: 40px;
    background: #ff0e6b;
    border-radius: 20px;
    font-size: 16px;
    border: none;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-family: "XMetaverse-Bold";
}


</style>