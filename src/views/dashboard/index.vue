<template>
<section class="dashboard">
  <h2>总览</h2>
  <el-row>
    <el-badge :value="users.length" class="item" type="primary">
      <el-button type="primary">用户数</el-button>
    </el-badge>
    <el-badge :value="vips.length" class="item" type="primary">
      <el-button type="success">会员</el-button>
    </el-badge>
    <el-badge :value="orders.length" class="item">
      <el-button type="warning">订单数</el-button>
    </el-badge>
  </el-row>
  <h3>数据增长详情</h3>
  <el-row>
    <span>请选择日期范围: </span>
    <el-select v-model="defaultTimeInterval" placeholder="请选择">
      <el-option
        v-for="item in intervals"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-row>
  <el-row>
    <UserLineChart :xAxis="timePointList" :data="users" />
  </el-row>
  <el-row>
    <VIPLineChart :xAxis="timePointList" :data="vips" />
  </el-row>
  <el-row>
    <OrderLineChart :xAxis="timePointList" :data="orders" />
  </el-row>
</section>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import UserLineChart from '@/components/user-line-chart.vue';
import VIPLineChart from '@/components/vip-line-chart.vue';
import OrderLineChart from '@/components/order-line-chart.vue';

export default {
  name: 'dashboard',
  data() {
    return {
      users: [],
      vips: [],
      orders: [],
      opderLineOptions: {},
      timePointList: [],
      defaultTimeInterval: 7,
      intervals: [
        { label: '最近7天', value: '7' },
        { label: '最近一个月', value: '30' },
        { label: '最近三个月', value: '90' },
      ]
    }
  },
  components: {
    UserLineChart,
    VIPLineChart,
    OrderLineChart,
  },
  computed: {
    ...mapState({
      app: (state) => state.app.app,
    })
  },
  methods: {
    generatorTimePoint() {
      if (this.timePointList.length > 0) {
        this.timePointList = [];
      }
      for (let i = 0; i < this.defaultTimeInterval; i += 1) {
        this.timePointList.push(moment().subtract(i, 'd').format('YYYY-MM-DD'));
      }

      this.timePointList.reverse();
    },
    fetch() {
      if (!this.app) return;
      this.fetchUsers();
      this.fetchOrders();
    },
    async fetchUsers() {
      let result;
      try {
        result = await this.app.api.get('/classes/_User');
      } catch (error) {
        console.error(error);
      }
      const users = result.data.results;
      this.users = users;
    },
    async fetchOrders() {
      let result;
      try {
        result = await this.app.api.get('/classes/Order');
      } catch (error) {
        console.error(error);
      }
      const orders = result.data.results;
      const vips = orders.filter((item) => item.status === 'PAY_COMPLETE');
      this.orders = orders;
      this.vips = vips;
    },
  },
  watch: {
    app() {
      this.fetch();
    },
    defaultTimeInterval() {
      this.generatorTimePoint()
    },
  },
  mounted() {
    this.fetch();
    this.generatorTimePoint();
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 0 20px;
}
.el-badge {
  margin-right: 15px;
}
.el-row {
  margin-bottom: 15px;
}
</style>
