<template>
  <div class="home_aside" :style="!isCollapse?{width: 180+'px',}:''">
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#415348"
        text-color="#c1c1c1"
        active-text-color="#99e880"
        router
        :collapse="isCollapse"
        :unique-opened="true"
        @select="selectIndex"
        style="border-right: 1px #415348 solid"
        :default-active="$route.path"
    >
      <el-menu-item index="/home/workbench">
        <i class="el-icon-s-home"></i>
        <span style="margin-left:10px">首页</span>
      </el-menu-item>
      <el-submenu :index="menu1.index" v-for="(menu1,index) in menuList" :key="index">
        <template slot="title">
<!--          <img :src="menu1.icon" alt style="width:16px"/>-->
          <i :class="menu1.icon"></i>
          <span style="margin-left:10px">{{ menu1.module_name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              v-for="(menu2,ind) in menu1.list"
              :key="ind"
              :index="menu2.path"
          >{{ menu2.module_name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import guideList from "../service/guide.js";

export default {
  data() {
    return {
      menuList: [],
      nav1: require("@/assets/nav0.svg"),
    };
  },
  props: ['isCollapse'],
  watch : {
    'isCollapse':function (val){
      console.log(val)
    }
  },
  created() {
    this.getList();
  },
  methods: {
    selectIndex(e) {
      this.$emit('selectIndex', e)
    },
    getList() {
      this.menuList = guideList;
      // let admin_id = this.$store.state.userInfo.userInfo.admin_id;
      // this.menuList = guide.guideList;
      // return;
      // if (admin_id == 1) {
      //   this.menuList = guide.guideList;
      // } else {
      //   let demoList = [];
      //   let list = _.cloneDeep(guide.guideList);
      //   let arr = [];
      //   arr = this.$store.state.userInfo.userInfo.module_id_array;
      //   list.map(item => {
      //     if (arr.includes(item.module_id + "")) {
      //       let obj = {
      //         module_id: item.module_id,
      //         module_name: item.module_name,
      //         icon: item.icon,
      //         index: item.index,
      //         list: [],
      //         path: item.path
      //       };
      //       item.list.map((j, ind) => {
      //         if (arr.includes(j.module_id + "")) {
      //           obj.list.push(j);
      //         }
      //       });
      //       demoList.push(obj);
      //     }
      //   });
      //   this.menuList = demoList;
      //}
    }
  },

};
</script>
<style lang="scss" scoped>
.home_aside {
  transition: 1.5s;
  height: calc(100vh - 60px);
  overflow: scroll;
  background: #415348;

  .el-menu-item.is-active {
    background: rgb(52, 66, 58) !important;
  }
}

// 隐藏滚动条
.home_aside::-webkit-scrollbar {
  display: none;
}
.el-menu-item.is-active {
  background-color: rgb(52, 66, 58) !important;
}
</style>
<style>
.el-menu-item-group__title{
  padding: 0;
}
</style>