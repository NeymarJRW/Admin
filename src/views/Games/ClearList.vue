<template>
  <div class="all">
    <div class="serach">
      <Input
        style="margin-right:10px;width: 200px"
        v-model="word"
        search
        enter-button
        placeholder="关键词检索..."
        @on-search="searchKey"
      />
      <Button type="primary" @click="suresearch" style="margin-right:10px">全部</Button>
      <DatePicker
        confirm
        type="date"
        placeholder="历史预测"
        style="width: 200px;margin-right:20px"
        @on-change="selectDate"
        @on-ok="postDate"
      ></DatePicker>
      <p
        v-if="loading"
        style="text-align:right;font-weight:bold;margin-right:20px"
      >更新时间: {{update_time}}</p>

      <Button :disabled="handBtn" type="primary" @click="handGetdata" style="margin-right:10px">手动更新</Button>
    </div>
    <!-- <div class="main">
      <p>输入关键词</p>
      <i-input size="large" style="width: 400px;display:none"></i-input>
      <i-input
        v-model="word"
        size="large"
        placeholder="请输入清榜词..."
        style="width: 50%"
        @keyup.enter.native="suresearch"
      >
        <i-button slot="append" icon="ios-search" @click="suresearch"></i-button>
      </i-input>
    </div>-->

    <div class="spin flex" v-if="!loading">
      <Spin size="large"></Spin>
    </div>

    <Table
      v-if="loading"
      border
      :columns="columns2"
      :data="main_showdata"
      @on-sort-change="tableorder"
    ></Table>
    <div class="page flex">
      <Page
        v-if="loading"
        :total="main_total"
        :current.sync="main_currentpage"
        :page-size="main_pageSize"
        @on-change="main_changePage"
      />
    </div>

    <Modal v-model="tableflag" :title="title" width="1000">
      <div class="spin flex" v-if="!loading_in">
        <Spin size="large"></Spin>
      </div>
      <Table v-if="loading_in" border :columns="columns" :data="showdata"></Table>
      <div class="page flex">
        <Page
          v-if="loading_in"
          :total="total"
          :current.sync="currentpage"
          :page-size="pageSize"
          @on-change="changePage"
        />
      </div>
    </Modal>

    <Modal v-model="historyflag" title="历史预测" width="1000">
      <div class="spin flex" v-if="!history_in">
        <Spin size="large"></Spin>
      </div>
      <Table v-if="history_in" border :columns="columns3" :data="showdata"></Table>
      <div class="page flex">
        <Page
          v-if="history_in"
          :total="total"
          :current.sync="currentpage"
          :page-size="pageSize"
          @on-change="changePage"
        />
      </div>
    </Modal>

    <Modal v-model="historyKeyword" title="历史周期" width="800">
      <div v-if="!historyData" class="spin flex">
        <Spin size="large"></Spin>
      </div>
      <p
        style="text-align:center;margin:5px 0; font-size:25px;font-weight:bold"
      >关键词:{{history_Keyword}}</p>
      <Table v-if="historyData" border :columns="columns4" :data="historyData"></Table>
      <div class="page flex">
        <Page
          :total="history_total"
          :current.sync="history_currentpage"
          :page-size="history_pagesize"
          @on-change="history_changePage"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getCearList,
  deleteCearList,
  getCearListinfo,
  getHistoryJudge,
  handGet,
  getHistoryKeyword
} from "@/api/index";
// import { strdata } from "@/api/data.js";
import { log } from "util";
export default {
  data() {
    return {
      handBtn: false,
      title: "详情",
      update_time: "",
      judge_time: "",
      word: null,
      tableflag: false,
      loading: false,
      loading_in: false,
      historyflag: false,
      history_in: false,
      historyKeyword: false,
      history_Keyword: "",
      getdata: "",
      main_showdata: "",
      showdata: "",
      allhistoryData: "",
      historyData: "",
      main_showalldata: "",
      showalldata: "",

      //详情
      columns: [
        {
          title: "ID",
          key: "id",
          width: 50,
          align: "center"
        },
        {
          title: "appId",
          key: "appId",
          align: "center"
        },
        {
          title: "应用名称",
          key: "trackName",
          align: "center"
        },
        {
          title: "关键词",
          key: "keyword",
          align: "center"
        },
        {
          title: "清榜时间",
          key: "clear_time",
          align: "center"
        },
        {
          title: "更新时间",
          key: "update_time",
          align: "center"
        },

        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "<p>你确定要删除吗?</p>",
                        onOk: () => {
                          deleteCearList({ id: params.row.id }).then(res => {
                            if (res.code == 1) {
                              this.$Message.success(res.msg);
                              this.loading_in = false;
                              getCearListinfo({
                                keyword: params.row.keyword
                              }).then(res => {
                                console.log(res);
                                if (res.code == 1) {
                                  this.loading_in = true;
                                  this.showAlldata = res.msg.filter(
                                    item => item.state == "1"
                                  );
                                  this.total = this.showAlldata.length;
                                  this.currentpage = 1;
                                  this.changePage(1);
                                } else {
                                  this.$Modal.info({
                                    title: "提示",
                                    content: res.msg
                                  });
                                }
                              });
                            } else {
                              this.$Message.error(res.msg);
                            }
                          });
                        },
                        onCancel: () => {
                          // this.$Message.info("Clicked cancel");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      // 主页面 关键词，词热，预测时间，周期，最近时间，详情
      columns2: [
        {
          title: "关键词",
          key: "keyword",
          align: "center"
        },
        {
          title: "热度",
          key: "heat",
          align: "center",
          sortable: "custom"
        },
        {
          title: "最近时间",
          key: "clear_time",
          align: "center",
          sortable: "custom"
        },
        {
          title: "预测时间",
          key: "next_time",
          align: "center",
          sortable: "custom"
        },

        {
          title: "周期",
          key: "cycle",
          align: "center",
          sortable: "custom"
        },
        {
          title: "历史周期",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      getHistoryKeyword({ keyword: params.row.keyword }).then(
                        res => {
                          console.log(res);
                          if (res.code == 1) {
                            this.historyKeyword = true;
                            this.allhistoryData = res.msg;
                            this.history_Keyword = res.msg[0].keyword;
                            this.history_total = this.allhistoryData.length;
                            console.log(this.history_total);
                            this.history_currentpage = 1;
                            this.history_changePage(1);
                          } else {
                            this.$Message.error(res.msg);
                          }
                        }
                      );
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        },
        {
          title: "详情",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.tableflag = true;
                      this.loading_in = false;
                      this.title = "详情";
                      getCearListinfo({ keyword: params.row.keyword }).then(
                        res => {
                          console.log(res);
                          if (res.code == 1) {
                            this.loading_in = true;
                            this.showAlldata = res.msg.filter(
                              item => item.state == "1"
                            );
                            this.total = this.showAlldata.length;
                            this.currentpage = 1;
                            this.changePage(1);
                          } else {
                            this.$Modal.info({
                              title: "提示",
                              content: res.msg
                            });
                            this.tableflag = false;
                          }
                        }
                      );
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],

      //历史预测
      columns3: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "关键词",
          key: "keyword",
          align: "center"
        },
        {
          title: "清榜时间",
          key: "clear_time",
          align: "center"
        },
        // last_clear_time
        {
          title: "最近清榜时间",
          key: "last_clear_time",
          align: "center"
        },
        {
          title: "状态",
          key: "judge",
          align: "center",
          render: (h, params) => {
            if (params.row.judge == 1) {
              return h("p", { style: { color: "green" } }, "清榜");
            } else {
              return h("p", { style: { color: "red" } }, "未清榜");
            }
          }
        }
        //   {
        //   title: "详情",
        //   key: "action",
        //   width: 150,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.tableflag = true;
        //               this.loading_in = false;
        //               this.title="历史预测详情";

        //               getCearListinfo({ keyword: params.row.keyword }).then(
        //                 res => {
        //                   console.log(res);
        //                   if (res.code == 1) {
        //                     this.loading_in = true;
        //                     this.showAlldata = res.msg.filter(
        //                       item => item.state == "1"
        //                     );
        //                     this.total = this.showAlldata.length;
        //                     this.currentpage = 1;
        //                     this.changePage(1);
        //                   } else {
        //                     this.$Modal.info({
        //                       title: "提示",
        //                       content: res.msg
        //                     });
        //                     this.tableflag = false;
        //                   }
        //                 }
        //               );
        //             }
        //           }
        //         },
        //         "详情"
        //       )
        //     ]);
        //   }
        // }
      ],

      //历史周期
      columns4: [
        {
          title: "清榜时间",
          key: "time",
          align: "center"
        },
        {
          title: "周期",
          key: "cycle",
          align: "center"
        }
      ],

      //分页
      total: 0,
      main_total: 0,
      currentpage: 1,
      main_currentpage: 1,
      pageSize: 8,
      main_pageSize: 10,

      //历史周期分期
      history_total: 0,
      history_currentpage: 1,
      history_pagesize: 5
    };
  },
  mounted() {
    this.suresearch();
  },
  watch: {
    historyKeyword(val) {
      if (!val) {
        this.historyData = "";
        this.history_Keyword = "";
      }
    }
  },
  methods: {
    getList() {},
    suresearch() {
      this.judge_time = null;
      this.word = null;
      this.loading = false;
      getCearList().then(res => {
        if (res.code == "1") {
          this.loading = true;
          // console.log(object)

          this.update_time = res.msg.update_time;
          this.getdata = res.msg.data;
          this.main_showAlldata = res.msg.data;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        } else {
          this.$Message.error(res.msg);
        }
      });
      // this.loading = true;
      // this.getdata = strdata.msg;
      // this.main_showAlldata = strdata.msg;
      // this.main_total = this.main_showAlldata.length;
      // this.main_currentpage = 1;
      // this.main_changePage(1);
    },
    changePage(index) {
      var start = (index - 1) * this.pageSize;
      var end = start + this.pageSize;
      this.showdata = this.showAlldata.slice(start, end);
    },
    main_changePage(index) {
      var start = (index - 1) * this.main_pageSize;
      var end = start + this.main_pageSize;
      this.main_showdata = this.main_showAlldata.slice(start, end);
    },
    history_changePage(index) {
      var start = (index - 1) * this.history_pagesize;
      var end = start + this.history_pagesize;
      this.historyData = this.allhistoryData.slice(start, end);
    },
    searchKey() {
      if (this.word) {
        var arr = this.getdata.filter(
          item => item.keyword.indexOf(this.word) > -1
        );
        if (arr.length > 0) {
          this.$Message.success("检索成功");
          this.main_showAlldata = arr;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        } else {
          this.$Message.error("没有查到清榜操作!");
        }
      } else {
        this.$Message.error("输入内容为空");
      }
    },
    tableorder(c) {
      if (c.key == "heat") {
        if (c.order == "asc") {
          //大到小
          var arr = this.main_showAlldata.sort(function(a, b) {
            return b.heat - a.heat;
          });
          this.main_showAlldata = arr;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        } else {
          var arr = this.main_showAlldata.sort(function(a, b) {
            return a.heat - b.heat;
          });
          this.main_showAlldata = arr;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        }
      }
      if (c.key == "cycle") {
        var arr2 = this.main_showAlldata.filter(item => !item.cycle); //为空的
        var arr1 = this.main_showAlldata.filter(item => item.cycle); //不为空

        if (c.order == "asc") {
          //大到小
          var arr = arr1.sort(function(a, b) {
            return b.cycle - a.cycle;
          });
          this.main_showAlldata = arr.concat(arr2);
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        } else {
          var arr = arr1.sort(function(a, b) {
            return a.cycle - b.cycle;
          });
          this.main_showAlldata = arr.concat(arr2);
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        }
      }
      if (c.key == "clear_time") {
        if (c.order == "asc") {
          var arr = this.main_showAlldata.sort(function(a, b) {
            return b.clear_time_unix - a.clear_time_unix;
          });
          this.main_showAlldata = arr;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        } else {
          var arr = this.main_showAlldata.sort(function(a, b) {
            return a.clear_time_unix - b.clear_time_unix;
          });
          this.main_showAlldata = arr;
          this.main_total = this.main_showAlldata.length;
          this.main_currentpage = 1;
          this.main_changePage(1);
        }
      }
      if (c.key == "next_time") {
        var arr2 = this.main_showAlldata.filter(item => !item.next_time); //为空的
        var arr1 = this.main_showAlldata.filter(item => item.next_time); //不为空
        if (c.order == "asc") {
          var arr = arr1.sort(function(a, b) {
            return b.next_time_unix - a.next_time_unix;
          });
        } else {
          var arr = arr1.sort(function(a, b) {
            return a.next_time_unix - b.next_time_unix;
          });
        }
        this.main_showAlldata = arr.concat(arr2);
        this.main_total = this.main_showAlldata.length;
        this.main_currentpage = 1;
        this.main_changePage(1);
      }
    },
    selectDate(date) {
      this.judge_time = null;
      this.judge_time = Number(
        new Date(date)
          .getTime()
          .toString()
          .split("")
          .splice(0, 10)
          .join("")
      );
    },
    postDate() {
      if (this.judge_time) {
        this.history_in = false;
        getHistoryJudge({ time: this.judge_time }).then(res => {
          if (res.code == 1) {
            this.historyflag = true;
            this.history_in = true;
            this.showAlldata = res.msg;
            this.total = this.showAlldata.length;
            this.currentpage = 1;
            this.changePage(1);
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    handGetdata() {
      handGet().then(res => {
        console.log(res);
        if (res.code == 1) {
          this.$Message.success(res.msg);
          this.handBtn = true;
        } else {
          this.$Message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.all {
  height: 100%;
  /* background: red; */
  box-sizing: border-box;
  padding: 10px 10px;
}
.main {
  width: 100%;
  height: 20%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}
.main p:nth-child(1) {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.spin {
  margin: 30px 0;
}
.serach {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
