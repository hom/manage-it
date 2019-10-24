<template>
<section class="report">
  <h2>报表统计</h2>
  <el-row>
    <h3>用户数据</h3>
    <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userCount"
        label="用户数">
      </el-table-column>
      <el-table-column
        prop="vipUserCount"
        label="会员数">
      </el-table-column>
      <el-table-column
        prop="allOrderCount"
        label="订单数">
      </el-table-column>
      <el-table-column
        prop="completeOrderCount"
        label="已完成订单">
      </el-table-column>
      <el-table-column
        prop="totalIncome"
        label="收入">
      </el-table-column>
    </el-table>
  </el-row>
</section>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'report',
  data() {
    return {
      data: [],
    }
  },
  components: {},
  computed: {
    ...mapState({
      app: (state) => state.app.app,
    })
  },
  methods: {
    async fetch() {
      if (!this.app) return;
      const today = moment().format('YYYY-MM-DD');
      await this.fetchDataToReport(today, '今天');
      const recent7Day = moment().subtract(7, 'days').format('YYYY-MM-DD');
      await this.fetchDataToReport(recent7Day, '最近7天');
      const thisMonth = moment().format('YYYY-MM');
      await this.fetchDataToReport(thisMonth, '本月');
      const recent1Month = moment().subtract(1, 'months').format('YYYY-MM-DD');
      await this.fetchDataToReport(recent1Month, '最近一个月');
      const recent3Month = moment().subtract(3, 'months').format('YYYY-MM-DD');
      await this.fetchDataToReport(recent3Month, '最近三个月');
    },
    async fetchDataToReport(from, name) {
      const queryUserParams = {
        params: {
          count: 1,
          limit: 0,
          where: {
            createdAt: {
              $gte: {
                __type: 'Date',
                iso: moment(from).toISOString()
              }
            }
          }
        }
      };
      const users = await this.fetchUsers(queryUserParams);

      const queryAllOrderParams = {
        params: {
          count: 1,
          limit: 0,
          where: {
            createdAt: {
              $gte: {
                __type: 'Date',
                iso: moment(from).toISOString()
              }
            }
          }
        }
      }
      const allOrders = await this.fetchOrders(queryAllOrderParams);

      const queryCompleteOrderParams = {
        params: {
          include: 'product',
          where: {
            status: 'PAY_COMPLETE',
            createdAt: {
              $gte: {
                __type: 'Date',
                iso: moment(from).toISOString()
              }
            }
          }
        }
      }
      const completeOrders = await this.fetchOrders(queryCompleteOrderParams);
      const totalIncome = completeOrders.results.reduce((income, item) => {
        income += item.product.price / 1;
        return income;
      }, 0)

      const report = {
        name,
        allOrderCount: allOrders.count,
        completeOrderCount: completeOrders.results.length,
        userCount: users.count,
        vipUserCount: completeOrders.results.length,
        totalIncome,
      }
      this.data.push(report);
    },
    async fetchUsers(params) {
      let result;
      try {
        result = await this.app.api.get('/classes/_User', params);
      } catch (error) {
        console.error(error);
      }
      return result.data;
    },
    async fetchOrders(params) {
      let result;
      try {
        result = await this.app.api.get('/classes/Order', params);
      } catch (error) {
        console.error(error);
      }
      return result.data;
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
.report {
  padding: 0 20px;
  background-color: #eeeeee;
}
</style>
