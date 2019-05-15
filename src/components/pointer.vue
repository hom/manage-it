<template>
  <el-button v-if="field.objectId" size="mini" type="success" plain>{{ field.objectId }}</el-button>
  <span v-else>undefined</span>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>
