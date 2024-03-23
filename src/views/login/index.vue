<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()



const defaultUsername = 'admin'
const defaultPassword = '12345'
let formModel = ref({
  username: defaultUsername,
  password: defaultPassword
})
// 登录
const onSubmit = () => {
  const { username, password } = formModel.value
  if (username === defaultUsername && password === defaultPassword) {
    window.VueCookies.set('token', Math.random(), { expires: '1D' })
    router.push('/home')
  } else {
    console.log('账号错误')
  }
}
</script>
<template>
  <div class="login-wrapper">
    <div class="login-container">
      <el-form ref="form" :model="formModel" label-width="80px">
        <el-form-item size="large" label="用户名">
          <el-input v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input size="large" v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" style="width: 100%" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scope lang="scss">
.login-wrapper {
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 400px;
    padding: 20px;
  }
}
</style>
