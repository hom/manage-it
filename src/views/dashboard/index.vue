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
  <el-row>
    <UserLineChart :data="users" />
  </el-row>
  <el-row>
    <VIPLineChart :data="vips" />
  </el-row>
  <el-row>
    <OrderLineChart :data="orders" />
  </el-row>
</section>
</template>

<script>
import { mapState } from 'vuex';
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
    }
  },
  mounted() {
    this.fetch();
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
