<template>
  <div class="pecipeList">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="90px">
      <el-form-item label="医生姓名">
        <el-input   @input="search" clearable v-model="searchForm.doctor_name" placeholder="请输入医生姓名"></el-input>
      </el-form-item>
      <el-form-item label="医生手机">
        <el-input   @input="search" clearable v-model="searchForm.doctor_name" placeholder="请输入医生手机"></el-input>
      </el-form-item>
      <el-form-item label="患者姓名">
        <el-input   @input="search" clearable v-model="searchForm.doctor_name" placeholder="请输入患者姓名"></el-input>
      </el-form-item>
      <el-form-item label="开方时间">
        <el-date-picker
            @input="search"
            v-model="searchForm.loginTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="药品剂型">
        <el-select   @input="search" v-model="searchForm.title" placeholder="全部" clearable>
          <el-option label="颗粒" value="颗粒"></el-option>
          <el-option label="饮片" value="饮片"></el-option>
          <el-option label="养生膏方" value="养生膏方"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处方状态">
        <el-select  @input="search" multiple  v-model="searchForm.title" placeholder="全部" clearable>
          <el-option label="待取药" value="待取药"></el-option>
          <el-option label="待审方" value="待审方"></el-option>
          <el-option label="已通过" value="已通过"></el-option>
          <el-option label="已抓药" value="已抓药"></el-option>
          <el-option label="已失效" value="已失效"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处方来源">
        <el-select  @input="search" multiple  v-model="searchForm.title" placeholder="全部" clearable>
          <el-option label="问诊开方" value="问诊开方"></el-option>
          <el-option label="直接开方" value="手机号开方"></el-option>
          <el-option label="微信开方" value="微信开方"></el-option>
          <el-option label="视频问诊开方" value="视频问诊开方"></el-option>
          <el-option label="云诊所开方" value="云诊所开方 "></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="云诊所名称">
        <el-input   @input="search" clearable v-model="searchForm.phone" placeholder="请输入药品规格"></el-input>
      </el-form-item>
      <el-form-item label="药房名称">
        <el-input   @input="search" clearable v-model="searchForm.phone" placeholder="请输入药品规格"></el-input>
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
            @input="search"
            v-model="searchForm.loginTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="隐藏剂量">
        <el-select   @input="search" v-model="searchForm.title" placeholder="请选择职称" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="search">查询<i class="el-icon-search el-icon--right"></i></el-button>
      <el-button type="info" @click="clear">重置<i class="el-icon-refresh-right el-icon--right"></i></el-button>
      <el-button plain @click="derive">导出<i class="el-icon-download el-icon--right"></i></el-button>
      <div style="float: right;margin-top: 8px">
        <span class="decBox">处方累计数: <i class="text-Danger"> {{ doctor_count }} </i></span>
        <span class="decBox">药品金额累计: <i class="text-Danger"> {{ doctor_count }} </i></span>
        <span class="decBox">诊金累计: <i class="text-Danger"> {{ doctor_count }} </i></span>
        <el-switch
            v-model="searchForm.is_test"
            @change="search"
            active-color="#5470C6"
            inactive-color="#FFB660"
            active-text="正式环境"
            inactive-text="测试环境">
        </el-switch>
      </div>
    </div>
    <div style="border: 1px solid #c9cdd6">
      <el-table
          :header-cell-style="{background:'#F5F5F5'}"
          :data="tableData"
          @sort-change="formatter"
          style="width: 100%"
      >
        <el-table-column
            prop="date"
            label="头像"
            width="80">
          <template slot-scope="scope">
            <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.head_img"
                fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="doctor_name"
            label="姓名"
            sortable="custom"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sex"
            sortable="custom"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="age"
            sortable="custom"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="phone"
            sortable="custom"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="title"
            sortable="custom"
            label="职称">
        </el-table-column>
        <el-table-column
            prop="department_name"
            sortable="custom"
            label="科室">
        </el-table-column>
        <el-table-column
            prop="hospital"
            sortable="custom"
            label="医院">
        </el-table-column>
        <el-table-column
            prop="province_name"
            sortable="custom"
            label="地区">
        </el-table-column>
        <el-table-column
            prop="create_time"
            sortable="custom"
            label="注册时间">
        </el-table-column>
        <el-table-column
            prop="first_authentication_time"
            sortable="custom"
            width="120"
            label="首次认证时间">
        </el-table-column>
        <el-table-column
            prop="doc_from"
            sortable="custom"
            label="注册来源">
        </el-table-column>
        <el-table-column
            prop="recommender_name"
            sortable="custom"
            label="推荐人姓名">
        </el-table-column>
        <el-table-column
            prop="recommender_phone"
            sortable="custom"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="recommender_code"
            sortable="custom"
            label="邀请码">
        </el-table-column>
        <el-table-column
            prop="address"
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.doctor_id)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="margin-top: 20px">
      <Pagination :total='total' :currentPage='currPage' :pageSize='pageSize' @handleSizeChange='handleSizeChange'
                  @handleCurrentChange='handleCurrentChange'></Pagination>
    </div>
    <el-dialog
        title="医生信息详情"
        :visible.sync="dialogVisible"
        width="60%"
        class="doctorDetails">
      <div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">医生姓名</span>
              <span>{{ doctorDetails.doctor_name }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">性别</span>
              <span>{{ doctorDetails.sex === 1 ? '男' : '女' }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">手机号</span>
              <span>{{ doctorDetails.phone }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">认证时间</span>
              <span>{{ dayjs(doctorDetails.update_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine">
          <span class="titleName">证件号码</span>
          <span>{{ doctorDetails.id_card }}</span>
        </div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">出生日期</span>
              <span>{{ doctorDetails.birthday }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">年龄</span>
              <span>{{ doctorDetails.age }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine">
          <span class="titleName">所在地区</span>
          <span>{{ doctorDetails.province_name + doctorDetails.city_name + doctorDetails.district_name }}</span>
        </div>
        <div class="detailsLine">
          <span class="titleName">医院名称</span>
          <span>{{ doctorDetails.hospital }}</span>
        </div>
        <div class="detailsLine">
          <span class="titleName">擅长方向</span>
          <el-tag v-for="item in doctorDetails.be_good_at" :key="item.be_good_at_name" class="tagList" type="info">{{ item.be_good_at_name }}</el-tag>
        </div>
      </div>
      <div class="detailsLine">
        <span class="titleName" style="padding-left: 28px">科室</span>
        <span>{{ doctorDetails.department_name }}</span>
      </div>
      <div class="detailsLine">
        <span class="titleName" style="padding-left: 28px">职称</span>
        <span>{{ doctorDetails.title }}</span>
      </div>
      <div class="detailsLine" style="display: flex">
        <span class="titleName" >个人简介</span>
        <span style="text-align: left">
          {{ doctorDetails.introduction }}
        </span>
      </div>
      <div class="detailsLine">
        <el-row :gutter="20">
          <el-col :span="8">
            <span class="titleName">医生头像</span>
            <span style="vertical-align: top">
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="doctorDetails.head_img"
                     fit="fill"></el-image>
        </span>
          </el-col>
        </el-row>
      </div>
      <div class="detailsLine">
        <el-row :gutter="20">
          <el-col :span="8">
            <span class="titleName">专业技术资格证书</span>
            <div style="margin-top: 10px">
              <el-image
                  v-for="item in doctorDetails.qualification"
                  style="width: 150px; height: 150px;margin-right: 10px"
                  :key="item.path"
                  :src="item.path"
                  :preview-src-list="srcList"
                  fit="fill">
              </el-image>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="titleName">执业证书</span>
            <div style="margin-top: 10px">
              <el-image
                  v-for="item in doctorDetails.practice_certificate"
                  style="width: 150px; height: 150px;margin-right: 10px"
                  :src="item.path"
                  :key="item.path"
                  :preview-src-list="srcList"
                  fit="fill"></el-image>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="titleName">资格证书</span>
            <div style="margin-top: 10px">
              <el-image
                  style="width: 150px; height: 150px;margin-right: 10px"
                  v-for="item in doctorDetails.qualification_certificate"
                  :key="item.path"
                  :src="item.path"
                  :preview-src-list="srcList"
                  fit="fill"></el-image>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import {pickerOptions} from  '@/service/common'
export default {
  name: "pecipeList",
  data() {
    return {
      pickerOptions:pickerOptions,
      tableData: [],
      srcList: [],
      doctor_count: '',
      searchForm: {
        doctor_name: '', //  医生姓名
        sex: '',// 性别（1：男，2：女）
        age_begin: '',// 年龄段开始
        age_end: '',// 年龄段截止
        phone: '',// 医生电话
        title: '',//医生职称（主任医师，副主任医师，主治医师）
        department: '',//科室
        hospital: '',//医院
        region: '',//地区
        recommender_name: '',//推荐人
        recommender_phone: '',//推荐人手机
        recommender_code: '',//邀请码
        is_test: true,//是否测试（0为正式，1为测试）
        prop: '',
        order_by: '',
      },
      total: 22, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      dialogVisible: false,
      doctorDetails: ''
    }
  },
  components: {
    Pagination,
  },
  methods: {
    formatter(column) {
      this.searchForm.prop=column.prop
      if(column.order){
        this.searchForm.order_by=column.order==="descending"?"desc":"asc"
      }else {
        this.searchForm.order_by=''
      }
      this.init()
    },
    handleClick(id) { // 详情
      this.srcList=[]
      this.axios.post("platform/Doctorstatistics/getDoctorInfo", {doctor_id: id}).then(res => {
        this.doctorDetails = res.data.info
        this.getImg(this.doctorDetails.practice_certificate)
        this.getImg(this.doctorDetails.qualification)
        this.getImg(this.doctorDetails.qualification_certificate)
        this.dialogVisible = true
      })
    },
    getImg(src) {
      if(src.length>0){
        src.forEach(item=>{
          let value = this.getUrlParam("resources_id", item.path);
          this.axios
              .get("doctor/cms/getImg", {params: {resources_id: value}})
              .then(res => {
                item.path=res
                this.srcList.push(res)
              });
        })
      }
    },
    getUrlParam(key, url) {
      var reg = new RegExp("(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, ""));
      return "";
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
        doctor_name: '', //  医生姓名
        sex: '',// 性别（1：男，2：女）
        age_begin: '',// 年龄段开始
        age_end: '',// 年龄段截止
        phone: '',// 医生电话
        title: '',//医生职称（主任医师，副主任医师，主治医师）
        department: '',//科室
        hospital: '',//医院
        region: '',//地区
        recommender_name: '',//推荐人
        recommender_phone: '',//推荐人手机
        recommender_code: '',//邀请码
        is_test: '',//是否测试（0为正式，1为测试）
        prop: '',
        order_by: ''
      }
      this.init()
    },
    derive() { // 导出
      let data = {
        doctor_name: this.searchForm.doctor_name, //  医生姓名
        sex: this.searchForm.sex,// 性别（1：男，2：女）
        age_begin: this.searchForm.age_begin,//年龄段开始
        age_end: this.searchForm.age_end,// 年龄段截止
        phone: this.searchForm.phone,// 医生电话
        title: this.searchForm.title,//医生职称（主任医师，副主任医师，主治医师）
        department: this.searchForm.department,//科室
        hospital: this.searchForm.hospital,//医院
        recommender_name: this.searchForm.recommender_name,//推荐人
        recommender_phone: this.searchForm.recommender_phone,//推荐人手机
        recommender_code: this.searchForm.recommender_code,//邀请码
        is_test: this.searchForm.is_test ? '0' : '1',//是否测试（0为正式，1为测试）
        prop:this.searchForm.prop,
        order_by:this.searchForm.order_by,
      }
      this.axios
          .post("platform/Doctorstatistics/exportDoctorList", data)
          .then((res) => {
            window.open(res.data.url)
          })
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
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_name: this.searchForm.doctor_name, //  医生姓名
        sex: this.searchForm.sex,// 性别（1：男，2：女）
        age_begin: this.searchForm.age_begin,//年龄段开始
        age_end: this.searchForm.age_end,// 年龄段截止
        phone: this.searchForm.phone,// 医生电话
        title: this.searchForm.title,//医生职称（主任医师，副主任医师，主治医师）
        department: this.searchForm.department,//科室
        hospital: this.searchForm.hospital,//医院
        recommender_name: this.searchForm.recommender_name,//推荐人
        recommender_phone: this.searchForm.recommender_phone,//推荐人手机
        recommender_code: this.searchForm.recommender_code,//邀请码
        is_test: this.searchForm.is_test ? '0' : '1',//是否测试（0为正式，1为测试）
        prop:this.searchForm.prop,
        order_by:this.searchForm.order_by,
      }
      console.log(data)
      this.axios
          .post("platform/Doctorstatistics/getDoctorList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.tableData.forEach(item => {
              if (item.sex) {
                item.sex = item.sex === 1 ? "男" : '女'
              }
              item.province_name = item.province_name + item.city_name + item.district_name
              item.create_time=this.dayjs(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              if(item.doc_from===1){
                item.doc_from='APP注册'
              }
              if(item.doc_from===2){
                item.doc_from='平台注册'
              }
              if(item.doc_from===3){
                item.doc_from='邀请注册'
              }
              if(item.doc_from===4){
                item.doc_from='外部注册【SaaS】'
              }
            })
            this.total = res.data.total
            this.doctor_count = res.data.doctor_count
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
.pecipeList {
  text-align: start;
  min-height: 800px;

  & > div:nth-child(1) {
    margin-bottom: 20px;

    .el-button {
      box-shadow: 0 4px 8px #FFE0BA;
    }
  }
  .decBox{
    padding-right: 20px;
    i{
      font-style: normal;
    }
  }
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }

  .doctorDetails {
    .titleName {
      font-weight: bold;
      padding-right: 10px;
    }

    .detailsLine {
      padding-bottom: 20px;
    }

    .tagList {
      margin-right: 10px;
    }
  }
}
</style>