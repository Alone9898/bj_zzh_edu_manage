<template>
  <div class="inquiryTep">
    医生问诊开方记录
    <el-button @click="getBack" plain style="float: right"><i class="el-icon-back el-icon--left"></i>返回</el-button>
    <div style="display: flex;margin-top: 20px">
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
    </div>
    <div style="margin-top: 20px;margin-bottom: 20px">
      <el-radio-group v-model="changed" @change="tabChanged">
        <el-radio-button label="问诊记录"></el-radio-button>
        <el-radio-button label="开方记录"></el-radio-button>
      </el-radio-group>
      <el-button plain @click="derive" style="margin-left: 20px">导出<i class="el-icon-download el-icon--right"></i></el-button>
      <span class="decBox">
        <span>未接诊数： <i class="text-Danger"> {{ doctorRow.con_over_count || 0}} </i> </span>
        <span>接诊数： <i class="text-Danger">{{ doctorRow.con_agree_count || 0}}</i></span>
        <span>开方数: <i class="text-Danger">{{ doctorRow.pre_count || 0}}</i></span>
        <span>已抓药处方数: <i class="text-Danger">{{ doctorRow.pre_pay_count || 0 }}</i></span>
        <span>已作废处方数: <i class="text-Danger">{{ doctorRow.pre_refund_count || 0 }}</i></span>
      </span>
    </div>
    <div v-if="changed==='问诊记录'">
      <div style="border: 1px solid #c9cdd6">
        <el-table
            :header-cell-style="{background:'#F5F5F5'}"
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="submit_time"
              label="问诊发起时间"
          >
          </el-table-column>
          <el-table-column
              prop="agree_time"
              align="center"
              label="接诊时间">
          </el-table-column>
          <el-table-column
              prop="pay_money"
              align="center"
              label="问诊费用">
          </el-table-column>
          <el-table-column
              prop="con_over_count"
              min-width="100"
              label="患者信息">
            <template slot-scope="scope">
              <span>{{scope.row.real_name}}</span>
              <span style="margin-left: 10px">{{ scope.row.sex===1?'男':'女' }}</span>
              <br/>
              <span>{{scope.row.age}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              align="center"
              label="咨询状态">
          </el-table-column>
          <el-table-column
              prop="consult_type"
              align="center"
              label="咨询类型">
          </el-table-column>
          <el-table-column
              prop="refuse_desc"
              min-width="100"
              align="center"
              label="结束类型">
            <template slot-scope="scope">
              <span>{{scope.row.failure}}</span>
              <span>{{scope.row.refuse_desc}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="over_time"
              align="center"
              min-width="100"
              label="结束时间">
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div style="margin-top: 20px">
        <Pagination :total='total' :currentPage='currPage' :pageSize='pageSize' @handleSizeChange='handleSizeChange'
                    @handleCurrentChange='handleCurrentChange'></Pagination>
      </div>
    </div>
    <div  v-if="changed==='开方记录'">
      <inquiryTepList :doctorID="doctorRow.doctor_id"></inquiryTepList>
    </div>
  </div>
</template>

<script>
import inquiryTepList from './inquiryTepList'
import Pagination from '@/components/Pagination.vue'
export default {
  name: "inquiryTep",
  data() {
    return {
      changed:'问诊记录',
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[],
      doctor_infoList:[],
      checkedName:'问诊记录',
    }
  },
  props:{
    doctorRow:''
  },
  components:{
    //someComponent
    inquiryTepList,
    Pagination
  },
  methods: {
    //
    getBack(){ // 返回
      this.$emit('getBack',false)
    },
    tabChanged(e){
      this.checkedName=e
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
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_id: this.doctorRow.doctor_id
      }
      this.axios
          .post("platform/Doctorstatistics/getDoctorConsultList",data)
          .then((res) => {
            this.tableData=res.data.list
            this.total = res.data.total
                this.tableData.forEach(item => {
                  item.consult_type = item.consult_type === 1 ? "患者问诊" : '医生赠送咨询'
                  if (item.submit_time && item.submit_time !== 0) {
                    item.submit_time = this.dayjs(item.submit_time * 1000).format('YYYY/MM/DD HH:mm')
                  }else {
                    item.submit_time=''
                  }
                  if (item.agree_time && item.agree_time !== 0) {
                    item.agree_time = this.dayjs(item.agree_time * 1000).format('YYYY/MM/DD HH:mm')
                  }else {
                    item.agree_time=''
                  }
                  if (item.over_time && item.over_time !== 0) {
                    item.over_time = this.dayjs(item.over_time * 1000).format('YYYY/MM/DD HH:mm')
                  }else {
                    item.over_time=''
                  }
                  switch (item.status){
                    case  0:
                      item.status='未支付'
                      break;
                    case  2:
                      item.status='待确认'
                      break;
                    case  3:
                      item.status='咨询中'
                      break;
                    default:
                      if(item.status===4){
                        item.failure='拒绝接诊'
                      }
                      else if(item.status===5){
                        item.failure='问诊时间结束'
                      }
                      else if(item.status===6){
                        item.failure='超时未接诊'
                      }
                      else if(item.status===7){
                        item.failure='手动结束'
                      }
                      else if(item.status===8){
                        item.failure='超时未提交问诊'
                      }
                      else if(item.status===9){
                        item.failure='医生退款结束'
                      }
                      item.status='已结束'
                  }
                })
          })
    },
    derive() { // 导出
      let data = {
        doctor_id:this.doctorRow.doctor_id
      }
      if(this.checkedName==='问诊记录'){
        this.axios
            .post("platform/Doctorstatistics/exportConsultList", data)
            .then((res) => {
              window.open(res.data.url)
            })
      }else {
        this.axios
            .post("platform/Doctorstatistics/exportPrescriptionList", data)
            .then((res) => {
              window.open(res.data.url)
            })
      }
    },
  },
  mounted() {
    //
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.inquiryTep {
  .doctorMsg{
    padding-left: 20px;
    div{
      padding-bottom: 21px;
      span{
        padding-right: 20px;
      }
    }
  }
  .decBox{
    float: right;
    span{
      margin-left: 20px;
      line-height: 40px;
    }
    i{
      font-style: normal;
    }
  }
}
</style>