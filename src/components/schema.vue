<template>
  <el-table
    :data="fields"
    stripe
    style="width: 100%">
    <el-table-column
      prop="field"
      label="字段">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="targetClass"
      label="目标">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      schema: (state) => state.schema.schema,
      fields: (state) => {
        if (!state.schema.schema) return [];
        const { fields } = state.schema.schema;
        // eslint-disable-next-line
        return Object.keys(fields).map((item) => {
          return {
            field: item,
            ...fields[item],
          }
        })
      }
    }),
  },
  methods: {
    handleDelete(row) {
      console.log(row);
    }
  },
  mounted() {
    this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', this.$route.params.className);
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.path.startsWith('/schema')) {
      await this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', to.params.className);
    }
    next();
  },
}
</script>
