<template>
<section class="database">
  <h2>原始数据</h2>
  <el-row>
    <h3>用户数据</h3>
    <el-table
      :data="users"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="isVIP"
        label="用户类型">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isVIP === '普通' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.isVIP}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="expired"
        label="到期时间">
      </el-table-column>
    </el-table>
  </el-row>
  <el-row>
    <h3>订单数据</h3>
    <el-table
      :data="orders"
      border
      style="width: 100%">
      <el-table-column
        prop="orderNumber"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '已完成' ? 'success' : 'primary'"
            disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="user"
        label="创建用户">
      </el-table-column>
      <el-table-column
        prop="product"
        label="商品">
      </el-table-column>
    </el-table>
  </el-row>
</section>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

function formatTime(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

function formatUserType(isVIP) {
  if (!isVIP) {
    return '普通';
  }

  return '会员';
}

export default {
  name: 'database',
  data() {
    return {
      users: [],
      orders: [],
    }
  },
  components: {},
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
      const users = result.data.results
      this.users = users.map((item) => {
        const { createdAt, isVIP, expired } = item;
        return Object.assign(item, {
          createdAt: formatTime(createdAt),
          isVIP: formatUserType(isVIP),
          expired: formatTime(expired),
        })
      })
    },
    async fetchOrders() {
      let result;
      try {
        result = await this.app.api.get('/classes/Order', {
          params: {
            include: 'user,product'
          }
        });
      } catch (error) {
        console.error(error);
      }
      const orders = result.data.results;
      this.orders = orders.map((item) => {
        const { createdAt, user, product, status } = item;
        return Object.assign(item, {
          createdAt: formatTime(createdAt),
          user: user.username,
          product: product.name,
          status: status === 'PAY_COMPLETE' ? '已完成' : '待支付',
        })
      });
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex === 1) {
        return 'warning-row';
      }
      return '';
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
.database {
  padding: 0 20px;
  background-color: #eeeeee;
}
</style>
