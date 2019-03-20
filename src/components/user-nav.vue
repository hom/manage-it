<template>
  <section class="user-nav">
    <el-dropdown>
      <span class="el-dropdown-link">
        多语言<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>简体中文</el-dropdown-item>
        <el-dropdown-item>English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown v-if="me" @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎你,{{ me.username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="me">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">注销用户</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link v-else to="/login" tag="span"><el-button type="text">立即登录</el-button></router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    me() {
      return this.$store.state.me.me
    },
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
  flex-grow: 1;
  text-align: center;
  border-bottom: 1px solid #eee;
  line-height: 61px;
}
.el-dropdown {
  margin-right: 25px;
}
</style>
