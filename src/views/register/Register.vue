<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <form>
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          placeholder="请输入用户名"
          v-model="username"
          autocomplete=""
        />
      </div>
      <div class="wrapper_input">
        <input
          type="password"
          class="wrapper_input_content"
          placeholder="请输入密码"
          autocomplete="new-password"
          v-model="password"
        />
      </div>
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          placeholder="确认密码"
          type="password"
          v-model="ensurement"
          autocomplete=""
        />
      </div>
    </form>
    <div class="wrapper_register-button" @click="handleRegister">注册</div>
    <div class="wrapper_register-link" @click="handleLoginClick">
      已有账号去登陆
    </div>
    <Toast v-show="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理注册逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result.errno === 0) {
        // 注册成功
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const router = useRouter()
    // 处理弹框
    const { show, toastMessage, showToast } = useToastEffect()
    // 处理注册
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    // 跳转登陆
    const handleLoginClick = () => {
      router.push({ name: 'Login' })
    }
    return {
      username, password, ensurement, show, toastMessage, handleRegister, handleLoginClick
    }
  }
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
  &_register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &_register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
