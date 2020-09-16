<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { checkLogin } from '@/api/index'
export default {
  data() {
    return {
      isPc: true
    }
  },

  mounted() {
    this.$router.push({path:"/examination"});
  },
  methods: {

  }
}
</script>

<style>

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
  background: #001529 !important
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item {
  background: #000c18
}

</style>

<style lang="stylus">
*
  margin 0
  padding 0
  list-style none
  font-style none
  text-decoration none
  box-sizing border-box
  cursor default

html, body, #app, .content
  font-family 'Avenir', Helvetica, Arial, sans-serif
  height 100%
  width 100%
  font-size inherit !important

input, textarea
  border none
  background rgba(0,0,0,0)

textarea
  resize none !important
  overflow hidden !important

input:focus, textarea:focus, button:focus
  outline none

.noselect
  user-select none

#app, .content
  display flex

.menu
  height 100%
  background #001529 !important
  user-select none

main
  width calc(100% - 240px)
  overflow-y scroll

.vertical-center-modal
  display flex
  align-items center
  justify-content center
  .ivu-modal
    top 0

// 针对一些公共样式的整体修改
.container
  position relative

.row
  padding-top 12px !important
  margin 0 12px !important

.view
  padding 0 20px

.login_input
  input
    height 40px

</style>

