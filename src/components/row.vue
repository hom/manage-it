<template>
  <span v-if="field.type === 'String' || field.type === 'Number'">{{ row[field.field] }}</span>
  <span v-else-if="field.type === 'Date'">{{ formatTime(row[field.field]) }}</span>
  <el-button size="mini" v-else-if="field.type === 'Pointer'" type="success" plain>{{ row[field.field] ? row[field.field].objectId : 'undefined' }}</el-button>
  <el-switch
    v-else-if="field.type === 'Boolean'"
    v-model="row[field.field]"
    disabled>
  </el-switch>
  <span v-else>{{ JSON.stringify(row[field.field]) }}</span>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {};
  },
  props: {
    row: {
      type: Object,
    },
    field: {
      type: Object,
    },
  },
  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}
</script>

<style>

</style>
