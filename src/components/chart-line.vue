<template>
  <div ref="myChart" :style="{ height: height, width: width }"></div>
</template>

<script>
export default {
  name: 'chart-line',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // y轴名
    label: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function () {
        return [];
      }
    },
    threshold: {
      type: Number
    },
    options: {
      type: Object
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.resizeHandler();
        this.render(val);
      }
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeHandler, true);
  },
  data() {
    return {
      chart: null,
      defaultOptions: {
        // data中数据大于1条时展示图例
        legend: {
          show: this.data.length > 1
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'time',
          // x轴不显示刻度
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: this.label
          // 单位是 人 时y轴刻度最小间隔为1
          // minInterval: this.label.match(/\(([^)]+)\)/)[1] === '人' ? 1 : undefined
        },
        tooltip: {
          trigger: 'axis',
          //  tooltip 框限制在图表的区域内
          confine: true
        },
        series: this.data.map((row) => {
          return {
            name: row.name,
            data: row.data,
            type: 'line',
            showSymbol: false
          };
        })
      },
      // 内置一条markLine
      defaultMarkLine: {
        data: [
          {
            yAxis: this.threshold,
            label: {
              formatter: (e) => {
                return this.label.match(/\(([^)]+)\)/)
                    ? `${e.value} ${this.label.match(/\(([^)]+)\)/)[1]}`
                    : e.value;
              }
            }
          }
        ],
        symbol: 'none',
        label: {
          color: 'red'
        },
        lineStyle: {
          color: 'red',
          type: [5, 5]
        }
      }
    };
  },
  methods: {
    // 初始化渲染
    initChart() {
      this.chart = this.$echarts.init(this.$refs.myChart);
      this.render();
    },
    // 重复渲染
    render() {
      if (this.chart) {
        // 设置阈值
        if (
            this.threshold &&
            this.defaultOptions.series.length > 0 &&
            this.defaultOptions.series[0].data &&
            this.defaultOptions.series[0].data.length > 0
        ) {
          this.defaultOptions.series[0]['markLine'] = this.defaultMarkLine;
        }
        // 合并自定义options
        this.options && this.recursiveMerge(this.defaultOptions, this.options);
        console.log('options', this.defaultOptions);
        this.chart.setOption(this.defaultOptions);
      }
    },
    resizeHandler() {
      this.chart && this.chart.resize();
    },
    // 递归合并
    recursiveMerge(base, extend) {
      if (!this.isPlainObject(base)) {
        return extend;
      }
      for (const key in extend) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          continue;
        }
        base[key] =
            this.isPlainObject(base[key]) && this.isPlainObject(extend[key])
                ? this.recursiveMerge(base[key], extend[key])
                : extend[key];
        return base;
      }
    },
    // 判断输入是否为对象
    isPlainObject(input) {
      return input && typeof input === 'object' && !Array.isArray(input);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.resize);
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style scoped></style>
