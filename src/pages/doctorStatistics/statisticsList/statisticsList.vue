<template>
  <div class="statisticsList">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活跃度" name="first">
        <liveness></liveness>
      </el-tab-pane>
      <el-tab-pane label="问诊开方" name="second">
        <inquiry></inquiry>
      </el-tab-pane>
      <el-tab-pane label="收入提现" name="third">
        <withdrawal></withdrawal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import liveness from './components/liveness'
import inquiry from './components/inquiry'
import withdrawal from './components/withdrawal'
export default {
  name: "statisticsList",
  data(){
    return{
      activeName: 'first',
    }
  },
  components:{
    //someComponent
    liveness,
    inquiry,
    withdrawal
  },
  methods: {
    //
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  mounted() {
    //
  }
}
</script>

<style lang="scss" scoped>
.statisticsList{
 
}
</style>