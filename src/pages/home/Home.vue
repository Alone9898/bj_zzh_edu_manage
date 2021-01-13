<template>
    <el-container>
      <el-aside width="180px">
        <Sidenav/>
      </el-aside>
      <el-container>
        <el-header style="padding: 0;height: 56px">
          <Header></Header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
export default { 
  data(){
    return{
    }
  },
  components: {
    Header,
    Sidenav
  },
  created() {},
  methods:{
  }
};
</script>
<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  .el-header{
    padding: 0 20px;
    background: white;
  }
}
</style>
