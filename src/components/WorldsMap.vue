<template >
    <div class="world-map">
        <div class="world-map-canvas" ref="worldMapDom"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { worldMap } from "../source/mapSVG";
import { worldMapPoint } from "../source/mapPoint";

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
function renderItem(params, api) {
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
function getCoord(params, api, lngIndex, latIndex) {
    let coords = params.context.coords || (params.context.coords = []);
    let key = lngIndex + "-" + latIndex;
    return (
        coords[key] ||
        (coords[key] = api.coord([
            +(latExtent[0] + lngIndex * cellSizeCoord[0]).toFixed(6),
            +(lngExtent[0] + latIndex * cellSizeCoord[1]).toFixed(6),
        ]))
    );
}

const worldMapDom = ref("");

function setMap(svg) {
    echarts.registerMap("sicily", { svg: svg });
    option = {
      backgroundColor: 'transparent',
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
                color: ['#ffffff'],
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
                layoutSize: "90%",
                selectedMode: "single",
                scaleLimit:{
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
}


onMounted(() => {
myChart = echarts.init(worldMapDom.value);
    setMap(worldMap);
});
</script>

<style lang="scss" scoped>
.world-map {
    width: 100%;
    background: #f7f7f7;
    height: 980px;
    padding: 34px;
    box-sizing: border-box;
}
.world-map-canvas{
  width: 100%;
  height: 585px;
  background: url('../assets/background.png');
  background-size: cover;
}

</style>