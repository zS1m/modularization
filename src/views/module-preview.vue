<template>
  <div class="module-preview">
    <div class="chart-block">
      <chart-line label="连接时延(ms)" :options="customOptions" :data="testData" :threshold="30"></chart-line>
    </div>
  </div>
</template>

<script>
import ChartLine from "@/components/chart-line";

export default {
  name: 'module-preview',
  components: { ChartLine },
  data() {
    return {
      testData: [
        {
          name: '上海',
          data: [
            ['2022-08-06 17:20:20', 15],
            ['2022-08-06 17:30:20', 20],
            ['2022-08-06 17:40:20', 30],
            ['2022-08-06 17:50:20', 25],
            ['2022-08-06 18:00:20', 35],
            ['2022-08-06 18:10:20', 10],
          ]
        },
        {
          name: '北京',
          data: [
            ['2022-08-06 17:20:20', 25],
            ['2022-08-06 17:30:20', 10],
            ['2022-08-06 17:40:20', 20],
            ['2022-08-06 17:50:20', 15],
            ['2022-08-06 18:00:20', 30],
            ['2022-08-06 18:10:20', 35],
          ]
        }
      ],
      customOptions: {
        legend: {
          icon: 'circle'
        },
        tooltip: {
          valueFormatter: (value) => value + ' 毫秒'
        },
        xAxis: {
          axisTick: {
            show: true
          }
        },
      }
    }
  }
};
</script>

<style scoped>
.module-preview {
  height: 100%;
}

.chart-block {
  height: 300px;
  margin-top: 5rem;
}
</style>
