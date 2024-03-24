<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

let tween: gsap.core.Tween | null = null

interface RuleForm {
  username: string
  password: string
}

const defaultUsername = 'admin'
const defaultPassword = '12345'
let formModel = ref({
  username: defaultUsername,
  password: defaultPassword
})
// 登录
const onSubmit = (formEl: FormInstance | undefined) => {
  const { username, password } = formModel.value
  formEl?.validate((valid) => {
    if (valid) {
      if (username === defaultUsername && password === defaultPassword) {
        window.VueCookies.set('token', Math.random(), { expires: '1D' })
        router.push('/home')
      } else {
        ElMessage.error('用户名或者密码错误！')
      }
    }
  })
}
const boxAnimate = () => {
  tween = gsap.to('.box', {
    duration: 5, // 动画持续5秒
    delay: 1,
    left: 'calc(100% - 76px)',
    rotation: 360,
    repeat: -1, // 动画一直重复
    yoyo: true
  })
}

const boxMouseEnter = () => {
  tween?.pause()
}

const boxMouseOut = () => {
  tween?.play()
}

const handleBoxClick = () => {
  console.log('handleBoxClick')
}

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

onMounted(() => {
  boxAnimate()
})
</script>
<template>
  <div class="login-wrapper">
    <div
      class="box"
      @mouseenter="boxMouseEnter"
      @mouseout="boxMouseOut"
      @click="handleBoxClick"
    ></div>
    <div class="login-container">
      <div class="icon-wrapper">
        <el-icon color="#fff" :size="25"><User /></el-icon>
        <el-icon color="#fff" :size="25"><Lock /></el-icon>
      </div>
      <el-form
        :model="formModel"
        ref="ruleFormRef"
        :rules="rules"
        label-width="30px"
        style="width: 100%"
        size="large"
      >
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :placeholder="defaultUsername"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :placeholder="defaultPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="onSubmit(ruleFormRef)"
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
  width: 100vw;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .box {
    position: absolute;
    top: 15%;
    left: 0;
    width: 75px;
    height: 75px;
    background: #28a92b;
    border-radius: 12px;
    cursor: pointer;
  }
  .login-container {
    display: flex;
    width: 400px;
    padding: 20px;
    position: relative;
    .icon-wrapper {
      display: flex;
      flex-direction: column;
      height: 88px;
      justify-content: space-between;
      position: absolute;
      left: 15px;
      top: 25px;
    }
  }
}
</style>
