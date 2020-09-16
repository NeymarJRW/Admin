<template>
  <div class="container">
    <div class="tools">
      <div>
        <Button shape="circle" icon="ios-arrow-back" style="margin-right:10px" @click="getData(currentTime)"></Button>
        <Input v-model="value" placeholder="bundleId" style="width: 200px"/>
        <Button shape="circle" icon="ios-search" class="tools_btn" @click="showInfo"></Button>
        <DatePicker type="date" placeholder="选择日期" style="margin-left:60px;width: 200px"
          @on-change="dateChange"></DatePicker>
      </div>
      <div>
        <Select v-model="stateLabel" style="width:200px;margin-right:10px"
          @on-change="stateChange">
          <Option v-for="item in selectState" :value="item.id" :key="item.id">{{ item.label }}</Option>
        </Select>
        <Button type="primary" style="margin-right:10px"
          @click="createModal = !createModal">添加创建者</Button>
        <Button type="primary" @click="modal = !modal">游戏录入</Button>
      </div>
    </div>
    <!-- code -->
    <!-- <transition name="fade">
      <keep-alive>
        <router-view class="core"></router-view>
      </keep-alive>
    </transition> -->
    <div class="view">
      <Table :columns="columns" :data="tabledata"></Table>
      <Page :total="total" :page-size="pageSize" @on-change="onChange" class="page_style" 
            :current.sync="current"/>
    </div>
    <!-- 提审游戏录入 -->
    <Modal
      v-model="modal" title="提审游戏录入" 
      @on-ok="ok" @on-cancel="cancel" > 
      <Form :model="form" label-position="right" :label-width="100">
        <FormItem label="游戏bundleID">
          <Input v-model="form.bundle"></Input>
        </FormItem>
        <FormItem label="游戏地址">
          <Input v-model="form.url"></Input>
        </FormItem>
        <FormItem label="游戏名称">
          <Input v-model="form.appName"></Input>
        </FormItem>
        <FormItem label="游戏伪装名">
          <Input v-model="form.gameName"></Input>
        </FormItem>
        <FormItem label="游戏创建者">
          <Select v-model="form.user">
            <Option v-for="item in users" :value="item.id" :key="item.id">{{item.userName}}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- 查询访问记录 -->
    <Modal
      v-model="record" title="查询访问记录" footer-hide>
      <Timeline>
        <TimelineItem v-for="(item, i) in records" v-bind:key="i">
          <span class="timeline_item">{{item.time}}</span>
          <span class="timeline_item" :style="{ width: '142px', color: item.color }">{{item.ip}}</span>
          <template>
            <span v-if="item.type == 0" style="color:#19be6b">访问游戏</span>
            <span v-if="item.type == 1" style="color:#ff9900">点击游戏</span>
            <span v-if="item.type == 2" style="color:#ed4014">退出游戏</span>
          </template>
        </TimelineItem>
      </Timeline>
    </Modal>
    <!-- 更新提审状态 -->
    <Modal v-model="upload" title="更新提审状态" @on-ok="upBring">
      <Form :model="uploadForm" label-position="right" :label-width="100">
        <FormItem label="游戏bundleID">
          <Input v-model="uploadForm.bundle"></Input>
        </FormItem>
        <FormItem label="游戏提审状态">
          <Select v-model="uploadForm.state">
            <Option v-for="item in states" :value="item.id" :key="item.id">{{item.title}}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- 添加创建者 -->
    <Modal v-model="createModal" title="添加创建者" @on-ok="craeteUser">
      <Form :model="createForm" label-position="right" :label-width="100">
        <FormItem label="创建者">
          <Input v-model="createForm.user"></Input>
        </FormItem>
        <FormItem label="设置密码">
          <Input v-model="createForm.password"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 修改游戏名称 -->
    <Modal v-model="modifyName" title="修改游戏名称" @on-ok="modifyGameName">
      <Form :model="gameNameForm" label-position="right" :label-width="100">
        <FormItem label="游戏名称">
          <Input v-model="gameNameForm.appName"></Input>
        </FormItem>
        <FormItem label="游戏伪装名称">
          <Input v-model="gameNameForm.gameName"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { addGame, User, showIPInfo, updateAuditState, getAllAudit, addUser, editApp } from '@/api/index'
import { pageApi, timeZero } from '@/util/util'
export default {
  data() {
    return {
      modal: false,
      record: false,
      upload: false,
      createModal: false,
      modifyName: false,
      form: {
        bundle: '',
        url: '',
        appName: '', // 游戏名称
        gameName: '', // 伪装名称
        user: ''
      },
      createForm: {
        user: ''
      },
      uploadForm: {
        bundle: ''
      },
      gameNameForm: {
        id: '',
        appName: '',
        gameName: ''
      },
      users: [],
      columns: [
        {
          title: 'bundleID',
          key: 'bundleId'
        },
        {
          title: '游戏创建者',
          key: 'userName'
        },
        {
          title: '游戏地址',
          key: 'url',
          render: (h, params) => {
            return h('div', {
              style: {
                color: "#2D8CF0",
                cursor: "pointer",
                maxWidth: "200px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
              },
              on: {
                click: () => {
                  window.open(params.row.url)
                }
              },
            }, params.row.url)
          }
        },
        {
          title: '游戏名称',
          key: 'appName'
        },
        {
          title: '游戏伪装名称',
          key: 'gameName'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '游戏提审状态',
          key: 'state',
          render: (h, params) => {
            return params.row.state == 0 ? h('div', {
              style: { color: "#19be6b" }
            },"待提审") : params.row.state == 1 ? h('div', {
              style: { color: "#ff9900" }
            }, "已提审") : h('div', {
              style: { color: "#ed4014" }
            }, "打回")
          }
        },
        {
          title: '操作',
          key: '',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div',[
              h('Button',{
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.upload = !this.upload
                    this.uploadForm.bundle = params.row.bundleId
                    this.uploadForm.state = [Number(params.row.state)]
                  }
                }
              }, '提审状态'),
              h('Button',{
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.record = !this.record
                    showIPInfo({
                      bundle: params.row.bundleId
                    }).then(res => {
                      if(res.code === 1) {
                        var result = res.msg
                        let ipArrs = [], cArr = [] // 初始化空ip 空颜色数组
                        var colorArr = ["#CC9999","#666699","#FF9900","#0099CC","#CCCC99","#CC3399","#99CC00","#FF6666","#CC6600","#CCCC33","#009966","#FFCC99","#CC0066","#FF0033","#666633","#66CCCC","#FF6666","#FF9966","#333399","#663399","#CC3333","#339999"]
                        var ran = Math.floor(Math.random() * colorArr.length)
                        for(var i = 0; i < result.length; i++) {
                          if(ipArrs.indexOf(result[i].ip) == -1) {
                            ipArrs.push(result[i].ip)
                            cArr.push(colorArr[ran])
                            result[i].color = colorArr[ran]
                            colorArr.splice(ran, 1)
                          } else {
                            result[i].color = cArr[ipArrs.indexOf(result[i].ip)]
                          }
                        }
                        this.records = result
                      } else {
                        this.records = []
                      }
                    })
                  }
                }
              },'访问记录'),
              h('Button',{
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modifyName = !this.modifyName
                    this.gameNameForm.id = params.row.id
                    this.gameNameForm.appName = params.row.appName
                    this.gameNameForm.gameName = params.row.gameName
                  }
                }
              },'修改名称')
            ])
          }
        }
      ],
      msgs: [],
      datas: [],
      tabledata: [],
      total: 0,
      pageSize: 10,
      states: [
        { id: 0, title: "待提审" },
        { id: 1, title: "已提审" },
        { id: 2, title: "打回" }
      ],
      selectState: [
        { id: 0, label: "全部" },
        { id: 1, label: "只显示已提审" }
      ],
      stateLabel: 0,
      stateNum: 0,
      value: "",
      records: [],
      curPage: 1,
      current: 1,
      currentTime: null
    }
  },
  mounted() {
    this.getData(this.currentTime)
    this.getUser()
  },
  methods: {
    getData(time) {
      this.datas = []
      getAllAudit({
        time: time
      }).then(res => {
        if(res.code === 1) {
          this.msgs = res.msg
          this.total = res.msg.length
          this.datas = pageApi(res.msg, this.pageSize)
          this.tabledata = this.datas[this.curPage - 1]
          if(this.stateNum === 1) {
            this.handle()
          }
        }
      })
    },
    getUser() {
      User().then(res => {
        if(res.code !== -1) this.users = res
      })
    },
    handle() {
      let emptyBox = []
      this.msgs.map(x => {
        if(x.state === "1") emptyBox.push(x)
      })
      this.datas = pageApi(emptyBox, this.pageSize)
      this.total = emptyBox.length
      this.msgs = emptyBox
      this.tabledata = this.datas[this.curPage - 1] ? this.datas[this.curPage - 1] : this.datas[0], this.curPage = 1
    },
    showInfo() {
      if(this.value) {
        var datas = []
        for(let i = 0, len = this.msgs.length; i < len; i++) {
          if(this.msgs[i].bundleId.indexOf(this.value) > -1) {
            datas.push(this.msgs[i])
          }
        }
        this.current = 1
        this.tabledata = datas
      } else {
        this.getData(this.currentTime)
      }
    },
    upBring() {
      updateAuditState({
        bundle: this.uploadForm.bundle,
        state: this.uploadForm.state
      }).then(res => {
        if(res.code === 1) {
          this.$Message.success(res.msg)
          this.getData(this.currentTime)
        } else {
          this.$Message.info(res.msg)
        }
      })
    },
    ok () {
      addGame({
        bundle: this.form.bundle,
        user: this.form.user,
        url: this.form.url,
        appName: this.form.appName,
        gameName: this.form.gameName,
        createTime: parseInt(Date.now() / 1000),
        state: 1
      }).then(res => {
        this.$Message.success(res.msg)
        this.getData(this.currentTime)
      })
    },
    craeteUser() {
      if(this.createForm.user) {
        addUser({
          name: this.createForm.user,
          password: this.createForm.password
        }).then(res => {
          if(res.code === 1) {
            this.$Message.success(res.msg)
            this.getUser()
          } else {
            this.$Message.info(res.msg)
          }
        })
      }
    },
    modifyGameName() {
      editApp({
        id: this.gameNameForm.id,
        appName: this.gameNameForm.appName,
        gameName: this.gameNameForm.gameName
      }).then(res => {
        if(res.code === 1) {
          this.$Message.success(res.msg)
          this.getData(this.currentTime)
        } else {
          this.$Message.info(res.msg)
        }
      })
    },
    cancel () {
      this.$Message.info('取消')
    },
    onChange(e) {
      this.curPage = e
      this.tabledata = this.datas[e-1]
    },
    stateChange(e) {
      this.stateNum = e
      if(e === 0) {
        this.getData(this.currentTime)
      } else {
        this.handle()
      }
    },
    dateChange(e) {
      this.currentTime = timeZero(e)
      this.value = ""
      this.getData(timeZero(e))
    }
  }
}
</script>

<style lang="stylus" scoped>
.tools 
  margin 10px 20px
  display flex
  justify-content space-between
.tools_btn
  margin-left 10px
.timeline_item 
  padding-right 50px
  display inline-block
  text-align center
.page_style
  text-align right 
  margin-top 10px
</style>

