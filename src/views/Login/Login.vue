<template>
  <div class="container">
    <Form :model="formLogin" class="form_login">
      <div class="form_title">
        提审管理后台
      </div>
      <FormItem>
        <Input type="text" v-model="formLogin.name" placeholder="用户名"
          style="width:270px" class="login_input">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formLogin.password" placeholder="密码"
          style="width:270px" class="login_input" @keyup.enter.native='Enter($event)'>
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <FormItem>
          <div class="code_form">
            <Input v-model="formLogin.code" placeholder="验证码" @keyup.enter.native='Enter($event)'
              style="width:125px" class="login_input"></Input>
            <img :src="verify" alt="" class="code_style" @click="RefreshCode">
          </div>
        </FormItem>
        <Button type="primary" class="submit_login" @click="submitLogin">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { verify, loginAdmin } from '@/api/index'
export default {
  data() {
    return {
      verify: '',
      formLogin: {
        name: '',
        password: '',
        code: ''
      }
    }
  },
  mounted(){
    this.verify = verify + '?v=' + Date.now()
  },
  methods: {
    Enter(keyCode) {
      if(keyCode.keyCode === 13) {
        this.submitLogin()
      }
    },
    submitLogin() {
      loginAdmin(this.formLogin).then(res => {
        if(res.code === 1) {
          this.$router.push({ path: '/examination' })
        } else {
          this.$Message.info(res.msg)
          this.verify = verify + '?v=' + Date.now()
        }
      })
    },
    RefreshCode() {
      this.verify = verify + '?v=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background #293038
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center

.form_login
  display flex
  flex-direction column
  align-items center
  margin-top -40px

.form_title
  font-size 34px
  color #fff
  font-family '宋体', '楷体', 'Avenir'
  margin-bottom 20px

.code_style
  height 36px
  width 125px

.code_form
  display flex
  align-items center
  justify-content space-between

.submit_login
  height 42px
  width 270px
  margin-top 25px
</style>
