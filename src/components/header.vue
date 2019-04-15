<template>
  <el-header class="header">
    <Logo />
    <UserNav />
  </el-header>
</template>

<script>
import Logo from '@/components/logo.vue';
import UserNav from '@/components/user-nav.vue';

export default {
  components: {
    Logo,
    UserNav,
  },
  data() {
    return {};
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #545c64;
  color: #EEEEEE;
}
</style>
