<template >
    <div class="world-map">
        <div class="world-map-canvas" ref="worldMapDom"></div>
        <div class="pay-list">
            <PayFrame :price="200">
                <div class="tip">
                    mint a piece of land at random coordinates
                </div>
            </PayFrame>
            <PayFrame :price="400">
                <div class="tip">
                    mint a piece of land at specified coordinates
                </div>
            </PayFrame>
            <PayFrame :price="700">
                <template #tipList>
                    <ul class="tip-list">
                        <li v-for="(it, i) in tip" :key="i">{{ it }}</li>
                    </ul>
                </template>
            </PayFrame>
            <PayFrame :price="900">
                <template #tipList>
                    <ul class="tip-list">
                        <li v-for="(it, i) in tip2" :key="i">{{ it }}</li>
                    </ul>
                </template>
            </PayFrame>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { worldMap } from "../source/mapSVG";
import { worldMapPoint } from "../source/mapPoint";
import PayFrame from "./PayFrame.vue";

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
let myChart;
let option;
let lngExtent = [2077, 4264];
let latExtent = [2020, 4207];
let cellCount = [39, -39];
let cellSizeCoord = [
    (lngExtent[1] - lngExtent[0]) / cellCount[0],
    (latExtent[1] - latExtent[0]) / cellCount[1],
];
// prettier-ignore
const renderItem = (params, api) =>{
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
}
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

const worldMapDom = ref("");

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
            // backgroundColor: "transparent",
            dimension: 2,
            inRange: {
                color: ["#ffffff"],
                opacity: 0.01,
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
                data: worldMapPoint,
            },
        ],
    };
    option && myChart.setOption(option);
};

onMounted(() => {
    myChart = echarts.init(worldMapDom.value);
    setMap(worldMap);
});
</script>

<style lang="scss" scoped>
@import "../styles/minix.scss";

.world-map {
    @include map-background($height: 980px);
}
.world-map-canvas {
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
</style>