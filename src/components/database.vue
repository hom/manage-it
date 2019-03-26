<template>
  <el-table
    :data="collection.results"
    stripe
    style="width: 100%">
    <el-table-column
      v-for="(field, index) in fields"
      :key="index"
      :prop="field.field"
      :label="field.field">
      <template slot-scope="scope">
        {{ typeof scope.row[field.field] === 'object' ? JSON.stringify(scope.row[field.field]) : scope.row[field.field] }}
      </template>

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
      },
      collection: (state) => state.collection.collection,
    }),
  },
  methods: {
    handleDelete(row) {
      console.log(row);
    }
  },
  mounted() {
    console.log(this.$route.params);
    this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', this.$route.params.className);
    this.$store.dispatch('collection/ACTION_FETCH_COLLECTION', this.$route.params.className);
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.path.startsWith('/database')) {
      await this.$store.dispatch('schema/ACTION_FETCH_SCHEMA', to.params.className);
      await this.$store.dispatch('collection/ACTION_FETCH_COLLECTION', to.params.className);
    }
    next();
  },
}
</script>
