<template>
  <div class="withdrawalTep">
    医生账户详情
    <el-button @click="getBack" style="float: right"><i class="el-icon-back el-icon--left"></i>返回</el-button>
    <div style="display: flex;margin-top: 20px">
      <div style="display: flex">
        <el-avatar shape="square" :size="100" fit="fill"
                   :src="doctor_infoList.head_img"></el-avatar>
        <div class="doctorMsg">
          <div>
            <span>{{ doctor_infoList.doctor_name }}</span>
            <span>{{ doctor_infoList.department_name }}</span>
            <span>{{ doctor_infoList.title }}</span>
          </div>
          <div>
            {{ doctor_infoList.hospital }}
          </div>
          <div style="padding-bottom: 0">
            {{ doctor_infoList.province_name +doctor_infoList.city_name+doctor_infoList.district_name}}
          </div>
      </div>
      <div class="rightBox">
        <div>
          <div>税前总收入</div>
          <div class="num">{{doctorRow.before_tax_income}}</div>
          <div>预结算金额<br/>（未入账）</div>
          <div class="num">{{ doctorRow.ready_settle_count }}</div>
        </div>
        <div>
          <div>扣缴税额</div>
          <div class="num">{{ doctorRow.tax_money }}</div>
          <div>累计提现</div>
          <div class="num">{{ doctorRow.cashout_money }}</div>
        </div>
        <div>
          <div>税后总收入</div>
          <div class="num">{{ doctorRow.after_tax_income }}</div>
          <div>账户余额</div>
          <div class="num">{{ doctorRow.balance_money }}</div>
        </div>
      </div>
      </div>
    </div>
    <div style="margin-top: 20px;margin-bottom: 20px">
      <el-radio-group v-model="changed">
        <el-radio-button label="收入明细"></el-radio-button>
        <el-radio-button label="账户明细"></el-radio-button>
        <el-radio-button label="预结算明细"></el-radio-button>
      </el-radio-group>
      <el-button plain @click="derive" style="margin-left: 20px">导出<i class="el-icon-download el-icon--right"></i></el-button>
    </div>
    <div v-if="changed==='收入明细'">
      <incomeTable @settlement_time="set_time" :doctorID="doctorRow.doctor_id"></incomeTable>
    </div>
    <div  v-if="changed==='账户明细'">
      <accountTable :doctorID="doctorRow.doctor_id"></accountTable>
    </div>
    <div  v-if="changed==='预结算明细'">
      <preTable @settlement_time="set_time" :doctorID="doctorRow.doctor_id"></preTable>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import incomeTable from './incomeTable'
import accountTable from './accountTable'
import preTable from './preTable'
export default {
  name: "withdrawalTep",
  data() {
    return {
      changed:'收入明细',
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[],
      doctor_infoList:[],
      settlement_time:'',
    }
  },
  props:{
    doctorRow:''
  },
  components:{
    //someComponent
    Pagination,
    incomeTable,
    accountTable,
    preTable,
  },
  methods: {
    //
    getBack(){ // 返回
      this.$emit('getBack',false)
    },
    // ----------分页控制-------------
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.currPage = val
      this.init()
    },
    init(){
      this.axios
          .post("platform/Doctorstatistics/getDoctorInfo", {'doctor_id':this.doctorRow.doctor_id})
          .then((res) => {
            this.doctor_infoList=res.data.info
          })
    },
    set_time(val){
      this.settlement_time=val
    },
    derive() { // 导出
    let url=''
    let data={
        doctor_id:this.doctorRow.doctor_id,
        settlement_time:this.settlement_time,
      }
    if(this.changed==='收入明细'){
      url='platform/Doctorstatistics/exportDoctorRevenueList'
    }
    if(this.changed==='账户明细'){
      delete data.settlement_time
      url='platform/Doctorstatistics/exportDoctorAccountList'
    }
    if(this.changed==='预结算明细'){
      url='platform/Doctorstatistics/exportDoctorReadySettleList'
    }
      this.axios
          .post(url, data)
          .then((res) => {
            window.open(res.data.url)
          })
    },
  },
  mounted() {
    //
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.withdrawalTep {
  .doctorMsg{
    padding-left: 20px;
    div{
      padding-bottom: 21px;
      span{
        padding-right: 20px;
      }
    }
  }
  .rightBox{
    display: flex;
    width: 450px;
    text-align: center;
    &>div{
      width: 150px;
      .num{
        color: #F56C6C;
        padding-top: 5px;
        padding-bottom: 10px;
      }
    }
  }
}
</style>