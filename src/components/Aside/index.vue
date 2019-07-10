
<template>
  <el-aside width="200px">
    <el-dropdown>
      <span class="el-dropdown-link">
        切换应用<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(app, index) in apps" :key="index">{{ app.name || app.appid }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-menu
      unique-opened
      :default-active="active"
      :default-openeds="opens"
      background-color="#2F689B"
      text-color="#8fb9cf"
      active-text-color="#ffffff"
      @open="handleOpen"
      @select="handleSelect">
      <el-submenu index="/nav">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item-group>
          <template slot="title">系统</template>
          <el-menu-item index="1-1">菜单管理</el-menu-item>
          <el-menu-item index="1-2">用户管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="应用">
          <el-menu-item index="1-3">SCHEMA</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/schema">
        <template slot="title"><i class="el-icon-setting"></i>SCHEMA管理</template>
        <el-menu-item v-for="(schema, index) in schemas" :key="index" :index="`/schema/${schema.className}`">{{ schema.className }}</el-menu-item>
      </el-submenu>
      <el-submenu index="/database">
        <template slot="title"><i class="el-icon-setting"></i>数据管理</template>
        <el-menu-item v-for="(schema, index) in schemas" :key="index" :index="`/database/${schema.className}`">{{ schema.className }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex';

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
    handleSelect(index, indexPath) {
      console.log(index);
      console.log(indexPath);
      this.$router.push(index);
    }
  },
  computed: {
    ...mapState({
      schemas: (state) => state.schema.schemas,
      active: (state) => state.nav.active,
      apps: (state) => state.app.apps
    }),
  },
  mounted() {
    this.$store.dispatch('schema/ACTION_FETCH_SCHEMAS');
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #eeeeee;
  background-color: #25547E;
  height: 100vh;
  text-align: center;
}

.el-dropdown {
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #eeeeee;
}

.el-menu {
  border: none;
  text-align: left;
}
</style>
