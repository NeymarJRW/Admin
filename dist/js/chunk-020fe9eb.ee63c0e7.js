(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-020fe9eb"],{"225e":function(a,e,t){},"7b7f":function(a,e,t){"use strict";var n=t("225e"),i=t.n(n);i.a},a852:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"key"},[t("div",{staticClass:"words"},[t("p",[a._v("选择语言:")]),t("div",{staticClass:"xiala"},[t("label",{staticStyle:{"margin-right":"15px"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.language,expression:"language"}],staticStyle:{"margin-right":"5px"},attrs:{name:"language",type:"radio"},domProps:{value:!0,checked:a._q(a.language,!0)},on:{change:function(e){a.language=!0}}}),a._v("泰国")]),t("label",{staticStyle:{"margin-right":"15px"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.language,expression:"language"}],staticStyle:{"margin-right":"5px"},attrs:{name:"language",type:"radio"},domProps:{value:!1,checked:a._q(a.language,!1)},on:{change:function(e){a.language=!1}}}),a._v("越南")])])]),t("Table",{attrs:{loading:a.loading,data:a.showdata,columns:a.columns1}}),a.loading?a._e():t("div",{staticClass:"page"},[t("Page",{attrs:{current:a.pageindex,total:a.total,"page-size":a.pageSize,"show-elevator":""},on:{"update:current":function(e){a.pageindex=e},"on-change":a.changePage}})],1),t("Modal",{attrs:{width:"800",title:"AppID"},model:{value:a.showApp,callback:function(e){a.showApp=e},expression:"showApp"}},[t("p",{staticClass:"app"},[a._v(a._s(a.AppId))])])],1)},i=[],l=t("365c"),o={data:function(){var a=this;return{language:!0,loading:!0,showApp:!1,pageindex:1,AppId:"",total:0,pageSize:10,columns1:[{title:"关键词",key:"word"},{title:"优先度",key:"priority"},{title:"app数量",key:"searchcount"},{title:"设备类型",key:"type"},{title:"时间",key:"time"},{title:"类型名称",key:"genreName"},{title:"操作",key:"action",width:150,align:"center",render:function(e,t){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){a.AppId="",a.showApp=!0,a.AppId=t.row.searchapp}}},"详情")])}}],showdata:[]}},mounted:function(){this.language=!0,this.getData(1)},watch:{language:function(a){this.language=a,this.getData(1)}},methods:{getData:function(a){var e=this;this.loading=!0,Object(l["s"])({page:a,language:this.language?"tl":"vn"}).then(function(t){1==t.code&&(e.showdata=t.msg.data,e.total=t.msg.pageCount*e.pageSize,e.pageindex=a,e.loading=!1)})},changePage:function(a){this.getData(a)}}},s=o,g=(t("7b7f"),t("2877")),p=Object(g["a"])(s,n,i,!1,null,null,null);p.options.__file="KeywordApp.vue";e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-020fe9eb.ee63c0e7.js.map