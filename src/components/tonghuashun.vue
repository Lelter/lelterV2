<template>
  <div class="page-view">
    <div id="main" style="width: 1600px;height:786px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'index',
  data() {
    return {};
  },
  mounted() {
    this.myecharts()
  },
  methods: {
    myecharts() {
      let url = `http://101.35.153.165/test.php`
      let time=new Date()
      let nowTime = Date.parse(time)
      let lastYearTime=time.setFullYear(time.getFullYear()-1)
      let params={"start_date":lastYearTime,"end_date":nowTime,"app_ids":["303191318"],"countries":["CN"],"categories":[6015]}
      axios.post(url,params).then(result => {
        var myChart = this.$echarts.init(document.getElementById('main'));
        console.log(result)
        let data1 = result.data.data
        console.log(data1)
        for (let i = 0; i < data1.length; i++) {
          data1[i][0] = data1[i][0] * 1000
        }
        // 指定图表的配置项和数据
        var option = {
          color: [
            '#dd6b66',
            '#739bbc',
            '#f49f42'
          ],
          title:{
            text:"一年来同花顺APP下载数量，可以推断散户热情程度",
            subtext: "仅供参考",
            left: "center",
            top: "80%",
            textStyle: {
              fontSize: 30
            },
            subtextStyle: {
              fontSize: 20
            }
          },
          dataset: {
            dimensions: ['time', '下载数量', '上证指数'],
            source: data1,


          },
          legend: {
            data: ['下载数量', '上证指数']
          },
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            },
            axisLabel: {

            },
          },
          yAxis: [
            {
              type: 'value',
              name: '下载数量',
              position: 'left'
            },
            {
              type: 'value',
              name: '上证指数',
              position: 'right',
              max: 'dataMax',
              min: 3000
            }
          ],
          series: [
            {

              showSymbol: false,
              name: '下载数量',
              type: 'line',
              hoverAnimation: false,
              smooth: true,
              symbolSize: 4,
              encode: {
                x: 'time',
                y: '下载数量',
              },
              yAxisIndex: 0
            },
            {

              showSymbol: false,
              name: '上证指数',
              type: 'line',
              hoverAnimation: false,
              smooth: true,
              symbolSize: 4,
              encode: {
                x: 'time',
                y: '上证指数',
              },
              yAxisIndex: 1
            },


          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

    }
  },
};
</script>
<style>
.page-view {
  /*margin-top: 60px;*/
}

</style>
