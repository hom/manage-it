<template>
  <component :is="cell.type" :field="cell.field"></component>
</template>

<script>
import Pointer from '@/components/cell/pointer.vue';
import Relation from '@/components/cell/relation.vue';
import ACL from '@/components/cell/acl.vue';
import Date from '@/components/cell/date.vue';
import Boolean from '@/components/cell/boolean.vue';
import Number from '@/components/cell/number.vue';
import String from '@/components/cell/string.vue';
import Object from '@/components/cell/object.vue';
import File from '@/components/cell/file.vue';
import Bytes from '@/components/cell/bytes.vue';
import Polygon from '@/components/cell/polygon.vue';
import GeoPoint from '@/components/cell/geo-point.vue';
import Array from '@/components/cell/array.vue';

export default {
  data() {
    return {};
  },

  components: {
    // parse-server type
    Pointer,
    Relation,
    ACL,
    // javascript type
    Date,
    Boolean,
    Number,
    String,
    Object,
    File,
    Bytes,
    Polygon,
    GeoPoint,
    Array,
  },

  props: ['cell'],
}
</script>

<style lang="scss" scoped>

</style>
