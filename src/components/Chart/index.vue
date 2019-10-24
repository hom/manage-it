<template>
  <div id="chart" ref="chart" :style="{ height, width }"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    height: {
      type: String,
      default() {
        return '300px';
      },
    },
    width: {
      type: String,
      default() {
        return '100%';
      }
    }
  },
  watch: {
    options() {
      this.draw();
    }
  },
  methods: {
    draw() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.$props.options);
    },
  },
  mounted() {
    this.draw();
  },
};
</script>
