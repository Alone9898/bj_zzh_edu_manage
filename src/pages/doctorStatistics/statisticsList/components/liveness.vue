<template>
  <div class="liveness">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
      <el-form-item label="医生姓名" label-width="70px">
        <el-input @input="search" clearable v-model="searchForm.doctor_name" placeholder="请输入医生姓名"></el-input>
      </el-form-item>
      <el-form-item label="医生手机" label-width="70px">
        <el-input @input="search" clearable v-model="searchForm.doctor_phone" placeholder="请输入医生手机"></el-input>
      </el-form-item>
      <el-form-item label="登录时间范围">
        <el-date-picker
            @input="search"
            v-model="searchForm.loginTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="接诊时间范围">
        <el-date-picker
            @input="search"
            v-model="searchForm.inquiriedTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开方时间范围">
        <el-date-picker
            @input="search"
            v-model="searchForm.prescriptionTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="search">查询<i class="el-icon-search el-icon--right"></i></el-button>
      <el-button type="info" @click="clear">重置<i class="el-icon-refresh-right el-icon--right"></i></el-button>
      <el-button plain @click="derive">导出<i class="el-icon-download el-icon--right"></i></el-button>
    </div>
    <div style="border: 1px solid #c9cdd6">
      <el-table
          :header-cell-style="{background:'#F5F5F5'}"
          :data="tableData"
          max-height="600"
          @sort-change="formatter"
          style="width: 100%"
      >
        <el-table-column
            prop="doctor_name"
            label="医生姓名"
            min-width="100"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="phone"
            min-width="100"
            sortable="custom"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="last_login_time"
            sortable="custom"
            min-width="120"
            label="最近登录">
        </el-table-column>
        <el-table-column
            prop="login_times"
            sortable="custom"
            align="center"
            min-width="100"
            label="登录次数">
        </el-table-column>
        <el-table-column
            prop="last_consult_time"
            sortable="custom"
            min-width="120"
            label="最近接诊">
        </el-table-column>
        <el-table-column
            prop="last_prescription_time"
            sortable="custom"
            min-width="120"
            label="最近开方">
        </el-table-column>
        <el-table-column
            prop="feedback_count"
            sortable="custom"
            min-width="120"
            label="意见反馈数">
        </el-table-column>
        <el-table-column
            prop="notice_count"
            sortable="custom"
            min-width="120"
            label="发布公告数">
        </el-table-column>
        <el-table-column
            prop="article_count"
            sortable="custom"
            min-width="130"
            label="发布患者文章数">
        </el-table-column>
        <el-table-column
            prop="invite_patient_count"
            sortable="custom"
            min-width="120"
            label="邀请患者数">
        </el-table-column>
        <el-table-column
            prop="invite_doctor_count"
            sortable="custom"
            min-width="120"
            label="邀请医生数">
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
import Pagination from '@/components/Pagination.vue';
import {pickerOptions} from  '@/service/common'
export default {
  name: "liveness",
  data() {
    return {
      pickerOptions:pickerOptions,
      searchForm: {
        drugName: '',
        drugSpec: '',
        biddingcompany: '',
        drugStatus: '',
        loginTime: [],
        inquiriedTime: [],
        prescriptionTime: [],
        prop: '',
        order_by: '',
      },
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[],
    }
  },
  components: {
    Pagination
  },
  created() {
  },
  methods: {
    //
    formatter(column) {
      this.searchForm.prop=column.prop
      if(column.order){
        this.searchForm.order_by=column.order==="descending"?"desc":"asc"
      }else {
        this.searchForm.order_by=''
      }
      this.init()
    },
    derive() { // 导出
      let data = {
        doctor_name: this.searchForm.doctor_name,
        doctor_phone: this.searchForm.doctor_phone,
        login_start: this.searchForm.loginTime[0],
        login_end: this.searchForm.loginTime[1],
        inquiried_start: this.searchForm.inquiriedTime[0],
        inquiried_end: this.searchForm.inquiriedTime[1],
        prescription_start: this.searchForm.prescriptionTime[0],
        prescription_end: this.searchForm.prescriptionTime[1],
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Doctorstatistics/exportDoctorActivityList", data)
          .then((res) => {
            window.open(res.data.url)
          })
    },
    // -------------------查询条件/清空-------------------
    search() {
      this.currPage = 1 //当前页码
      this.pageSize = 10 //每页条数
      this.init()
    },
    clear() {
      this.currPage = 1 //当前页码
      this.pageSize = 10 //每页条数
      this.searchForm = {
        doctor_name: '',
        doctor_phone: '',
        loginTime: [],
        inquiriedTime: [],
        prescriptionTime: [],
        prop: '',
        order_by: '',
      }
      this.init()
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
    // list
    init() {
      if(this.searchForm.inquiriedTime===null){
        this.searchForm.inquiriedTime=[]
      }
      if(this.searchForm.loginTime===null){
        this.searchForm.loginTime=[]
      }
      if(this.searchForm.prescriptionTime===null){
        this.searchForm.prescriptionTime=[]
      }
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_name: this.searchForm.doctor_name,
        doctor_phone: this.searchForm.doctor_phone,
        login_start: this.searchForm.loginTime[0],
        login_end: this.searchForm.loginTime[1],
        inquiried_start: this.searchForm.inquiriedTime[0],
        inquiried_end: this.searchForm.inquiriedTime[1],
        prescription_start: this.searchForm.prescriptionTime[0],
        prescription_end: this.searchForm.prescriptionTime[1],
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Doctorstatistics/getDoctorActivityList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.tableData.forEach(item => {
              if(item.last_login_time) {
                item.last_login_time = this.dayjs(item.last_login_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              if(item.last_consult_time){
                item.last_consult_time=this.dayjs(item.last_consult_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              if(item.last_prescription_time){
                item.last_prescription_time=this.dayjs(item.last_prescription_time * 1000).format('YYYY/MM/DD HH:mm')
              }
            })
            this.total = res.data.total
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
.liveness {

}
</style>