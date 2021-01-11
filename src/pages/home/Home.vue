<template>
  <div>
    <div class="home_header">
      <Header @switchover="switchover"/>
    </div>
    <div class="home_container">
      <Sidenav :isCollapse="isCollapse" @selectIndex="selectIndex" />
      <div class="home_main">
        <el-tabs class="home_mainTop" type="border-card" closable @tab-click='tabClick' @tab-remove='tabRemove' v-model="currentTab">
          <el-tab-pane lazy v-for="cur in tabList" :key='cur.name' :label="cur.label" :name='cur.name'></el-tab-pane>
            <router-view/>
        </el-tabs>
        <p style="color:#ccc;margin:10px auto;text-align: center">歧黄数据统计中心</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
export default { 
  data(){
    return{
      currentTab:'',
      tabList:[
        {label:'主页',name:'/home/workbench'}
      ],
      isCollapse:true
    }
  },
  components: {
    Header,
    Sidenav
  },
  created() {
    this.currentTab = this.$route.path
    if (!window.sessionStorage.getItem('tags')) {
      window.sessionStorage.setItem('tags',JSON.stringify([{label:'主页',name:'/home/workbench'}]))
    } else {
      // @ts-ignore
      this.tabList = JSON.parse(window.sessionStorage.getItem('tags'))
    }
  },
  methods:{
    switchover(i){
      this.isCollapse=i
    },
    selectIndex(e){
      let obj={
        name: '',
        label: '',
      }
      if(e==='/home/workbench'){
        obj.name=e
        obj.label='主页'
      }else if(e==='/DoctorStatistics/informationList') {
        obj.name=e
        obj.label='医生信息列表'
      } else if(e==='/DoctorStatistics/statisticsList') {
        obj.name=e
        obj.label='活动统计列表'
      }else if(e==='/recipeStatistics/recipeList') {
        obj.name=e
        obj.label='处方统计列表'
      }else if(e==='/ordersStatistics/ordersList') {
        obj.name=e
        obj.label='订单统计列表'
      }else if(e==='/costStatistics/constList') {
        obj.name=e
        obj.label='费用统计列表'
      }
      if (this.tabList.every(cur=>cur.label !== obj.label)) {
        this.tabList.push(obj)
      }
      this.currentTab = obj.name
      window.sessionStorage.setItem('tags',JSON.stringify(this.tabList))
    },
    tabClick(e){
      window.location.hash = e.name
      console.log(window.location.hash)
    },
    tabRemove(name){
      let tablist = this.tabList
      let activeName = this.currentTab
      if (tablist.length >= 2){
        if (activeName === name ){
          tablist.forEach((tab,index) => {
            if (tab.name === name) {
              let nextTab = tablist[index + 1] || tablist[index-1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.currentTab = activeName
        window.location.hash = this.currentTab
        this.tabList = tablist.filter(cur => cur.name !== name)
        window.sessionStorage.setItem('tags',JSON.stringify(this.tabList))
      }
    }
  }
};
</script>
<style lang="scss">
.el-tabs--border-card > .el-tabs__header{

}
.home_mainTop .el-tabs__header {
  position: sticky;
  z-index: 9;
  top: 0;
}
</style>
<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  margin-top: 50px;
}
.home_container {
  flex-grow: 1;
  background: #f2f4f8;
  display: flex;
  .home_main {
    width: 100%;
    flex-grow: 1;
    height: calc(100vh - 60px);
    overflow: scroll;

    .el-tabs {
      margin: 6px 10px;
      // .el-tab-pane{
      //   min-height: 800px;
      // }
    }
  }
  // 隐藏滚动条
  .home_main::-webkit-scrollbar {
    display: none;
  }
}
 .home_header{
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #E4E7ED;
}
</style>
