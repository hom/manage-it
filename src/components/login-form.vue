<template>
  <el-container>
    <el-form ref="LOGIN_FORM" :model="form" :rules="rules" status-icon class="login-form">
      <el-form-item label="账户名称" prop="username">
        <el-input v-model="form.username" placeholder="邮箱或者用户名"></el-input>
      </el-form-item>
      <el-form-item label="账户密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="login('LOGIN_FORM')"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="login('LOGIN_FORM')">立即登录</el-button>
        <el-button @click="resetForm('LOGIN_FORM')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      logining: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      const ref = this.$refs[formName];
      ref.resetFields();
    },
    login(formName) {
      const ref = this.$refs[formName];
      ref.validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'error',
            message: '请确认输入信息是否正确!'
          })
        } else {
          this.logining = true;
          // this.$store.dispatch('me/ACTION_LOGIN', this.form);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  min-width: 400px;
  margin: 0 auto;
  margin-top: 30px;
}
.login-btn {
  text-align: center;
  margin-top: 35px;
}
</style>
