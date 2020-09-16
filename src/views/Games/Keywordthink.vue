<template>
  <div class="all">
    <div class="main">
      <p>输入关键词</p>
      <i-input size="large" style="width: 400px;display:none"></i-input>
      <i-input
        v-model="word"
        size="large"
        placeholder="请输入关键词..."
        style="width: 50%"
        @keyup.enter.native="suresearch"
      >
        <i-button slot="append" icon="ios-search" @click="suresearch"></i-button>
      </i-input>
      <div class="switch" style="width:50%;margin-top:20px">
        <span style="font-size:12px">删除重复词</span>

        <i-switch v-model="switchbtn" style="margin-left:10px">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </div>
    </div>
    <Spin v-if="loading" class="loading" size="large"></Spin>

    <div class="result" v-if="showresult">
      <p>搜索结果</p>
      <div class="download">
        <Button type="primary" @click="download">下载</Button>
      </div>
      <tree
        :data="treedata"
        :marginY="marginY"
        :duration="duration"
        node-text="name"
        layoutType="horizontal"
        linkLayout="bezier"
        type="tree"
        @clickedText="onClick"
      ></tree>

      <div class="sure">
        <Button type="primary" @click="postdata">提交</Button>
      </div>
    </div>
    <!-- 显示筛选过后结果 -->
    <Modal v-model="outputflag" :title="tip">
      <Spin v-if="postedloading" class="postloading" size="large"></Spin>
      <div v-if="!postedloading">
        <Button class="copydata" type="primary" @click="copy" :data-clipboard-text="posteddata">复制结果</Button>
        <p style="padding:10px">{{ posteddata}}</p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { strdata } from "@/api/data";
import { tree } from "vued3tree";
import {
  getThinkword,
  postThinkword,
  downloadThinkword,
  downloadUrl
} from "@/api/index";
export default {
  components: {
    tree
  },
  data() {
    return {
      marginY: 0,
      duration: 0,
      treedata: {},
      word: "",
      loadword: "",
      loading: false,
      postedloading: true,
      showresult: false,
      outputflag: false,
      switchspace: false,
      switchbtn: true,
      tip: "正在提交",
      afterresultdata: [],
      posteddata: "",
      delword: [],
      resultdata: []
    };
  },
  mounted() {
    // var that=this;
    // var treearr=[];
    // function gettreedata(arr,newarr){
    //   arr.map((val)=>{
    //     that.resultdata.push(
    //       {
    //         name:val.word,
    //         index:val.heat
    //       })
    //     if(val.childNodes){
    //       newarr.push({
    //         name:`${val.word}(${val.heat})`,
    //         children:gettreedata(val.childNodes,[])
    //       })
    //     }else{
    //       newarr.push({
    //         name:`${val.word}(${val.heat})`,
    //       })
    //     }
    // })
    //   return newarr;
    // }
    // gettreedata(strdata,treearr);
    // // console.log(this.resultdata)
    // function sortarr(arr){
    //   var max;
    //   for(var i=0;i<arr.length;i++){
    //      for(var j=i;j<arr.length;j++){
    //        if(parseInt(arr[i].index) < parseInt(arr[j].index) ){
    //          max=arr[j];
    //          arr[j]=arr[i];
    //         arr[i]=max;           }
    //      }
    //   }
    // }
    // sortarr(this.resultdata);
    // this.resultdata=this.resultdata.map(val=>val.name)
    // this.treedata={
    //   name:treearr[0].name,
    //   children:treearr[0].children
    // }
  },
  methods: {
    onClick(evt) {
      var el = evt.target;
      var str = el.innerHTML.split("");
      str.splice(str.indexOf("("));
      if (this.delword.indexOf(str.join("")) > -1) {
        el.style.textDecoration = "none";
        this.delword = this.delword.filter(val => val != str.join(""));
      } else {
        el.style.textDecoration = "line-through";
        this.delword.push(str.join(""));
      }
    },
    suresearch() {
      this.loadword = this.word;
      this.resultdata = [];
      this.delword = [];
      this.treedata = {};
      this.posteddata = "";
      this.afterresultdata = [];
      this.loading = false;
      this.showresult = false;
      var that = this;
      if (this.word.length > 0) {
        this.loading = true;
        getThinkword({
          keyword: this.word,
          choose: this.switchbtn ? 0 : 1
        }).then(res => {
          if (res.code == 1) {
            // this.resultdata=res.msg;
            var treearr = [];
            function gettreedata(arr, newarr) {
              arr.map(val => {
                that.resultdata.push({
                  name: val.word,
                  index: val.heat
                });
                if (val.childNodes) {
                  newarr.push({
                    name: `${val.word}(${val.heat})`,
                    children: gettreedata(val.childNodes, [])
                  });
                } else {
                  newarr.push({
                    name: `${val.word}(${val.heat})`
                  });
                }
              });
              return newarr;
            }
            gettreedata(res.msg, treearr);

            this.treedata = {
              name: treearr[0].name,
              children: treearr[0].children
            };

            function sortarr(arr) {
              var max;
              for (var i = 0; i < arr.length; i++) {
                for (var j = i; j < arr.length; j++) {
                  if (parseInt(arr[i].index) < parseInt(arr[j].index)) {
                    [arr[j], arr[i]] = [arr[i], arr[j]];
                  }
                }
              }
            }
            sortarr(this.resultdata);
            this.resultdata = this.resultdata.map(val => val.name);
            this.showresult = true;
            this.loading = false;
          } else {
            this.loading = false;
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.$Message.error("输入为空");
      }
    },
    //  selectitem(index, name) {
    //   //  console.log(name)
    //   var item = document.querySelector(".result").querySelectorAll(".item");
    //   var input = item[index].querySelector("input");
    //   if (input.checked) {
    //     item[index].querySelector("span").className = "active";
    //     if (this.delword.indexOf(name) == -1) {
    //       this.delword.push(name);
    //     }
    //   } else {
    //     item[index].querySelector("span").className = "";
    //     if (this.delword.indexOf(name) > -1) {
    //       this.delword = this.delword.filter(item => item != name);
    //     }
    //   }
    // console.log(this.delword)
    // },
    postdata() {
      this.afterresultdata = [];
      this.resultdata.map(item => {
        if (this.delword.indexOf(item) == -1) {
          this.afterresultdata.push(item);
        }
      });
      this.tip = "正在提交";
      this.outputflag = true;
      this.postedloading = true;
      postThinkword({
        keyword: this.word,
        word: this.afterresultdata.join(""),
        choose: this.switchbtn ? 0 : 1
      }).then(res => {
        this.tip = "提交结果";
        this.postedloading = false;
        this.posteddata = res.msg;
      });
    },
    copy() {
      var clipboard = new Clipboard(".copydata");
      clipboard.on("success", e => {
        this.$Message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$Message.error("该浏览器不支持复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    download() {
      downloadThinkword({ keyword: this.loadword }).then(res => {
        if (res.code == 1) {
          window.open(downloadUrl + res.msg);
          this.$Message.success("开始下载");
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
  padding: 10px 0 0 0;
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
  margin-bottom: 20px;
}
.main p:nth-child(1) {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
}
.result {
  width: 90%;
  height: 130%;
  margin: 0 auto;
  background: #fff;
  padding: 30px;

  box-sizing: border-box;
}

.result .sure {
  /* width: 50%; */
  /* background: pink; */
  margin: 0 auto;
  text-align: center;
}
.loading {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.postloading {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.download {
  display: flex;
  justify-content: flex-end;
}
.result > p {
  text-align: center;
  padding: 15px;
  font-size: 20px;
}
.result > span {
  float: right;
  font-size: 15px;
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
.result .itembox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;
}
.result .itembox .item {
  width: 20%;
  text-align: left;
  margin-bottom: 10px;
  /* background: red; */
}
.item .active {
  text-decoration: line-through;
}
.copydata {
  margin-bottom: 10px;
}
.treeclass {
  height: 90%;
}
@media screen and (max-width: 1600px) {
  .result .itembox .item {
    width: 25%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1400px) {
  .result .itembox .item {
    width: 33%;
    text-align: left;
    margin-bottom: 10px;
  }
  /* .result .itembox .item:nth-child(2n){
    background: #ccc;

  } */
}
@media screen and (max-width: 1200px) {
  .result .itembox .item {
    width: 50%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1000px) {
  .result .itembox .item {
    width: 50%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 800px) {
  .result .itembox .item {
    width: 50%;
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>

