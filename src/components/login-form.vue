<template>
  <el-container>
    <el-form ref="LOGIN_FORM" :model="form" :rules="rules" status-icon class="login-form">
      <h2 class="title">登录到控制台</h2>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" v-model="form.username" placeholder="邮箱或者用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="login('LOGIN_FORM')"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="login('LOGIN_FORM')">立即登录</el-button>
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
          this.$store.dispatch('me/ACTION_LOGIN', this.form);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  margin-top: -60px;
  color: #eeeeee;
  min-width: 400px;
  padding: 0 15px;
}

.title {
  text-align: center;
}

.el-form-item {
  color: #eeeeee !important;
}

.login-btn {
  text-align: center;
  margin-top: 35px;
  .el-button {
    width: 100%;
  }
}
</style>
