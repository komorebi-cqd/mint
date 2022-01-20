<template >
    <div class="commercial-city">
        <div class="map-canvas" ref="centerCityDom"></div>
        <div class="pay-list">
            <PayFrame :price="800"/>
            <PayFrame :price="1000"/>
            <PayFrame :price="1300"/>
            <PayFrame :price="1500"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { centralCity } from "../source/mapSVG";
import { centralCityPoint } from "../source/mapPoint";
import PayFrame from "./PayFrame.vue";

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
.commercial-city {
    width: 100%;
    background: #f7f7f7;
    height: 980px;
    padding: 34px;
    box-sizing: border-box;
}
.map-canvas {
    width: 100%;
    height: 585px;
    background: url("../assets/background.png");
    background-size: cover;
}
.pay-list{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

</style>