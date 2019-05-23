<template>
  <span v-if="field">{{ JSON.stringify(field) }}</span>
  <span v-else>Public Read and Write</span>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    field: {
      type: Object
    },
  }
}
</script>
