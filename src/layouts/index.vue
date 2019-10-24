<template>
  <el-container style="height: 100vh">
    <Aside />
    <el-container>
      <el-header>
        <UserNav />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside/index.vue';
import UserNav from '@/components/user-nav.vue';

export default {
  name: 'home',
  components: {
    Aside,
    UserNav,
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('me/ACTION_CHECK_LOGIN');
    this.$store.dispatch('app/ACTION_CHECK_APP');
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  background-color: #eeeeee;
  padding: 0;
}
.el-header {
  background-color: #eeeeee;
  border-bottom: 1px solid #dddddd;
  line-height: 60px;
  text-align: right;
}
</style>
