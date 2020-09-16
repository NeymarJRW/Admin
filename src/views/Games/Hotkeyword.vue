<template>
  <div class="all">
    <div>
      <Spin v-if="!showdata" class="loading" size="large"></Spin>

      <!-- 筛选界面 -->
      <Card v-if="showdata" class="main" :bordered="false">
        <div class="words flex">
          <p>选择语言</p>

          <div class="xiala">
            <label v-for="(item,index) in radioLanuage" style="margin-right:20px">
              <input
                name="language"
                type="radio"
                v-model="language"
                :value="item.key"
                style="margin-right:5px"
              />
              {{item.name}}
            </label>
          </div>
        </div>
        <div class="fenleiduoxuan flex">
          <p>
            分类多选
            <span>*默认空为全部</span>
          </p>
          <div class="check">
            <div
              class="itembox"
              v-for="(item,index) in checklist"
              @click="select($event)"
              :style="item.arr ? showwidth[0] :  (  item.name=='男性' ||  item.name=='女性' ? showwidth[2] : showwidth[1])"
            >
              <div class="item">
                <label :for="item.name">
                  <input
                    :class="item.arr ? showclass[0] : showclass[1]"
                    type="checkbox"
                    :id="item.name"
                    :value="item.name"
                  />
                  <span style="padding-left:5px;font-weight:bold;">{{item.name}}</span>
                </label>
              </div>
              <div class="childitem">
                <label v-if="item.arr" v-for="i in item.arr" :for="i.name">
                  <input class="child" type="checkbox" :id="i.name" :value="i.name" />
                  <span style="padding-left:5px;">{{i.name}}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="fenci flex">
          <p>是否分词</p>
          <div class="switch">
            <i-switch v-model="switchbtn">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </div>
        </div>
        <div class="words flex">
          <p>挑选词语</p>
          <div class="xiala">
            <Select v-model="selectword" style="width:200px">
              <Option v-for="item in wordlist" :value="item.val" :key="item.text">{{ item.text }}</Option>
            </Select>
          </div>
        </div>
        <div class="words flex">
          <p>搜索数</p>
          <div class="xiala">
            <i-input v-model="searchnum" placeholder="请输入搜索数,默认为0" style="width: 300px"></i-input>
          </div>
        </div>
        <div class="sure flex">
          <Button style="margin-right:10px;margin-left:-10px;" @click="resetdata">重置</Button>
          <Button type="primary" @click="getdworddata">确定</Button>
        </div>
        <span class="maintip">
          分类不准确，
          <span @click="toupload">点击</span> 下载编辑提交
        </span>
      </Card>

      <Spin v-if="resultloading" class="loading" size="large"></Spin>

      <!-- 显示搜索结果 -->
      <Card v-if="showresult" class="result">
        <span class="close" @click="showresult=false">✕</span>
        <span class="copy" @click="outputword">输出结果</span>
        <span class="keytip">
          分词不准确，手动提交
          <span class="keyword" @click="postkeywordflag=true;">关键词</span>
        </span>
        <span class="resetword" @click="resetword">清空选项</span>
        <h2 class="title">搜索结果</h2>
        <!-- <p ref="content">{{resultdata}}</p> -->
        <!-- <Checkbox class="check" v-for="(item,index) in resultdata" :vla="index">{{item}}</Checkbox> -->
        <div class="itembox">
          <div class="item" v-for="(item,index) in resultdata">
            <label :for="index" @click="selectitem(index,item)">
              <input type="checkbox" :id="index" :value="index" />
              <span style="padding-left:5px;">{{item}}</span>
            </label>
          </div>
        </div>
      </Card>

      <!-- 显示筛选过后结果 -->
      <Modal v-model="outputflag" title="输出结果">
        <Button
          class="copydata"
          type="primary"
          @click="copy"
          :data-clipboard-text="this.afterresultdata.join('')"
        >复制结果</Button>

        <div class="switchspace">
          空格隔开:
          <i-switch v-model="switchspace">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </div>
        <p
          style="word-break:break-all;padding:10px"
        >{{ this.switchspace==true ? this.afterresultdata.join(' ') : this.afterresultdata.join('') }}</p>
      </Modal>

      <!-- 显示要分词不准确并选择要提交的分词 -->
      <Modal class="postresult" v-model="postkeywordflag" title="选择要提交的分词" width="600px">
        <Tag
          v-for="item in postword"
          :key="item"
          :name="item"
          closable
          @on-close="postwordClose"
        >{{ item }}</Tag>

        <Button v-if="postword.length>0" class="copydata" type="primary" @click="handlepostword">提交</Button>
        <div class="postitemmain">
          <div class="postitem" v-for="(item,index) in resultdata">
            <label :for="index+100000" @click="postitem(index,item)">
              <input type="checkbox" :id="index+100000" :value="index" />
              <span style="padding-left:5px;">{{item}}</span>
            </label>
          </div>
        </div>
      </Modal>

      <!-- 显示下载上传 -->
      <Modal v-model="upfileflag" title="下载或上传">
        <div class="upfile">
          <p style="font-size:18px;margin:15px 0;">当前语言:{{languageNamge}}</p>

          <p style="font-size:22px;">请下载或编辑之后上传</p>

          <p class="downloadfile" @click="downloadfile">
            <Icon type="md-download" />
            <span>下载</span>
          </p>
          <Upload
            multiple
            style="width:50%;text-align:center;margin:0 auto"
            type="drag"
            :before-upload="handleUpload"
            :action="actionurl"
            :on-success="UploadExcel"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击并选择你要上传的文件</p>
            </div>
          </Upload>
          <!-- <Button @click="UploadExcel" type="primary" :disabled=" file==null ? true : false ">上传文件</Button> -->
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import {
  getLanguage,
  getKeyword,
  getKeystr,
  downloadUrl,
  uploadUrl,
  upLoad,
  postKeyWordUrl,
  getDownUrl
} from "@/api/index";
import { strdata } from "@/api/data";
export default {
  data() {
    return {
      radioLanuage: [],
      searchnum: "",
      language: "cn",
      languageNamge: "中文",
      showclass: ["parent", "normal"],
      showwidth: ["width:100%", "width:30%", "width:50%"],
      switchspace: false,
      upfileflag: false,
      outputflag: false,
      postkeywordflag: false,
      resultloading: false,
      resultloading_a: false,
      showresult: false,
      showdata: true,
      allword: "",
      switchbtn: true,
      resultdata: [],
      afterresultdata: [],
      checkselect: [],
      checkselectchild: [],
      checklist: [],
      selectword: 0,
      delword: [],
      postword: [],
      downloadurl: "",
      actionurl: "",
      file: null,
      wordlist: [
        {
          text: "全部",
          val: 0
        },
        {
          text: "中文+英文",
          val: 1
        },
        {
          text: "中文",
          val: 2
        },
        {
          text: "英文",
          val: 3
        }
      ]
    };
  },
  watch: {
    language(val) {
      this.checklist = [];
      localStorage.setItem("language", val);
      this.getdata();
      this.languageNamge = this.radioLanuage.filter(
        item => item.key == val
      )[0].name;
    },

    resultdata() {
      this.$nextTick(function() {
        if (this.resultloading_a) {
          this.resultloading = false;
          this.showresult = true;
        }
      });
    },
    postkeywordflag(val) {
      if (val == false) {
        this.getdworddata();
        this.postword = [];
        var item = document.querySelectorAll(".postitem");
        item.forEach(item => {
          item.querySelector("input").checked = false;
        });
      }
    },
    upfileflag(val) {
      if (val == false) {
        this.checklist = [];
        this.getdata();
        this.showresult = false;
      }
    }
  },
  methods: {
    toupload() {
      this.file = null;
      getDownUrl().then(res => {
        if (res.code == 1) {
          this.downloadurl = res.msg;
          this.upfileflag = true;
        }
      });
    },
    UploadExcel(res, file) {
      // console.log(res);
      if (res.code == 0) {
        this.$Message.error(res.msg);
      } else {
        this.$Message.success(res.msg);
      }
      // var formdata = new FormData();
      // formdata.append("file", this.file);
      // const option = {
      //   method: "post",
      //   body: formdata
      // };
      // fetch(this.actionurl, option)
      //   .then(res => res.json())
      //   .then(resJson => {
      //     // console.log(resJson)
      //     if (resJson.code == 0) {
      //       this.$Message.error(resJson.msg);
      //     } else {
      //       this.$Message.success(resJson.msg);
      //     }
      //     this.file = null;
      //   });
      // this.getdata();
    },
    handleUpload(file) {
      this.file = file;
    },
    downloadfile() {
      // console.log()
      window.open(downloadUrl + this.downloadurl);
    },
    resetword() {
      this.delword = [];
      var items = document.querySelector(".result").querySelectorAll(".item");
      items.forEach(item => {
        item.querySelector("input").checked = false;
        item.querySelector("span").className = "";
      });
    },
    selectitem(index, name) {
      console.log(index);
      var item = document.querySelector(".result").querySelectorAll(".item");
      var input = item[index].querySelector("input");
      if (input.checked) {
        item[index].querySelector("span").className = "active";
        if (this.delword.indexOf(name) == -1) {
          this.delword.push(name);
        }
      } else {
        item[index].querySelector("span").className = "";
        if (this.delword.indexOf(name) > -1) {
          this.delword = this.delword.filter(item => item != name);
        }
      }
    },
    outputword() {
      this.afterresultdata = this.resultdata.filter(
        item => this.delword.indexOf(item) == -1
      );
      this.outputflag = true;
    },
    getdata() {
      this.checklist = [];
      this.actionurl = uploadUrl;
      getKeyword().then(res => {
        if (res.code == 1) {
          var data = res.msg;
          for (var key in data) {
            this.checklist.push(data[key]);
          }
          // console.log(this.checklist[2])
          this.showdata = true;
        }
      });
    },
    getdworddata() {
      // localStorage.setItem('language', this.language ? 'cn' : 'us' )
      // this.resultdata = strdata.msg;
      this.resultloading = true;
      this.showresult = false;
      //   this.resultloading_a=true;
      // this.showresult = true;
      // console.log('222'.length)
      if (this.searchnum.length != 0) {
        if (!/^(-)?\d+(\.\d+)?$/.test(this.searchnum)) {
          this.$Message.error("搜索数输入类型错误");
          return;
        }
        if (this.searchnum.toString().indexOf(".") > -1) {
          // console.log(this.searchnum.toString().split('.'));
          this.searchnum = parseFloat(this.searchnum.toString().split(".")[0]);
        }
      }

      // console.log(this.searchnum);
      var postdata = {
        category: "",
        jieba: this.switchbtn == true ? 1 : 0,
        pick: this.selectword,
        search_num: this.searchnum || 0
      };
      if (this.checkselect.length > 0) {
        postdata.category = this.checkselect.join(",");
      } else {
        var checkBtn = document
          .querySelector(".check")
          .querySelectorAll(".itembox");
        var newarr = [];
        checkBtn.forEach(item => {
          item.querySelectorAll("input").forEach(i => {
            if (newarr.indexOf(i.value) == -1) {
              newarr.push(i.value);
            }
          });
        });
        // console.log(newarr)
        postdata.category = newarr.join(",");
      }
      getKeystr(postdata).then(res => {
        if (res.code == 1) {
          this.resultloading_a = true;
          this.resultdata = res.msg;
          // this.showresult = true;
        } else {
          this.resultloading = false;
          this.showresult = false;
          this.$Message.error(res.msg);
        }
      });
    },
    resetdata() {
      this.resultloading = false;
      var checkBtn = document
        .querySelector(".check")
        .querySelectorAll(".itembox");
      checkBtn.forEach(item => {
        item.querySelectorAll("input").forEach(i => {
          i.checked = false;
        });
      });
      this.checkselect = [];
      this.switchbtn = true;
      this.selectword = 0;
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
    postitem(index, name) {
      var items = document.querySelectorAll(".postitem");
      var input = items[index].querySelector("input");
      if (input.checked) {
        items[index].querySelector("span").className = "active";
        this.postword.push(name);
      } else {
        items[index].querySelector("span").className = "";
        if (this.postword.indexOf(name) > -1) {
          this.postword = this.postword.filter(item => item != name);
        }
      }
    },
    postwordClose(event, name) {
      var item = document.querySelectorAll(".postitem");
      item.forEach(item => {
        if (item.querySelector("span").innerHTML == name) {
          item.querySelector("input").checked = false;
        }
      });
      const index = this.postword.indexOf(name);
      this.postword.splice(index, 1);
    },
    handlepostword() {
      var formdata = new FormData();
      for (let i = 0; i < this.postword.length; i++) {
        formdata.append(`word${i + 1}`, this.postword[i]);
      }
      const option = {
        method: "post",
        body: formdata
      };
      fetch(postKeyWordUrl, option)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.code == 0) {
            this.$Message.error(resJson.msg);
          } else {
            this.$Message.success(resJson.msg);
            this.postword = [];
            var item = document.querySelectorAll(".postitem");
            item.forEach(item => {
              item.querySelector("input").checked = false;
            });
          }
        });
    },
    select(e) {
      if (e.target.className == "parent") {
        //点击全选按钮
        var parBtn = e.target;
        var childlist = parBtn.parentNode.parentNode.parentNode.children[1].querySelectorAll(
          "input"
        );
        var childarr = [];
        childlist.forEach(item => {
          childarr.push(item.value);
        });
        if (parBtn.checked) {
          //选中
          childlist.forEach(item => {
            item.checked = true;
          });
          childarr.forEach(item => {
            if (this.checkselect.indexOf(item) == -1) {
              this.checkselect.push(item);
            }
          });
        } else {
          //未选中
          this.checkselect = this.checkselect.filter(
            item => childarr.indexOf(item) == -1
          );
          childlist.forEach(item => {
            item.checked = false;
          });
        }
      } else if (e.target.className == "child") {
        // 单选按钮
        var danBtn = e.target;
        var danBtnarr = e.target.parentNode.parentNode.querySelectorAll(
          "input"
        );
        var danBtnlen = danBtnarr.length;
        var parnentBtn = e.target.parentNode.parentNode.parentNode.children[0].querySelector(
          "input"
        );
        // console.log(danBtnarr)
        if (danBtn.checked) {
          //选中
          if (this.checkselect.indexOf(danBtn.value) == -1) {
            this.checkselect.push(danBtn.value);
          }
          var num = 0;
          danBtnarr.forEach(item => {
            if (item.checked) num++;
          });
          if (num == danBtnlen) {
            parnentBtn.checked = true;
          }
        } else {
          // 未选中
          if (this.checkselect.indexOf(danBtn.value) > -1) {
            this.checkselect = this.checkselect.filter(
              item => item != danBtn.value
            );
          }
          var num = 0;
          danBtnarr.forEach(item => {
            if (item.checked) num++;
          });
          if (num < danBtnlen) {
            parnentBtn.checked = false;
          }
        }
      } else {
        var normalBtn = e.target;
        if (normalBtn.checked) {
          if (this.checkselect.indexOf(normalBtn.value) == -1) {
            this.checkselect.push(normalBtn.value);
          }
        } else {
          this.checkselect = this.checkselect.filter(
            item => item != normalBtn.value
          );
        }
      }
      // console.log(this.checkselect);
    }
  },
  mounted() {
    localStorage.setItem("language", "cn");
    this.getdata();
    // console.log(this.radioLanuage)

    getLanguage().then(res => {
      if (res.code == 1) {
        // this.radioLanuage = res.msg;
        for (var index in res.msg) {
          this.radioLanuage.push(res.msg[index]);
        }
      }
    });

    // let arr=[1,2,3,4];
  }
};
</script>
<style scoped>
.upfile {
  width: 50%;
  text-align: center;
  margin: 2% auto;
}
.downloadfile {
  width: 50%;
  cursor: pointer;
  /* background: blue; */
  margin: 6% auto;
  font-size: 25px;
  border-radius: 10px;
  border: 1px solid #333;
}
.downloadfile span {
  cursor: pointer;
  font-size: 18px;
}

.loading {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.main {
  width: 90%;
  /* height: 100%; */
  /* background: #ccc; */
  margin: 1% auto;
  display: flex;
  justify-content: center;
  position: relative;
}
.main .maintip {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.main .maintip span {
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
.main p {
  font-weight: bold;
}
.main .flex {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.main .fenleiduoxuan p {
  text-align: center;
  flex: 1;
}
.main .fenleiduoxuan p span {
  display: block;
  font-size: 8px;
  color: red;
  transform: scale(0.9);
  font-weight: 400;
}
.main .fenleiduoxuan .check {
  flex: 3;
  display: flex;
  flex-wrap: wrap;
}
.main .fenleiduoxuan .check .itembox {
  margin-bottom: 10px;
}

.main .fenleiduoxuan .check .itembox .childitem {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: 3%;
}

.main .fenleiduoxuan .check .itembox .childitem label {
  /* margin-left: 20px; */
  font-size: 12px;
  width: 20%;
}

.main .fenleiduoxuan .check .itembox .childitem label input {
  width: 10px;
  height: 10px;
}

.main .fenci p {
  text-align: center;
  flex: 1;
}
.main .fenci .switch {
  flex: 3;
}
.main .words p {
  text-align: center;
  flex: 1;
}
.main .words .xiala {
  flex: 3;
}
.main .sure {
  margin-top: 40px;
}
.result {
  width: 90%;
  margin: 0 auto;
  position: relative;
  word-break: break-all;
}
.result h2 {
  text-align: center;
  padding-bottom: 10px;
  margin-top: 0.533333rem /* 20/37.5 */;
}
.result p {
  padding: 0 20px;
}
.result .close {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: 10px;
  top: 3px;
}
.result .close:hover {
  color: #000;
}
.result .copy {
  color: red;
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 6px;
  text-decoration: underline;
}
.result .keytip {
  /* cursor: pointer; */
  position: absolute;
  right: 120px;
  top: 6px;
}
.result .resetword {
  position: absolute;
  top: 6px;
  right: 320px;
  cursor: pointer;
  text-decoration: underline;
  color: red;
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
  width: 16.6%;
  text-align: left;
  margin-bottom: 10px;
}
.item .active {
  text-decoration: line-through;
}
.keyword {
  /* float: left; */
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
.switchspace {
  display: inline-block;
  margin-left: 50px;
}
.postitemmain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 30px;
  margin-top: 20px;
}
.postitemmain .postitem {
  width: 25%;
}
@media screen and (max-width: 1600px) {
  .result .itembox .item {
    width: 16.6%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1400px) {
  .result .itembox .item {
    width: 20%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1200px) {
  .result .itembox .item {
    width: 25%;
    text-align: left;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1000px) {
  .result .itembox .item {
    width: 33.3%;
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




