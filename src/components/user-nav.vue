<template>
<el-header>
  <el-dropdown v-if="me" @command="handleCommand">
    <span class="el-dropdown-link">
      欢迎你,{{ me.username }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">注销用户</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <router-link v-else to="/login" tag="span"><el-button type="text">立即登录</el-button></router-link>
</el-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      me: (state) => state.me.me
    })
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout();
          break;
        default:
          console.log(command);
          break;
      }
    },
    logout() {
      this.$store.dispatch('me/ACTION_LOGOUT');
    }
  }
}
</script>

<style lang="scss" scoped>
.user-nav {
  text-align: right;
  padding-right: 20px;
  background-color: #EEEEEE;
}
</style>
