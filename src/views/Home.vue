<template>
  <el-container>
    <Aside />
    <Main />
  </el-container>
</template>

<script>
import Main from '@/components/main.vue';
import Aside from '@/components/aside.vue';

export default {
  name: 'home',
  components: {
    Main,
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
