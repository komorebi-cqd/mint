<template >
    <div class="my-land">
        <div class="box">
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
</template>

<script setup>
</script>

<style lang="scss" scoped>
.my-land {
    height: 1137px;
    background: #f7f7f7;
    padding: 38px;
    box-sizing: border-box;
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
    transition: all .3s;
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
    .top{
      div{
        font-size: 12px;
        border: 2px solid #eee;
        border-radius: 2px;
        padding: 2px 5px;
      }
    }
}
</style>