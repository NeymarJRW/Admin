<template>
  <div>
    <div class="main">
      <p>输入微信小程序名称</p>
      <i-input size="large" style="width: 400px;display:none"></i-input>
      <i-input
        v-model="searchWord"
        size="large"
        placeholder="输入微信小程序名称..."
        style="width: 50%"
        @keyup.enter.native="suresearch"
      >
        <i-button slot="append" icon="ios-search" @click="suresearch"></i-button>
      </i-input>
    </div>
    <div class="table" v-if="alldata.length > 0">
      <Table v-if="!detail" border :data="showdata" :columns="columns"></Table>
      <div class="page">
        <Page
          v-if="!detail"
          :total="total"
          :page-size="pageSize"
          :current="current"
          @on-change="getPage"
          show-elevator
        />
      </div>
      <Table v-if="detail" border :columns="columns2" :data="detailData"></Table>
      <Button
        v-if="detail"
        type="primary"
        @click="detail=!detail"
        :style="{float:'right',marginTop:'20px'}"
      >返回</Button>
    </div>
  </div>
</template>

<script>
import { getWechatSearch, getWechatSearchWord } from "@/api/index";
// import { appdata } from "@/api/data";
export default {
  data() {
    return {
      searchWord: "",
      alldata: [],
      showdata: [],
      detailData: [],
      total: 0,
      pageSize: 8,
      current: 1,
      detail: false,
      columns: [
        {
          title: "小程序名称",
          key: "nick_name",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  textDecoration: "underline"
                },
                on: {
                  click: () => {
                    getWechatSearchWord({
                      nick_name: params.row.nick_name
                    }).then(res => {
                      if (res.code == 1) {
                        this.detail = true;
                        this.detailData = res.data;
                        this.$Message.success(res.message);
                      } else {
                        this.$Message.error(res.message);
                      }
                    });
                  }
                }
              },
              params.row.nick_name
            );
          }
        },
        {
          title: "简介",
          key: "description"
        },
        {
          title: "类目",
          key: "categorys"
        },
        {
          title: "类型",
          key: "mainbody_type",
          render: (h, params) => {
            if (params.row.mainbody_type == 1) {
              return h("p", "公司");
            } else {
              return h("p", "个人");
            }
          }
        },
        {
          title: "主体",
          key: "mainbody"
        },
        {
          title: "原始ID",
          key: "user_name"
        },
        {
          title: "更新时间",
          key: "update_time"
        }
      ],
      columns2: [
        {
          title: "关键词",
          key: "name"
        }
      ]
    };
  },
  methods: {
    getPage(index) {
      var start = (index - 1) * this.pageSize;
      var end = start + this.pageSize;
      this.showdata = this.alldata.slice(start, end);
    },
    suresearch() {
      if (this.searchWord.length == 0) this.$Message.error("输入内容不能为空");
      else {
        this.alldata = [];
        this.detail = false;
        getWechatSearch({ keyword: this.searchWord }).then(res => {
          if (res.code == 1) {
            this.alldata = res.data;
            this.total = this.alldata.length;
            this.getPage(1);
            this.$Message.success(res.message);
          } else this.$Message.error(res.message);
        });
      }
    }
  },
  mounted() {
    // this.showdata = appdata.data;
    // this.alldata = appdata.data;
    // this.total = this.alldata.length;
    // this.getPage(1);
    // getWechatSearchWord({ word: "传奇" }).then(res => {
    //   console.log(res);
    // });
    // getWechatSearch({ keyword: this.searchWord }).then(res => {
    //   if (res.code == 1) this.showdata = res.data;
    // });
  }
};
</script>

<style scoped>
.main {
  width: 90%;
  height: 20%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
}
.main p:nth-child(1) {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 18px;
}
.table {
  width: 90%;
  margin: 20px auto;
}
.page {
  margin-top: 20px;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
