<template>
  <div>
    <div class="progressBox_start_dicItem">
      <span>昨日成功启动:</span>
      <span class="progressBox_start_dicItem_text2">588</span>
      <span>0%</span>
    </div>
    <div class="progressBox_start_dicItem">
      <span>最近30天总计:</span>
      <span class="progressBox_start_dicItem_text2">14106</span>
    </div>
    <div class="progressBox_start_dicItem">
      <span>昨日启动失败:</span>
      <span class="progressBox_start_dicItem_text2">2</span>
      <span>0%</span>
    </div>
    <v-chart :options="option" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  components: {
    'v-chart': ECharts
  },
  computed: {
    ...mapState(['home']),
    // eslint-disable-next-line vue/return-in-computed-property
    xData: function() {
      if (JSON.stringify(this.$store.state.home.list) !== '{}') {
        const arr = this.$store.state.home.list.totalNums
        const x = []
        arr.forEach(item => {
          x.push(item.tradeDate)
        })
        return x
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    yData: function() {
      if (JSON.stringify(this.$store.state.home.list) !== '{}') {
        const arr = this.$store.state.home.list.totalNums
        const y = []
        arr.forEach(item => {
          y.push(item.totalNum)
        })
        return y
      }
    }
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#5fa1e1'
            }
          }
        },
        series: [
          {
            data: this.yData,
            type: 'line',
            areaStyle: {
              color: '#d0e9ff'
            },
            lineStyle: {
              color: '#5fa1e1'
            },
            itemStyle: {
              color: '#5fa1e1'
            },
            smooth: true
          }
        ]
      }
    }
  },
  watch: {
    xData: function(newVal, oldVal) {
      console.log('222', newVal)
      this.option.xAxis.data = newVal
    },
    yData: function(newVal, oldVal) {
      console.log('343', newVal)
      this.option.series[0].data = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
$textColor1: #666;
$textColor2: #999;
.progressBox_start_dicItem {
  width: 50%;
  color: $textColor2;
  float: left;
  .progressBox_start_dicItem_text2 {
    font-size: 24px;
    color: $textColor1;
    display: inline-block;
    min-width: 60px;
    text-align: right;
  }
}
.echarts{
	left: -14px;
  top: -22px;
}
</style>
