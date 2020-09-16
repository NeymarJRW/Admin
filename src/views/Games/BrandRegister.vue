<template>
  <div class="all">
    <div class="main">
      <p>输入商标名</p>
      <i-input size="large" style="width:400px;display:none"></i-input>
      <i-input
        v-model="searchWord"
        size="large"
        placeholder="请输入商标名..."
        style="width: 50%"
        @keyup.enter.native="suresearch"
      >
        <i-button slot="append" icon="ios-search" @click="suresearch"></i-button>
      </i-input>
    </div>

    <div class="result" v-if="alldata.length>0">
      <!-- 选择状态 -->
      <Dropdown :style="{marginLeft:'10px'}" @on-click="selectStatusEvent">
        <Button type="primary" :style="{width:'100px'}">
          {{selectStatus ? selectStatus :'选择状态'}}
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list" class="xialai">
          <DropdownItem
            v-for="(item,index) in statusList"
            :name="item"
            :key="index"
          >{{item | getstatus}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        type="primary"
        @click="exportExcel"
        style="margin-left:10px"
      >导出{{selectStatus ? selectStatus :'全部'}}Excel</Button>
      <ul class="list">
        <li v-for="(item,index) in showdata " :key="index">
          <img :src="item.tmg_img" alt />
          <div class="lin1">
            <p :style="{color:'blue',fontWeight:'bold'}">{{item.name}}</p>
            <p>
              专营权期限开始:
              <span>{{item.date_reg | getTime}}</span>
            </p>
            <p>
              专营权期限结束:
              <span>{{item.date_end | getTime}}</span>
            </p>
          </div>
          <div class="lin2">
            <p>
              注册号:
              <span>{{item.reg_no}}</span>
            </p>
            <p>
              初审公告日期:
              <span>{{item.date_register | getTime}}</span>
            </p>
            <p>
              国际分类:
              <span>{{item.int_cls}}</span>
            </p>
          </div>
          <div class="lin3">
            <p>
              申请人:
              <span :style="{color:'blue'}">{{item.applicant_cn}}</span>
            </p>
            <p>
              申请日期:
              <span>{{item.date_trail | getTime}}</span>
            </p>
            <p>
              当前状态:
              <span
                v-if="item.status==100 "
                :style="{background:'#1E90FF',color:'#fff',padding:'0 5px',borderRadius:'5px'}"
              >已注销</span>
              <span
                v-if="item.status==101 "
                :style="{background:'#FF4500',color:'#fff',padding:'0 5px',borderRadius:'5px'}"
              >待审</span>
              <span
                v-if="item.status==102 "
                :style="{background:'#3CB371',color:'#fff',padding:'0 5px',borderRadius:'5px'}"
              >已注册</span>
              <span
                v-if="item.status==103 "
                :style="{background:'#FF4500',color:'#fff',padding:'0 5px',borderRadius:'5px'}"
              >已驳回</span>
              <span
                v-if="item.status==104 "
                :style="{background:'#3CB371',color:'#fff',padding:'0 5px',borderRadius:'5px'}"
              >已初审</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="page">
        <Page
          :total="total"
          :page-size="pageSize"
          :current.sync="current"
          @on-change="getPage"
          show-elevator
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBrandRegister,
  downloadBrandRegister,
  excelBrandRegisterUrl
} from "@/api/index";
import { mydata } from "@/api/data";
export default {
  data() {
    return {
      searchWord: "",
      exportWord: "",
      alldata: [], //用来存储全部数据
      statusData: [], //筛选后数据
      showdata: [], //显示数据
      selectStatus: "",
      statusList: [],
      total: 0,
      pageSize: 4,
      current: 1
    };
  },
  methods: {
    suresearch() {
      if (this.searchWord.length == 0) this.$Message.error("输入内容不能为空");
      else {
        this.alldata = [];
        this.exportWord = this.searchWord;
        getBrandRegister({ keyword: this.searchWord }).then(res => {
          if (res.code == 1) {
            this.alldata = res.data;
            this.statusData = this.alldata;
            this.total = this.statusData.length;
            //获取状态列表
            this.alldata.forEach(i => {
              if (!this.statusList.includes(i.status))
                this.statusList.push(i.status);
            });
            this.statusList.unshift(1);
            this.getPage(1);
            this.current = 1;
            this.$Message.success(res.message);
          } else this.$Message.error(res.message);
        });
      }
    },
    getPage(index) {
      var start = (index - 1) * this.pageSize;
      var end = start + this.pageSize;
      this.showdata = this.statusData.slice(start, end);
    },
    selectStatusEvent(name) {
      var str = "";
      switch (name) {
        case 100:
          str = "已注销";
          break;
        case 101:
          str = "待审";
          break;
        case 102:
          str = "已注册";
          break;
        case 103:
          str = "已驳回";
          break;
        case 104:
          str = "已初审";
          break;
      }
      if (name == 1) this.statusData = this.alldata;
      //选择全部
      else this.statusData = this.alldata.filter(i => i.status == name);

      this.total = this.statusData.length;
      this.selectStatus = str;
      this.getPage(1);
      this.current = 1;
    },
    exportExcel() {
      var str = "";
      switch (this.selectStatus) {
        case "已注销":
          str = 100;
          break;
        case "待审":
          str = 101;
          break;
        case "已注册":
          str = 102;
          break;
        case "已驳回":
          str = 103;
          break;
        case "已初审":
          str = 104;
          break;
      }
      var c_id = "";
      if (str) {
        //按状态导出
        c_id = this.statusData.reduce((p, c) => p + `${c.id},`, "");
      } else {
        //导出全部
        c_id = this.alldata.reduce((p, c) => p + `${c.id},`, "");
      }
      window.open(
        excelBrandRegisterUrl + "?keyword=" + this.exportWord + "&c_id=" + c_id
      );
    }
  },
  mounted() {
    // console.log(excelBrandRegisterUrl);
    // this.exportWord = this.searchWord;
    // this.alldata = mydata.data;
    // this.statusData = this.alldata;
    // this.total = this.statusData.length;
    // this.showdata = mydata.data.slice(0, 4);
    // //获取状态列表
    // this.alldata.forEach(i => {
    //   if (!this.statusList.includes(i.status)) this.statusList.push(i.status);
    // });
    // this.statusList.unshift(1);
  },
  filters: {
    getTime(value) {
      if (value != 0) {
        var arr = (value + "").split("");
        arr.splice(4, 0, "-");
        arr.splice(7, 0, "-");
        return arr.join("");
      } else {
        return " ";
      }
    },
    getstatus(val) {
      switch (val) {
        case 1:
          return "全部";
          break;
        case 100:
          return "已注销";
          break;
        case 101:
          return "待审";
          break;
        case 102:
          return "已注册";
          break;
        case 103:
          return "已驳回";
          break;
        case 104:
          return "已初审";
          break;
      }
    }
  }
};
</script>
<style scoped>
.all {
  width: 100%;
  height: 100%;
}
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
.result {
  background: #fff;
  width: 90%;
  height: 75%;
  margin: 20px auto;
  padding: 10px 20px;
}
.result .list {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.result .list li {
  width: 100%;
  height: 24%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
}
.result .list li img {
  width: 15%;
  height: 80%;
  margin-right: 20px;
}
.result .list li div {
  flex: 1;
  height: 90%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.result .list li div p {
  color: #888;
  margin-bottom: 5px;
}
.result .list li div span {
  color: #444;
}
.page {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
