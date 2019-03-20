<template>
  <el-container>
    <Aside />
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Aside from '@/components/aside.vue';

export default {
  name: 'home',
  components: {
    Aside
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('me/ACTION_CHECK_LOGIN');
  }
}
</script>
