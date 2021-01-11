<template>
  <div class="ordersList">
    <div v-if="!dialogVisible">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="90px">
        <el-form-item label="订单编号">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.order_sn"
                    placeholder="请输入订单编号"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.doctor_name"
                    placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.phone"
                    placeholder="请输入医生手机"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.user_name"
                    placeholder="请输入患者姓名"></el-input>
        </el-form-item>
        <el-form-item label="支付时间">
          <el-date-picker
              @input="search"
              v-model="searchForm.payTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处方来源">
          <el-select style="width: 140px" @input="search" v-model="searchForm.pre_type" placeholder="请选择处方来源" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="问诊开方" value="1"></el-option>
            <el-option label="直接开方" value="2"></el-option>
<!--            <el-option label="云诊所开方" value="3"></el-option>-->
            <el-option label="云诊所开方" value="4"></el-option>
            <el-option label="手机号开方" value="5"></el-option>
            <el-option label="微信开方" value="6"></el-option>
            <el-option label="视频问诊开方" value="7"></el-option>
            <el-option label="按方购药" value="8"></el-option>
            <el-option label="拍方购药" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="云诊所名称">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.org_name"
                    placeholder="请输入云诊所名称"></el-input>
        </el-form-item>
        <el-form-item label="药房名称">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.hospital_name"
                    placeholder="请输入药房名称"></el-input>
        </el-form-item>
        <el-form-item label="医生职称" v-if="filterList.titleState">
          <el-select style="width: 140px" @input="search" v-model="searchForm.title" multiple placeholder="请选择医生职称" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="主任医师" value="主任医师"></el-option>
            <el-option label="副主任医师" value="副主任医师"></el-option>
            <el-option label="主治医师" value="主治医师"></el-option>
            <el-option label="住院医师" value="住院医师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者年龄" v-if="filterList.ageState">
          <el-input style="width: 85px" @input="search" clearable v-model="searchForm.age_begin" placeholder="请输入"></el-input>
          -
          <el-input @input="search" clearable v-model="searchForm.age_end" placeholder="请输入"
                    style="width: 85px"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" v-if="filterList.pay_moneyState">
          <el-input style="width: 140px" @input="search" clearable v-model="searchForm.pay_money"
                    placeholder="请输入订单金额"></el-input>
        </el-form-item>
        <el-form-item label="科室" v-if="filterList.department_nameState">
          <el-input style="width: 120px" @input="search" clearable v-model="searchForm.department_name"
                    placeholder="请输入科室"></el-input>
        </el-form-item>
        <el-form-item label="开方时间" v-if="filterList.pre_beginState">
          <el-date-picker
              @input="search"
              v-model="searchForm.preTime"
              type="daterange"
              style="width: 200px"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" v-if="filterList.order_statusState">
          <el-select style="width: 140px" multiple @input="search" v-model="searchForm.order_status" placeholder="请选择订单状态"
                     clearable>
            <el-option label="全部" value="0"></el-option>
            <el-option label="待发货" value="1"></el-option>
            <el-option label="待收货" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
            <el-option label="已取消" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区" v-if="filterList.addresState">
          <el-cascader style="width: 140px" @input="search" :options="goodsTypeData" :props="{ checkStrictly: true }" v-model="searchForm.region" clearable
                       placeholder="请选择地区"></el-cascader>
        </el-form-item>
        <el-form-item label="处方号" v-if="filterList.pre_idState">
          <el-input @input="search" style="width: 140px" clearable v-model="searchForm.pre_id"
                    placeholder="请输入处方号"></el-input>
        </el-form-item>
        <el-form-item label="处方状态" v-if="filterList.pre_statusState">
          <el-select @input="search" multiple v-model="searchForm.prescription_status" placeholder="全部" clearable>
            <el-option label="待取药" value="1"></el-option>
            <el-option label="待审方" value="2"></el-option>
            <el-option label="已通过" value="3"></el-option>
            <el-option label="已抓药" value="4"></el-option>
            <el-option label="过期未取药" value="5"></el-option>
            <el-option label="审方不通过" value="6"></el-option>
            <el-option label="医生手动作废" value="7"></el-option>
            <el-option label="平台退款" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称" v-if="filterList.hospitalState">
          <el-input @input="search" style="width: 140px" clearable v-model="searchForm.hospital"
                    placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="药品剂型" v-if="filterList.drug_typeState">
          <el-select @input="search" multiple v-model="searchForm.drug_type" placeholder="全部" clearable>
            <el-option label="颗粒" value="1"></el-option>
            <el-option label="饮片" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="售后状态" v-if="filterList.refund_statusState">
          <el-select @input="search" multiple v-model="searchForm.refund_status" placeholder="全部" clearable>
            <el-option label="未退款" value="0"></el-option>
            <el-option label="已退款" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否异常">
          <el-radio-group  @input="search" v-model="searchForm.is_abnormal">
            <el-radio label="">全部</el-radio>
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="search">查询<i class="el-icon-search el-icon--right"></i></el-button>
        <el-button type="info" @click="clear">重置<i class="el-icon-refresh-right el-icon--right"></i></el-button>
        <el-button plain @click="derive">导出<i class="el-icon-download el-icon--right"></i></el-button>
        <el-popover
            placement="bottom"
            width="340"
            style="margin-left: 20px"
            trigger="click">
          <div class="filterPopover">
            <span>更多筛选条件</span>
            <div class="filterBox">
              <el-checkbox v-model="filterList.titleState">医生职称</el-checkbox>
              <el-checkbox v-model="filterList.ageState">患者年龄</el-checkbox>
              <el-checkbox v-model="filterList.pay_moneyState">订单金额</el-checkbox>
              <el-checkbox v-model="filterList.department_nameState">医生科室</el-checkbox>
              <el-checkbox v-model="filterList.pre_beginState">开方时间</el-checkbox>
              <el-checkbox v-model="filterList.order_statusState">订单状态</el-checkbox>
              <el-checkbox v-model="filterList.addresState">所在地区</el-checkbox>
              <el-checkbox v-model="filterList.pre_idState">处方单号</el-checkbox>
              <el-checkbox v-model="filterList.pre_statusState">处方状态</el-checkbox>
              <el-checkbox v-model="filterList.hospitalState">医院名称</el-checkbox>
              <el-checkbox v-model="filterList.drug_typeState">药品剂型</el-checkbox>
              <el-checkbox v-model="filterList.refund_statusState">售后状态</el-checkbox>
            </div>
          </div>
          <el-button slot="reference" type="warning" plain>更多筛选条件</el-button>
        </el-popover>
        <el-popover
            placement="bottom"
            width="350"
            style="margin-left: 10px"
            trigger="click">
          <div class="filterPopover">
            <span>更多筛选条件</span>
            <div class="filterBox">
              <el-checkbox v-model="filterTab.state4" disabled>支付时间</el-checkbox>
              <el-checkbox v-model="filterTab.state7">医生姓名</el-checkbox>
              <el-checkbox v-model="filterTab.state14">订单金额</el-checkbox>
              <el-checkbox v-model="filterTab.state1" disabled>订单编号</el-checkbox>
              <el-checkbox v-model="filterTab.state10">医生手机</el-checkbox>
              <el-checkbox v-model="filterTab.state15">其中运费</el-checkbox>
              <el-checkbox v-model="filterTab.state16">开方时间</el-checkbox>
              <el-checkbox v-model="filterTab.state2">医生职称</el-checkbox>
              <el-checkbox v-model="filterTab.state23">诊金</el-checkbox>
              <el-checkbox v-model="filterTab.state22">处方单号</el-checkbox>
              <el-checkbox v-model="filterTab.state5">医生科室</el-checkbox>
              <el-checkbox v-model="filterTab.state21">优惠金额</el-checkbox>
              <el-checkbox v-model="filterTab.state6">处方来源</el-checkbox>
              <el-checkbox v-model="filterTab.state8">所在地区</el-checkbox>
              <el-checkbox v-model="filterTab.state17">订单状态</el-checkbox>
              <el-checkbox v-model="filterTab.state18">药品剂型</el-checkbox>
              <el-checkbox v-model="filterTab.state11">医院名称</el-checkbox>
              <el-checkbox v-model="filterTab.state20">处方状态</el-checkbox>
              <el-checkbox v-model="filterTab.state3">患者姓名</el-checkbox>
              <el-checkbox v-model="filterTab.state9">云诊所名</el-checkbox>
              <el-checkbox v-model="filterTab.state19">售后状态</el-checkbox>
              <el-checkbox v-model="filterTab.state13">患者年龄</el-checkbox>
              <el-checkbox v-model="filterTab.state12">药房名称</el-checkbox>
            </div>
          </div>
          <el-button type="primary" slot="reference" plain>显示列表字段</el-button>
        </el-popover>
        <div style="float: right;margin-top: 8px">
          <span class="decBox">订单累计数: <i class="text-Danger"> {{ order_count || 0}} </i> </span>
          <span class="decBox">订单金额累计： <i class="text-Danger"> {{ order_price_count || 0}} </i></span>
          <span class="decBox">运费累计：  <i class="text-Danger"> {{ freight_price_count || 0}} </i> </span>
          <el-radio-group @change="search" v-model="searchForm.is_test">
            <el-radio-button label="正式"></el-radio-button>
            <el-radio-button label="测试"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div style="border: 1px solid #c9cdd6">
        <el-table
            :header-cell-style="{background:'#F5F5F5'}"
            :data="tableData"
            @sort-change="formatter"
            max-height="600"
            style="width: 100%">
          <el-table-column
              v-if="filterTab.state4"
              prop="create_time"
              sortable="custom"
              min-width="120px"
              label="支付时间">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state1"
              prop="order_sn"
              label="订单编号"
              min-width="140px"
              sortable="custom">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state16"
              prop="pre_create_time"
              sortable="custom"
              min-width="120px"
              label="开方时间">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state22"
              prop="pre_id"
              sortable="custom"
              align="center"
              min-width="100px"
              label="处方单号">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state6"
              prop="pre_type"
              sortable="custom"
              min-width="100px"
              label="处方来源">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state18"
              prop="drug_type"
              sortable="custom"
              align="center"
              min-width="100px"
              label="药品剂型">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state3"
              prop="user_name"
              min-width="100px"
              sortable="custom"
              label="患者姓名">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state13"
              prop="age"
              sortable="custom"
              min-width="100"
              align="center"
              label="患者年龄">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state7"
              prop="doctor_name"
              sortable="custom"
              min-width="100px"
              label="医生姓名">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state10"
              prop="doctor_phone"
              sortable="custom"
              min-width="100"
              align="center"
              label="医生手机">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state2"
              prop="title"
              sortable="custom"
              min-width="100px"
              label="医生职称">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state5"
              prop="department_name"
              min-width="100px"
              sortable="custom"
              label="医生科室">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state8"
              prop="province_name"
              sortable="custom"
              min-width="140"
              label="所在地区">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state11"
              prop="hospital"
              sortable="custom"
              min-width="120"
              label="医院名称">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state9"
              prop="org_name"
              sortable="custom"
              min-width="110"
              label="云诊所名称">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state12"
              prop="hospital_name"
              sortable="custom"
              min-width="120"
              label="药房名称">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state14"
              prop="pay_money"
              sortable="custom"
              align="center"
              min-width="100"
              label="订单金额">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state15"
              prop="freight_price"
              sortable="custom"
              align="center"
              min-width="100"
              label="其中运费">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state23"
              prop="consulting_gold"
              sortable="custom"
              align="center"
              min-width="80px"
              label="诊金">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state21"
              prop="discount_price"
              sortable="custom"
              align="center"
              min-width="100px"
              label="优惠金额">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state17"
              prop="order_status"
              sortable="custom"
              align="center"
              min-width="100px"
              label="订单状态">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state20"
              prop="prescription_status"
              sortable="custom"
              align="center"
              min-width="100px"
              label="处方状态">
          </el-table-column>
          <el-table-column
              v-if="filterTab.state19"
              prop="refund_status"
              sortable="custom"
              align="center"
              min-width="100px"
              label="售后状态">
          </el-table-column>
          <el-table-column
              prop="address"
              fixed="right"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.order_id)" type="text" size="small">详情</el-button>
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
    <div v-if="dialogVisible">
      <orderDetails @getBack="getBack" :orderID="order_id"></orderDetails>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import {pickerOptions} from "@/service/common";
import orderDetails from './orderDetails'
export default {
  name: "ordersList",
  data() {
    return {
      pickerOptions: pickerOptions,
      tableData: [],
      doctor_count: '',
      searchForm: {
        order_status: [], //  订单状态
        order_sn: '',// 订单编号
        pre_id: '',// 处方号
        hospital_name: '',// 药房名称
        user_name: '',//患者姓名（主任医师，副主任医师，主治医师）
        prescription_status: [],//处方状态
        refund_status: [],//售后状态
        region: [],//地区
        doctor_name: '',//医生姓名
        preTime: [],//开方时间
        payTime: [],//支付时间
        phone: '',//医生电话
        pre_type: '',//处方来源
        org_name: '',//云诊所名称
        department_name: '',//科室
        title: [],//职称
        hospital: '',//医院
        drug_type: [],//剂型
        pay_money: '',//订单金额
        is_test: '正式',//是否（0为正式，1为测试）
        age_begin: '',// 年龄开始
        age_end: '',// 年龄结束
        is_abnormal: '',//是否异常
        prop: '',
        order_by: '',
      },
      total: 22, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      goodsTypeData: [],
      dialogVisible: false,
      filterList: { // 筛选list
        titleState: false,
        ageState: false,
        pay_moneyState: false,
        department_nameState: false,
        pre_beginState: false,
        order_statusState: false,
        addresState: false,
        pre_idState: false,
        pre_statusState: false,
        hospitalState: false,
        drug_typeState: false,
        refund_statusState: false,
      },
      filterTab: { // tab显示
        state1: true,//
        state2: false,
        state3: false,
        state4: true,//
        state5: false,
        state6: true,
        state7: true,
        state8: false,
        state9: true,
        state10: true,
        state11: false,
        state12: true,
        state13: true,
        state14: true,
        state15: true,
        state16: false,
        state17: true,
        state18: true,
        state19: true,
        state20: true,
        state21: false,
        state22: false,
        state23: false,
      },
      order_count:'',
      order_price_count:'',
      freight_price_count:'',
      order_id:''
    }
  },
  components: {
    Pagination,
    orderDetails
  },
  created() {
    if(window.utils.storage.getter('orderFilterTab')){
      this.filterTab=window.utils.storage.getter('orderFilterTab')
    }
    if(window.utils.storage.getter('orderFilterList')){
      this.filterList=window.utils.storage.getter('orderFilterList')
    }
  },
  watch: {
    filterTab: {
      handler(newVal) {
        window.utils.storage.setter("orderFilterTab", newVal);
      },
      deep: true
    },
    filterList: {
      handler(newVal) {
        window.utils.storage.setter("orderFilterList", newVal);
      },
      deep: true
    }
  },
  methods: {
    formatter(column) {
      this.searchForm.prop = column.prop
      if (column.order) {
        this.searchForm.order_by = column.order === "descending" ? "desc" : "asc"
      } else {
        this.searchForm.order_by = ''
      }
      this.init()
    },
    handleClick(id) { // 详情
      this.order_id=id
      this.dialogVisible=true
    },
    getBack(e){
      this.dialogVisible=e
    },
    city() { // 省市联动
      this.axios.post("platform/platform/getProvinceCityDistrict").then(res => {
        let tree = res.data.list;
        this.transRegions(tree);
        this.goodsTypeData = tree;
      })
    },
    transRegions(tree) {
      tree.forEach(item => {
        if (item.city || item.district) {
          item.children = item.city || item.district;
          delete item.city;
          delete item.district;
          this.transRegions(item.children);
        }
        if (item.province_id) {
          item.value = item.name;
          delete item.province_id;
        }
        if (item.city_id) {
          item.value = item.name;
          delete item.city_id;
        }
        if (item.district_id) {
          item.value = item.name;
          delete item.district_id;
        }
        if (item.name) {
          item.label = item.name;
          delete item.name;
        }
      });
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
        order_sn: '',
        pre_id: '',
        preTime: [],
        payTime: [],
        hospital_name: '',
        user_name: '',
        age: '',
        prescription_status: [],
        pay_begin: '',
        is_abnormal: '',
        pay_end: '',
        pre_begin: '',
        pre_end: '',
        is_test: '正式',
        age_begin: '',
        age_end: '',
        doctor_name: '',
        phone: '',
        pre_type: '',
        org_name: '',
        title: [],
        department_name: '',
        region: [],
        drug_type: [],
        pay_money: '',
        order_status: [],
        refund_status: [],
      }
      this.init()
    },
    derive() { // 导出
      let data = {
        order_status: this.searchForm.order_status.join(","),
        order_sn: this.searchForm.order_sn,
        pre_id: this.searchForm.pre_id,
        hospital_name: this.searchForm.hospital_name,
        user_name: this.searchForm.user_name,
        is_abnormal: this.searchForm.is_abnormal,
        prescription_status: this.searchForm.prescription_status.join(","),
        refund_status: this.searchForm.refund_status.join(","),
        pay_begin: this.searchForm.payTime[0],
        pay_end: this.searchForm.payTime[1],
        pre_begin: this.searchForm.preTime[0],//开方时间
        pre_end: this.searchForm.preTime[1],
        is_test: this.searchForm.is_test === '正式' ? '0' : '1',//是否测试（0为正式，1为测试）
        doctor_name: this.searchForm.doctor_name,// 医生姓名
        phone: this.searchForm.phone,// 医生电话
        pre_type: this.searchForm.pre_type,//处方来源
        org_name: this.searchForm.org_name,//云诊所名称
        title: this.searchForm.title.join(","),//医生职称（主任医师，副主任医师，主治医师）
        department: this.searchForm.department,//科室
        hospital: this.searchForm.hospital,//医院
        drug_type: this.searchForm.drug_type.join(","),
        pay_money: this.searchForm.pay_money,
        province: this.searchForm.region[0],// 省
        city: this.searchForm.region[1],//市
        district: this.searchForm.region[2],// 区
        age_begin: this.searchForm.age_begin,// 年龄开始
        age_end: this.searchForm.age_end,// 年龄结束
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Orderstatistics/exportOrderList", data)
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
      if(this.searchForm.payTime===null){
        this.searchForm.payTime=[]
      }
      if(this.searchForm.preTime===null){
        this.searchForm.preTime=[]
      }
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        order_status: this.searchForm.order_status.join(","),
        order_sn: this.searchForm.order_sn,
        pre_id: this.searchForm.pre_id,
        hospital_name: this.searchForm.hospital_name,
        user_name: this.searchForm.user_name,
        is_abnormal: this.searchForm.is_abnormal,
        prescription_status: this.searchForm.prescription_status.join(","),
        refund_status: this.searchForm.refund_status.join(","),
        pay_begin: this.searchForm.payTime[0],
        pay_end: this.searchForm.payTime[1],
        pre_begin: this.searchForm.preTime[0],//开方时间
        pre_end: this.searchForm.preTime[1],
        is_test: this.searchForm.is_test === '正式' ? '0' : '1',//是否测试（0为正式，1为测试）
        doctor_name: this.searchForm.doctor_name,// 医生姓名
        phone: this.searchForm.phone,// 医生电话
        pre_type: this.searchForm.pre_type,//处方来源
        org_name: this.searchForm.org_name,//云诊所名称
        title: this.searchForm.title.join(","),//医生职称（主任医师，副主任医师，主治医师）
        department: this.searchForm.department,//科室
        hospital: this.searchForm.hospital,//医院
        drug_type: this.searchForm.drug_type.join(","),
        pay_money: this.searchForm.pay_money,
        province: this.searchForm.region[0],// 省
        city: this.searchForm.region[1],//市
        district: this.searchForm.region[2],// 区
        age_begin: this.searchForm.age_begin,// 年龄开始
        age_end: this.searchForm.age_end,// 年龄结束
        prop: this.searchForm.prop,
        order_by: this.searchForm.order_by,
      }
      this.axios
          .post("platform/Orderstatistics/getOrderList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.tableData.forEach(item => {
              if (item.sex) {
                item.sex = item.sex === 1 ? "男" : '女'
              }
              item.province_name = item.province_name + item.city_name + item.district_name
              if(item.province_name === 0){
                item.province_name=''
              }
              if (item.create_time) {
                item.create_time = this.dayjs(item.create_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              if (item.pre_create_time) {
                item.pre_create_time = this.dayjs(item.pre_create_time * 1000).format('YYYY/MM/DD HH:mm')
              }
              switch (item.prescription_status) {
                case 1:
                  item.prescription_status = '待取药'
                  break;
                case 2:
                  item.prescription_status = '待审方'
                  break;
                case 3:
                  item.prescription_status = '已通过'
                  break;
                case 4:
                  item.prescription_status = '已抓药'
                  break;
                case 5:
                  item.prescription_status = '过期未取药'
                  break;
                case 6:
                  item.prescription_status = '审方不通过'
                  break;
                case 7:
                  item.prescription_status = '医生手动作废'
                  break;
                case 8:
                  item.prescription_status = '平台退款'
                  break;
              }
              switch (item.pre_type) {
                case 1:
                  item.pre_type = '问诊开方'
                  break;
                case 2:
                  item.pre_type = '直接开方'
                  break;
                case 4:
                  item.pre_type = '云诊所开方'
                  break;
                case 5:
                  item.pre_type = '手机号开方'
                  break;
                case 6:
                  item.pre_type = '微信开方'
                  break;
                case 7:
                  item.pre_type = '视频问诊开方'
                  break;
                case 8:
                  item.pre_type = '按方购药'
                  break;
                case 9:
                  item.pre_type = '拍方购药'
                  break;
              }
              switch (item.order_status) {
                case 1:
                  item.order_status = '待审核'
                  break;
                case 2:
                  item.order_status = '待发药'
                  break;
                case 3:
                  item.order_status = '待收货'
                  break;
                case 4:
                  item.order_status = '已完成'
                  break;
                case 5:
                  item.order_status = '不通过'
                  break;
                case 6:
                  item.order_status = '平台退款'
                  break;
              }
              switch (item.drug_type) {
                case 1:
                  item.drug_type = '颗粒'
                  break;
                case 2:
                  item.drug_type = '饮片'
                  break;
                  default:
                    item.drug_type = '其他'
              }
              switch (item.refund_status) {
                case 0:
                  item.refund_status = '未退款'
                  break;
                case 1:
                  item.refund_status = '已退款'
                  break;
              }
            })
            this.total = res.data.total
            this.order_count = res.data.order_count
            this.order_price_count = res.data.order_price_count
            this.freight_price_count = res.data.freight_price_count
          })
    }
  },
  mounted() {
    //
    this.city()
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.ordersList {
  text-align: start;
  min-height: 800px;
  .decBox {
    padding-right: 20px;

    i {
      font-style: normal;
    }
  }

  .el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
<style lang="scss">
.filterPopover {
  .filterBox {
    display: flex;
    flex-wrap: wrap;

    .el-checkbox {
      padding: 5px 0;
    }
  }
}
</style>