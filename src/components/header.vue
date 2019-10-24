<template>
  <section>
    <Logo />
    <UserNav />
  </section>
</template>

<script>
import Logo from '@/components/logo.vue';
import UserNav from '@/components/user-nav.vue';

export default {
  components: {
    Logo,
    UserNav,
  },
  data() {
    return {};
  },
}
</script>

<style lang="scss" scoped>
</style>
