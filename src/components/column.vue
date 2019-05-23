<template>
  <span v-if="field.type === 'String' || field.type === 'Number'">{{ row[field.field] }}</span>
  <ColumnCell v-else-if="field.type === 'Pointer' || field.type === 'Date' || field.type === 'Boolean' || field.type === 'ACL'" :cell="{ type: field.type, field: row[field.field] }" />
  <span v-else>{{ JSON.stringify(row[field.field]) }}</span>
</template>

<script>
import ColumnCell from '@/components/column-cell.vue';

export default {
  data() {
    return {};
  },

  components: {
    ColumnCell
  },

  props: {
    row: {
      type: Object,
    },
    field: {
      type: Object,
    },
  },

}
</script>
