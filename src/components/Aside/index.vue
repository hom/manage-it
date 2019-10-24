
<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">图形总览</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">数据库</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">报表</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      opens: []
    }
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

<style lang="scss" scoped></style>
