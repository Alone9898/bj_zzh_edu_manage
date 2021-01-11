<template>
  <div class="accountTable">
    <div style="border: 1px solid #c9cdd6">
      <el-table
          :header-cell-style="{background:'#F5F5F5'}"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="create_time"
            label="业务时间">
        </el-table-column>
        <el-table-column
            prop="type"
            align="center"
            label="业务类型">
        </el-table-column>
        <el-table-column
            prop="account"
            min-width="100"
            align="center"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="money"
            align="center"
            label="金额">
        </el-table-column>
        <el-table-column
            prop="balance_money"
            align="center"
            label="账户余额">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="margin-top: 20px">
      <Pagination :total='total' :currentPage='currPage' :pageSize='pageSize' @handleSizeChange='handleSizeChange'
                  @handleCurrentChange='handleCurrentChange'></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "accountTable",
  data() {
    return {
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[]
    }
  },
  props: {
    doctorID: ''
  },
  components: {
    //someComponent
    Pagination
  },
  methods: {
    //
    // ----------分页控制-------------
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.currPage = val
      this.init()
    },
    derive() { // 导出
      this.axios
          .post("platform/Doctorstatistics/exportDoctorActivityList",  {doctor_id:this.doctorID})
          .then((res) => {
            window.open(res.data.url)
          })
    },
    init(){
      let data={
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_id:this.doctorID,
      }
      this.axios
          .post("platform/Doctorstatistics/getDoctorAccountList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.total = res.data.total
            this.tableData.forEach(item => {
              if (item.create_time) {
                item.create_time = this.dayjs(item.create_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              if(item.type){
                switch (item.type){
                  case 1:
                    item.type='结算入账'
                    break;
                  case 2:
                    item.type='银行卡提现'
                    break;
                  case 3:
                    item.type='微信提现'
                    break;
                }
              }
            })
          })
    }
  },
  mounted() {
    //
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.accountTable {

}
</style>