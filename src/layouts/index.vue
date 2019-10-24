<template>
  <el-container style="height: 100vh">
    <Aside />
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside/index.vue';

export default {
  name: 'home',
  components: {
    Aside,
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
</style>
