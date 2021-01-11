<template>
  <div class="preTable">
    <span style="vertical-align: center">结算账期</span>
    <el-date-picker
        v-model="accountTime"
        value-format="yyyy-MM"
        @change="init"
        type="month"
        style="vertical-align: center;margin-left: 10px"
        placeholder="选择日期">
    </el-date-picker>
    <div class="headerBox">
      <div>
        <div>结算账期</div>
        <div>{{ accountTime }}</div>
      </div>
      <div>
        <div>税前金额总计</div>
        <div>{{ tableData.before_tax_count }}</div>
      </div>
      <div>
        <div>问诊费总计</div>
        <div>{{ tableData.inquiry_total_money }}</div>
      </div>
      <div>
        <div>项目推荐奖励总计</div>
        <div>{{ tableData.product_recommend_money }}</div>
      </div>
      <div>
        <div>平台奖励总计</div>
        <div>{{ tableData.platform_reward_money }}</div>
      </div>
      <div>
        <div>处方管理费总计</div>
        <div>{{ tableData.pre_manage_money }}</div>
      </div>
      <div>
        <div>诊金总计</div>
        <div>{{ tableData.total_consulting_gold }}</div>
      </div>
    </div>
    <div style="border: 1px solid #c9cdd6">
      <el-table
          :header-cell-style="{background:'#F5F5F5'}"
          :data="tableData.list"
          style="width: 100%">
        <el-table-column
            prop="over_time"
            label="预结算时间"
        >
        </el-table-column>
        <el-table-column
            prop="type"
            align="center"
            label="费用类型">
        </el-table-column>
        <el-table-column
            prop="con_over_count"
            min-width="100"
            label="患者信息">
          <template slot-scope="scope">
            <span>{{scope.row.user_name}}</span>
            <span style="margin-left: 10px">{{ scope.row.sex===1?'男':'女' }}</span>
            <br/>
            <span>{{scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="用户信息">
          <template slot-scope="scope">
            <span>{{scope.row.real_name}}</span>
            <br/>
            <span>{{scope.row.user_phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="order_sn"
            align="center"
            label="问诊单号/订单编号">
        </el-table-column>
        <el-table-column
            prop="order_money"
            min-width="100"
            align="center"
            label="问诊费用/订单金额">
        </el-table-column>
        <el-table-column
            prop="trade_no"
            align="center"
            min-width="100"
            label="交易单号">
        </el-table-column>
        <el-table-column
            prop="pay_money"
            align="center"
            min-width="100"
            label="支付金额">
        </el-table-column>
        <el-table-column
            prop="pay_sa_money"
            align="center"
            min-width="100"
            label="单项收益">
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
import {pickerOptions} from "@/service/common";
import Pagination from "@/components/Pagination";

export default {
  name: "preTable",
  data() {
    return {
      pickerOptions:pickerOptions,
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[],
      accountTime:'',
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
      let data = {
        doctor_name: this.searchForm.doctor_name,
      }
      this.axios
          .post("platform/Doctorstatistics/exportDoctorActivityList", data)
          .then((res) => {
            window.open(res.data.url)
          })
    },
    init(){
      let data={
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_id:this.doctorID,
        settlement_time:this.accountTime
      }
      this.$emit('settlement_time',this.accountTime)
      this.axios
          .post("platform/Doctorstatistics/getDoctorReadySettleList", data)
          .then((res) => {
            this.tableData=res.data
            this.total = res.data.total
            this.tableData.list.forEach(item => {
              if (item.over_time) {
                item.over_time = this.dayjs(item.over_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              if(item.type){
                switch (item.type){
                  case 1:
                    item.type='问诊费用'
                    break;
                  case 2:
                    item.type='药品费用'
                    break;
                  case 3:
                    item.type='诊金'
                    break;
                  case 4:
                    item.type='平台奖励'
                    break;
                  case 5:
                    item.type='项目奖励'
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
.preTable {
  .headerBox{
    display: flex;
    height: 80px;
    margin-top: 10px;
    border: 1px solid #c9cdd6;
    margin-bottom: 10px;
    &>div{
      flex: 1;
      text-align: center;
      height: 60px;
      margin-top: 10px;
      border-left: 1px solid #c9cdd6;
      padding-top: 7px;
      &>div:nth-child(1){
        color: #606266;
        padding-bottom: 10px;
      }
      &>div:nth-child(2){
        color: #F56C6C;
      }
    }
    &>div:nth-child(1){
      border-left: none;
      padding-top: 5px;
      &>div:nth-child(1){
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      &>div:nth-child(2){
        font-weight: bold;
        color: #606266;
      }
    }
  }
}
</style>