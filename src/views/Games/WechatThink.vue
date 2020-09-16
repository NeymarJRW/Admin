<template>
  <div>
    <div class="main">
      <p>输入微信联想词</p>
      <i-input size="large" style="width: 400px;display:none"></i-input>
      <i-input
        v-model="searchWord"
        size="large"
        placeholder="请输入微信联想词..."
        style="width: 50%"
        @keyup.enter.native="suresearch"
      >
        <i-button slot="append" icon="ios-search" @click="suresearch"></i-button>
      </i-input>
    </div>
    <div class="table" v-if="showdata.length>0">
      <Table v-if="!detail" border :data="showdata" :columns="columns"></Table>
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
import { getWechatThink, getWechatThinkWord } from "@/api/index";
export default {
  data() {
    return {
      searchWord: "",
      showdata: [],
      detailData: [],
      detail: false,
      columns: [
        {
          title: "联想词",
          key: "word",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  textDecoration: "underline"
                },
                on: {
                  click: () => {
                    getWechatThinkWord({ word: params.row.word }).then(res => {
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
              params.row.word
            );
          }
        },
        {
          title: "权重",
          key: "suggestion_buf"
        },
        {
          title: "类型",
          key: "trie_type"
        },
        {
          title: "更新时间",
          key: "update_time"
        }
      ],
      columns2: [
        {
          title: "联想词",
          key: "name"
        }
      ]
    };
  },
  methods: {
    suresearch() {
      if (this.searchWord.length == 0) this.$Message.error("输入内容不能为空");
      else {
        this.showdata = [];
        this.detail = false;
        getWechatThink({ keyword: this.searchWord }).then(res => {
          if (res.code == 1) {
            this.showdata = res.data;
            this.$Message.success(res.message);
          } else this.$Message.error(res.message);
        });
      }
    }
  },
  mounted() {
    // getWechatThink({ keyword: this.searchWord }).then(res => {
    //   if (res.code == 1) {
    //     this.showdata = res.data;
    //     this.$Message.success(res.message);
    //   } else this.$Message.error(res.message);
    // });
    // getWechatThinkWord({ word: "传奇" }).then(res => {
    //   console.log(res);
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
</style>
