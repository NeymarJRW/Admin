<template>
  <div class="content">
    <Menu
      theme="dark"
      accordion
      class="menu"
      @on-select="route"
      :open-names="['1']"
      :active-name="activeName"
      v-if="isPc"
    >
      <Submenu name="1">
        <template slot="title">
          <i class="fas fa-tasks"></i>
          管理区
        </template>
        <MenuItem v-for="item in tasks" :name="item.path" :key="item.title">
          <i :class="item.icon"></i>
          {{item.title}}
        </MenuItem>
      </Submenu>
    </Menu>
    <main ref="main" style="background:#f0f2f5;">
      <router-view />
    </main>
  </div>
</template>

<script>
import { checkLogin } from "@/api/index";
export default {
  components: {},
  data() {
    return {
      activeName: "/examination",
      tasks: [
        {
          title: "提审游戏管理",
          icon: "fas fa-chalkboard-teacher",
          path: "/examination"
        },
        {
          title: "游戏横竖屏管理",
          icon: "fas fa-tablet-alt",
          path: "/direction"
        },
        {
          title: "技术支持网站管理",
          icon: "fas fa-question",
          path: "/support"
        },
        {
          title: "热门关键词",
          icon: "fas fa-fire",
          path: "/hotkeyword"
        },
        {
          title: "关键词联想",
          icon: "fas fa-server",
          path: "/keywordthink"
        },
        {
          title: "清榜统计",
          icon: "fas fa-th-list",
          path: "/clearlist"
        },
        {
          title: "微信联想词",
          icon: "fas fa-th-list",
          path: "/WechatThink"
        },
        {
          title: "微信小程序搜索",
          icon: "fas fa-th-list",
          path: "/WechatSearch"
        },
        {
          title: "商标注册检索",
          icon: "fas fa-th-list",
          path: "/BrandRegister"
        }
        //  {
        //   title: "关键词榜单",
        //   icon: 'fas fa-list-alt ',
        //   path: '/KeywordApp'
        // },
      ],
      isPc: true
    };
  },
  mounted() {
    checkLogin().then(res => {
      if (res.code === -1) {
        this.$router.push({ path: "/login" });
      } else {
        if (res.msg == "adtester") {
          this.activeName = "/hotkeyword";
          this.tasks = [
            {
              title: "热门关键词",
              icon: "fas fa-fire",
              path: "/hotkeyword"
            },
            {
              title: "关键词联想",
              icon: "fas fa-server",
              path: "/keywordthink"
            },
            {
              title: "清榜统计",
              icon: "fas fa-th-list",
              path: "/clearlist"
            }
          ];
          this.$router.push({ path: "/hotkeyword" });
        } else {
          this.$router.push({ path: "/examination" });
        }
      }
    });
    // this.$router.push({ path: "/BrandRegister" });
  },
  methods: {
    route(i) {
      this.$router.push({ path: i });
    }
  }
};
</script>
