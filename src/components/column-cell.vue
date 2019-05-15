<template>
  <component :is="cell.type" :field="cell.field"></component>
</template>

<script>
import Pointer from '@/components/pointer.vue';
import ACL from '@/components/acl.vue';
import Date from '@/components/date.vue';
import Boolean from '@/components/boolean.vue';

export default {
  data() {
    return {};
  },

  components: {
    Pointer,
    ACL,
    Date,
    Boolean,
  },

  props: ['cell'],
}
</script>

<style lang="scss" scoped>

</style>
