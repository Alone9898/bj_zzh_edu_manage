<template>
  <div class="inquiry">
    <div v-if="!details">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
        <el-form-item label="医生姓名"  label-width="70px">
          <el-input clearable @input="search" v-model="searchForm.doctor_name" placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机" label-width="70px">
          <el-input clearable @input="search" v-model="searchForm.doctor_phone" placeholder="请输入医生手机"></el-input>
        </el-form-item>
        <el-form-item label="是否开启问诊">
          <el-select v-model="searchForm.reception" clearable @input="search">
            <el-option label="全部" value=""></el-option>
            <el-option label="未开启" value="1"></el-option>
            <el-option label="已开启" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
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
      </el-form>
      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="search">查询<i class="el-icon-search el-icon--right"></i></el-button>
        <el-button type="info" @click="clear">重置<i class="el-icon-refresh-right el-icon--right"></i></el-button>
        <el-button plain @click="derive">导出<i class="el-icon-download el-icon--right"></i></el-button>
        <span class="decBox">
        <span> 医生人数共 <i class="text-Danger"> {{ doctorDec_list.doctor_count }} </i> 人</span>
        <span>未接诊数: <i class="text-Danger">{{ doctorDec_list.con_over_total_count }} </i>次</span>
        <span>接诊数: <i class="text-Danger">{{ doctorDec_list.con_agree_total_count }} </i>次</span>
        <span>开方数 : <i class="text-Danger">{{ doctorDec_list.pre_total_count }} </i>次</span>
        <span>已抓药处方数: <i class="text-Danger">{{ doctorDec_list.pre_pay_total_count }} </i>次</span>
        <span>已作废处方数: <i class="text-Danger">{{ doctorDec_list.pre_refund_total_count }} </i>次</span>
      </span>
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
              sortable="custom">
          </el-table-column>
          <el-table-column
              prop="phone"
              align="center"
              sortable="custom"
              label="手机号">
          </el-table-column>
          <el-table-column
              prop="reception"
              sortable="custom"
              min-width="100"
              align="center"
              label="是否开启问诊">
          </el-table-column>
          <el-table-column
              prop="con_over_count"
              sortable="custom"
              min-width="100"
              align="center"
              label="未接诊数">
          </el-table-column>
          <el-table-column
              prop="con_agree_count"
              sortable="custom"
              align="center"
              label="接诊数">
          </el-table-column>
          <el-table-column
              prop="pre_count"
              align="center"
              sortable="custom"
              label="开方数">
          </el-table-column>
          <el-table-column
              prop="pre_pay_count"
              sortable="custom"
              min-width="100"
              align="center"
              label="已抓药处方数">
          </el-table-column>
          <el-table-column
              prop="pre_refund_count"
              sortable="custom"
              align="center"
              min-width="100"
              label="已作废处方数">
          </el-table-column>
          <el-table-column
              prop="address"
              fixed="right"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div style="margin-top: 20px">
        <Pagination :total='total' :currentPage='currPage' :pageSize='pageSize' @handleSizeChange='handleSizeChange'
                    @handleCurrentChange='handleCurrentChange'></Pagination>
      </div>
    </div>
    <div v-if="details">
      <inquiryTep @getBack="getBack" :doctorRow="doctorRow"></inquiryTep>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import inquiryTep from './inquiryTep/inquiryTep';
import {pickerOptions} from  '@/service/common'
export default {
  name: "inquiry",
  data() {
    return {
      pickerOptions:pickerOptions,
      searchForm: {
        doctor_name: '',
        doctor_phone: '',
        reception: '',
        date_start: '',
        date_end: '',
        loginTime: [],
        prop: '',
        order_by: '',
      },
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData:[],
      doctorDec_list:'',
      details:false,
    }
  },
  components: {
    Pagination,
    inquiryTep
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
        reception: '',
        date_start: '',
        date_end: '',
        loginTime: [],
        prop: '',
        order_by: '',
        doctorRow: '',
      }
      this.init()
    },
    derive() { // 导出
      let data = {
        doctor_name: this.searchForm.doctor_name,
        doctor_phone: this.searchForm.doctor_phone,
        reception: this.searchForm.reception,
        date_start: this.searchForm.loginTime[0],
        date_end: this.searchForm.loginTime[1],
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Doctorstatistics/exportDoctorInquiryList", data)
          .then((res) => {
            window.open(res.data.url)
          })
    },
    handleClick(row) { // 详情
      this.doctorRow=row
      this.details=true
    },
    getBack(e){
      this.details=e
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
      if(this.searchForm.loginTime===null){
        this.searchForm.loginTime=[]
      }
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_name: this.searchForm.doctor_name,
        doctor_phone: this.searchForm.doctor_phone,
        reception: this.searchForm.reception,
        date_start: this.searchForm.loginTime[0],
        date_end: this.searchForm.loginTime[1],
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Doctorstatistics/getDoctorInquiryList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.tableData.forEach(item => {
              item.reception=item.reception === 1?"未开启":"已开启"
            })
            this.total = res.data.total
            this.doctorDec_list = res.data
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
.inquiry {
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