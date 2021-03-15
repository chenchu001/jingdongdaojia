<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper_img" />
    <form>
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          placeholder="用户名"
          v-model="username"
          autocomplete
        />
      </div>
      <div class="wrapper_input">
        <input
          type="password"
          class="wrapper_input_content"
          placeholder="请输入密码"
          v-model="password"
          autocomplete="new-password"
        />
      </div>
      <div class="wrapper_login-button" @click="handleLogin">登陆</div>
    </form>
    <div class="wrapper_login">
      <div class="wrapper_login-link" @click="handleRegister">立即注册</div>
      <div class="wrapper_login-line"></div>
      <div class="wrapper_login-register">忘记密码</div>
    </div>
    <Toast v-show="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理登陆逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

export default {
  name: 'Login',
  beforeRouteUpdate() {
    console.log(111)
  },
  setup() {
    const router = useRouter()
    // 处理弹框
    const { show, toastMessage, showToast } = useToastEffect()
    // 处理登陆
    const { username, password, handleLogin } = useLoginEffect(showToast)
    // 处理注册
    const handleRegister = () => {
      router.push({ name: 'Register' })
    }
    return { handleLogin, handleRegister, username, password, show, toastMessage }
  },
  components: { Toast }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &_input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    &_content {
      margin-top: 0.12rem;
      line-height: 0.22rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &_login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &_login {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &-line {
      background: #777;
      opacity: 0.8;
      width: 0.01rem;
      height: 0.12rem;
      margin: 0.03rem 0.12rem 0 0.12rem;
    }
  }
}
</style>
