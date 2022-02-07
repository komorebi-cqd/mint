<template >
    <div class="commercial-city">
        <div class="map-canvas" ref="centerCityDom"></div>
        <div class="pay-list">
            <PayFrame :price="800">
                <div class="tip">
                    mint a piece of land at random coordinates
                </div>
                <template #payButton>
                    <button class="pay-button" @click="payButton(800)">
                        Mint 800 POT
                    </button>
                </template>
            </PayFrame>
            <PayFrame :price="1000">
                <div class="tip">
                    mint a piece of land at specified coordinates
                </div>
                <template #payButton>
                    <button class="pay-button" @click="showMessageBox(1000)">
                        Mint 1000 POT
                    </button>
                </template>
            </PayFrame>
            <PayFrame :price="1300">
                <template #tipList>
                    <ul class="tip-list">
                        <li v-for="(it, i) in tip" :key="i">{{ it }}</li>
                    </ul>
                </template>
                <template #payButton>
                    <button class="pay-button" @click="payButton(1300)">
                        Mint 1300 POT
                    </button>
                </template>
            </PayFrame>
            <PayFrame :price="1500">
                <template #tipList>
                    <ul class="tip-list">
                        <li v-for="(it, i) in tip2" :key="i">{{ it }}</li>
                    </ul>
                </template>
                <template #payButton>
                    <button class="pay-button" @click="showMessageBox(1500)">
                        Mint 1500 POT
                    </button>
                </template>
            </PayFrame>
        </div>
    </div>
    <MessageBox v-if="hiddenPointBox">
        <div class="box">
            <div class="title">
                Please enter the coordinates you wish to specify for your
                purchase
            </div>
            <div class="input-point">
                <input type="text" />
                <span>,</span>
                <input type="text" />
            </div>
            <button class="pay-button" @click="payButton(appointPointPrice)">
                Mint {{ appointPointPrice }} POT
            </button>
        </div>
    </MessageBox>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import * as echarts from "echarts";
import { centralCity } from "../source/mapSVG";
import { centralCityPoint } from "../source/mapPoint";
import PayFrame from "./PayFrame.vue";
import MessageBox from "./MessageBox.vue";
import { useStore } from "vuex";
const store = useStore();
const appointPointPrice = ref(0);

const hiddenPointBox = computed(() => store.state.hiddenPointBox);

const showMessageBox = (pointPrice) => {
    appointPointPrice.value = pointPrice;
    store.commit("saveState", { key: "hiddenPointBox", value: true });
};

const payButton = (price) => {
    console.log("随机坐标价格", price);
};

const tip = [
    "mint a piece of land at random  coordinates",
    "enjoy 5 sets of model houses of your choice",
    "enjoy 3 times free decoration service",
];
const tip2 = [
    "mint a piece of land at specified coordinates",
    "enjoy 5 sets of model houses of your choice",
    "enjoy 3 times free decoration service",
];

//以下是地图生成
const centerCityDom = ref("");
let myChart;
let option;
let lngExtent = [1123, 3313];
let latExtent = [1068, 3258];
let cellCount = [39, -39];
let cellSizeCoord = [
    (lngExtent[1] - lngExtent[0]) / cellCount[0],
    (latExtent[1] - latExtent[0]) / cellCount[1],
];
const renderItem = (params, api) => {
    let context = params.context;
    let lngIndex = api.value(0);
    let latIndex = api.value(1);
    let coordLeftTop = [
        +(latExtent[0] + lngIndex * cellSizeCoord[0]).toFixed(6),
        +(lngExtent[0] + latIndex * cellSizeCoord[1]).toFixed(6),
    ];
    let pointLeftTop = getCoord(params, api, lngIndex, latIndex);
    let pointRightBottom = getCoord(params, api, lngIndex + 1, latIndex + 1);
    return {
        type: "rect",
        shape: {
            x: pointLeftTop[0],
            y: pointLeftTop[1],
            width: pointRightBottom[0] - pointLeftTop[0],
            height: pointRightBottom[1] - pointLeftTop[1],
        },
        style: api.style({
            stroke: "rgba(0,0,0,.1)",
        }),
        styleEmphasis: api.styleEmphasis(),
    };
};
const getCoord = (params, api, lngIndex, latIndex) => {
    let coords = params.context.coords || (params.context.coords = []);
    let key = lngIndex + "-" + latIndex;
    return (
        coords[key] ||
        (coords[key] = api.coord([
            +(latExtent[0] + lngIndex * cellSizeCoord[0]).toFixed(6),
            +(lngExtent[0] + latIndex * cellSizeCoord[1]).toFixed(6),
        ]))
    );
};
const setMap = (svg) => {
    echarts.registerMap("sicily", { svg: svg });
    option = {
        backgroundColor: "transparent",
        visualMap: {
            type: "piecewise",
            inverse: true,
            top: 10,
            left: 10,
            show: false,
            pieces: [],
            borderColor: "#ccc",
            borderWidth: 2,
            backgroundColor: "transparent",
            dimension: 2,
            inRange: {
                color: ["#ffffff"],
                opacity: 0,
            },
            calculable: true,
        },
        // title: {
        //     text: "中心城地图",
        //     left: "center",
        //     textStyle: {
        //         color: "red",
        //     },
        // },
        tooltip: {
            trigger: "item",
            formatter: function (params) {
                return `${params.value[0]},${params.value[1]}`;
            },
        },

        geo: [
            {
                map: "sicily",
                roam: true,
                layoutCenter: ["50%", "50%"],
                layoutSize: "92%",
                selectedMode: "single",
                scaleLimit: {
                    max: 2,
                    min: 0.5,
                },
                tooltip: {
                    trigger: "item",
                    formatter: function (params) {
                        return `${params.value[0]},${params.value[1]}`;
                    },
                },
                emphasis: {
                    label: {
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: 30,
                    },
                },
                select: {
                    itemStyle: {
                        color: "red",
                    },
                    label: {
                        show: false,
                    },
                },
            },
        ],
        series: [
            {
                type: "custom",
                coordinateSystem: "geo",
                renderItem: renderItem,
                animation: false,
                emphasis: {
                    itemStyle: {
                        color: "yellow",
                        opacity: 1,
                    },
                },
                encode: {
                    tooltip: 2,
                },
                data: centralCityPoint,
            },
        ],
    };
    option && myChart.setOption(option);
};

onMounted(() => {
    myChart = echarts.init(centerCityDom.value);
    setMap(centralCity);
});
</script>

<style lang="scss" scoped>
@import "../styles/minix.scss";
.commercial-city {
    @include map-background($height: 980px);
}
.map-canvas {
    @include canvas-background($height: 585px);
}
.pay-list {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .tip {
        color: #666;
        font-size: 14px;
        text-align: center;
    }
}
.tip-list {
    @include tip-list;
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

.box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
        font-weight: bold;
        color: #333333;
        font-size: 14px;
    }
    .pay-button {
        margin-top: 56px;
    }
}
.input-point {
    margin: 10px 0;
    display: flex;
    align-items: flex-end;
    input {
        border-left: #fff 0px solid;
        border-top: #fff 0px solid;
        border-right: #fff 0px solid;
        border-bottom: #cccccc 2px solid;
        outline: none;
        height: 74px;
        line-height: 74px;
        width: 100px;
        color: #333333;
        font-size: 36px;
        font-weight: bold;
        box-sizing: border-box;
        font-family: "XMetaverse-Bold";
        text-align: center;
    }
    span {
        font-weight: bold;
        color: #333333;
        padding: 0 14px;
        font-size: 30px;
    }
}
</style>