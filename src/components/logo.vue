<template>
  <router-link to="/" class="logo" tag="h2">
    <LogoSvg />
  </router-link>
</template>

<script>
import LogoSvg from '@/components/logo-svg.vue';

export default {
  components: {
    LogoSvg,
  },
}
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  flex-grow: 1;
  height: 61px;
  line-height: 61px;
  text-align: center;
  border-bottom: 1px solid #eee;
  color: #505050;
  overflow: hidden;
}
</style>
