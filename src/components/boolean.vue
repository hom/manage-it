<template>
  <el-switch
    v-model="field"
    disabled>
  </el-switch>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    field: {
      type: Boolean,
    }
  },
}
</script>
