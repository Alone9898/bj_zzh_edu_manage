<template>
  <div class="Pagination-wrap">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next ,jumper"
        :total="total">
      </el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props:{
    total:'',
    currentPage:'',
    pageSize:'',
  },
  data(){
    return{
      msg:""
    }
  },
  component:{
    //someComponent
  },
  methods: {
    handleSizeChange(val) {  //切换每页多少条
      this.$emit('handleSizeChange',val)
    },
    handleCurrentChange(val) {  //切换当前页码
      this.$emit('handleCurrentChange',val)
    }
  },
  mounted() {
    //
  }
}
</script>
<style lang="scss" scoped>
.Pagination-wrap{
    height:100%;
    display: flex;
    justify-content: center;
}
</style>

