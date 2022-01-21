<template >
    <div class="original-city">
        <div class="original-city-warp">
            <img :src="originalCityMap" alt="" />
            <div class="tip">
                No auction has started, please contact the scientist if you wish
                to enter
            </div>
        </div>
    </div>
</template>

<script setup>
import originalCityMap from "../assets/center-city.png";

</script>

<style lang="scss" scoped>
@import "../styles/minix.scss";
.original-city {
    width: 100%;
    height: 800px;
    background: #f7f7f7;
    .original-city-warp {
        height: 100%;
        background: url("../assets/background.png") no-repeat;
        background-size: 100% 73%;
        text-align: center;
        background-position: 0px 200px;
        background-origin: border-box;
        img {
            width: 540px;
            height: 540px;
            display: block;
            padding: 60px 0 32px;
            margin: 0 auto;
        }
        .tip {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            padding-left: 42px;
            &::before{
                background: url("../assets/notice.png") no-repeat;
                background-size: cover;
            }
        }
    }
}
</style>