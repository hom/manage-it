<template>
  <component :is="cell"></component>
</template>

<script>
import Pointer from '@/components/pointer.vue';
import ACL from '@/components/acl.vue';
import Date from '@/components/date.vue';

export default {
  data() {
    return {};
  },

  components: {
    Pointer,
    ACL,
    Date
  },

  props: {
    cell: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
