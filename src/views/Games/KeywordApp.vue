<template>
  <div class="key">
          <div class="words">
          <p>选择语言:</p>
         <div class="xiala">
            <label style="margin-right:15px"><input name="language" type="radio" :value="true"  v-model="language" style="margin-right:5px"/>泰国</label>
            <label style="margin-right:15px"><input name="language" type="radio" :value="false"  v-model="language" style="margin-right:5px"/>越南</label>
          </div>
        </div>
    <Table :loading="loading" :data="showdata" :columns="columns1"></Table>
    <div class="page" v-if="!loading">
      <Page :current.sync="pageindex" :total="total" :page-size="pageSize" show-elevator @on-change="changePage" />
    </div>
    <Modal width="800" v-model="showApp" title="AppID">
      <p class="app">{{AppId}}</p>
    </Modal>
  </div>
</template>

<script>
import { getKeywordApp } from "@/api/index";
export default {
  data() {
    return {
      language:true,
      loading: true,
      showApp: false,
      pageindex:1,
      AppId: "",
      total: 0,
      pageSize: 10,
      columns1: [
        {
          title: "关键词",
          key: "word"
        },
        {
          title: "优先度",
          key: "priority"
        },
        {
          title: "app数量",
          key: "searchcount"
        },
        {
          title: "设备类型",
          key: "type"
        },
        {
          title: "时间",
          key: "time"
        },
        {
          title: "类型名称",
          key: "genreName"
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.AppId = "";
                      this.showApp = true;
                      this.AppId = params.row.searchapp;
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      showdata: []
    };
  },
  mounted() {

     this.language = true;
      this.getData(1)
  },
  watch:{
    language(val){
      this.language=val;
      this.getData(1);

    }
  },
  methods: {
    getData(i) {
      this.loading = true;
      getKeywordApp({ page: i ,language: this.language ? "tl" : "vn"}).then(res => {
        if (res.code == 1) {
          this.showdata = res.msg.data;
          this.total = res.msg.pageCount * this.pageSize;
          this.pageindex=i
          this.loading = false;
        }
      });
    },
    changePage(index) {
      this.getData(index);
    }
  }
};
</script>

<style>
.key {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.page {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  word-break: break-all;
}
.words{
  display: flex;
justify-content: flex-start;
align-items: center;
}
.words p {
  margin-right: 20px;
}
</style>
