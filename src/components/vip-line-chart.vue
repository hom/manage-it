<template>
  <Chart :options="options" />
</template>

<script>
import moment from 'moment';
import Chart from '@/components/Chart/index.vue';

function formatTime(time) {
  return moment(time).format('YYYY-MM-DD');
}

export default {
  name: 'vip-line-chart',
  data() {
    return {
      options: {
        title: {
          text: '会员增长统计',
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
        xAxis: {},
        yAxis: {
          type: 'value'
        },
        series: [],
      }
    };
  },
  components: {
    Chart,
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    xAxis: {
      type: Array,
      required: true,
    }
  },
  methods: {
    generatorChartOption() {
      const countMap = this.data.reduce((map, item) => {
        const createdDate = formatTime(item.createdAt);
        map[createdDate] = map[createdDate] ? map[createdDate] + 1 : 1;
        return map;
      }, {})
      this.options = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis,
        },
        series: [
          {
            name: '用户',
            type: 'line',
            smooth: true,
            data: this.xAxis.map((point) => countMap[point] || 0),
          },
        ],
      };
    }
  },
  watch: {
    data() {
      this.generatorChartOption();
    },
    xAxis() {
      this.generatorChartOption();
    }
  }
}
</script>
