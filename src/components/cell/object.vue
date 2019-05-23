<template>
  <span>{{ JSON.stringify(field) }}</span>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    field: {
      type: Object,
    }
  },
}
</script>
