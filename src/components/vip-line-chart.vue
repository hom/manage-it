<template>
  <Chart :options="options" />
</template>

<script>
import Chart from '@/components/Chart/index.vue';

export default {
  name: 'vip-line-chart',
  data() {
    return {
      options: {},
    };
  },
  components: {
    Chart,
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  watch: {
    data(list) {
      this.options = {
        title: {
          text: 'VIP增长统计',
          left: '10',
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '用户',
            type: 'line',
            smooth: true,
            data: list.map((item) => [item.createdAt, 1]),
          },
        ],
      };
    }
  }
}
</script>
