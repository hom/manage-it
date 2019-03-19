<template>
  <LoginForm />
</template>

<script>
import Vue from 'vue'
import LoginForm from '@/components/login-form.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.el-header {
  text-align: left;
}
</style>
