<template>
<el-container class="apps">
  <el-card v-for="( item, index) in apps" :key="index" shadow="always">
    {{ item.name || item.objectId }}
  </el-card>
</el-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'apps',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      apps: (state) => state.app.apps
    }),
  },
  mounted() {
    this.$store.dispatch('app/ACTION_FETCH_APPS');
  }
}
</script>

<style lang="scss" scoped>
.apps {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.el-card {
  width: 50%;
}

</style>
