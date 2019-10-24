
<template>
  <el-aside width="200px">
    <Logo />
    <el-menu
      router
      default-active="2"
      background-color="#344154"
      text-color="#eeeeee"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">图形总览</span>
      </el-menu-item>
      <el-menu-item index="/dashboard/database">
        <i class="el-icon-document"></i>
        <span slot="title">数据库</span>
      </el-menu-item>
      <el-menu-item index="/dashboard/report">
        <i class="el-icon-setting"></i>
        <span slot="title">报表</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import Logo from '@/components/logo.vue';

export default {
  data() {
    return {
      opens: []
    }
  },
  components: {
    Logo,
  },
  methods: {
    handleOpen(index, indexPath) {
      console.log(index);
      console.log(indexPath);
      // this.$router.push(index);
    },
    handleClose(index, indexPath) {
      console.log(index);
      console.log(indexPath);
      this.$router.push(index);
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>
