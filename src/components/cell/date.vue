<template>
  <span>{{ formatTime(field) }}</span>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {};
  },

  props: {
    field: {
      type: String
    }
  },

  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}
</script>
