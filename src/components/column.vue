<template>
  <ColumnCell :cell="{ type: field.type, field: row[field.field] }" />
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
