<template>
<section class="report">
  <h2>报表统计</h2>
  <el-row>
    <span>请选择报表范围： </span>
    <el-date-picker
      v-model="reportInterval"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </el-row>
  <el-row>
    <el-table
      :data="data"
      border
      stripe
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
      reportInterval: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }],
        disabledDate(date) {
          return moment(date).isAfter(moment());
        }
      },
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
      const todayFrom = moment().format('YYYY-MM-DD');
      const todayTo = new Date();
      await this.fetchDataToReport(todayFrom, todayTo, '今天');
    },
    async fetchDataToReport(from, to, name) {
      const queryUserParams = {
        params: {
          count: 1,
          limit: 0,
          where: {
            createdAt: {
              $gte: {
                __type: 'Date',
                iso: moment(from).toISOString()
              },
              $lt: {
                __type: 'Date',
                iso: moment(to).toISOString()
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
              },
              $lt: {
                __type: 'Date',
                iso: moment(to).toISOString()
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
                iso: moment(from).toISOString(),
              },
              $lt: {
                __type: 'Date',
                iso: moment(to).toISOString(),
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
      this.data.splice(1, 1, report);
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
    },
    reportInterval(value) {
      if (!value) {
        return this.data.pop();
      }
      const [from, to] = value;
      const name = `${moment(from).format('YYYY-MM-DD')} - ${moment(to).format('YYYY-MM-DD')}`;
      this.fetchDataToReport(from, to, name);
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
.el-row {
  margin-bottom: 15px;
}
</style>
