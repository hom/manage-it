<template>
  <el-container>
    <el-card class="box-card" header="登录管理台">
      <el-form ref="LOGIN_FORM" :model="form" :rules="rules" status-icon class="login-form">
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
    </el-card>
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
.login-form {
  background-color: #fff;
  color: #eeeeee;
  min-width: 400px;
}

.el-form {
  padding: 0 15px;
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
