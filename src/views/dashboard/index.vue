<template>
<h2>dashboard</h2>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {}
  },
  components: {},
  mounted() {
    this.$store.dispatch('me/ACTION_CHECK_LOGIN');
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  background-color: #eeeeee;
  padding: 0;
}
</style>
