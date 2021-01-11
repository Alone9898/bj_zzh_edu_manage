<template>
  <div class="inquiryTepList">
    <div style="border: 1px solid #c9cdd6">
      <el-table
          :header-cell-style="{background:'#F5F5F5'}"
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column
            prop="create_time"
            min-width="100"
            label="问诊发起时间">
        </el-table-column>
        <el-table-column
            prop="pre_id"
            label="处方号">
        </el-table-column>
        <el-table-column
            prop="reception"
            label="患者信息">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
            <br/>
            <span>{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="drug_type"
            label="剂型">
        </el-table-column>
        <el-table-column
            prop="total_num"
            align="center"
            label="剂数">
        </el-table-column>
        <el-table-column
            prop="pre_money"
            align="center"
            label="药方费用">
        </el-table-column>
        <el-table-column
            prop="consulting_gold"
            align="center"
            label="诊金">
        </el-table-column>
        <el-table-column
            prop="gold_join"
            min-width="110"
            align="center"
            label="是否附加到药费">
        </el-table-column>
        <el-table-column
            prop="is_show"
            min-width="100"
            align="center"
            label="是否隐藏剂量">
        </el-table-column>
        <el-table-column
            prop="hospital_name"
            label="药房名称">
        </el-table-column>
        <el-table-column
            prop="pre_type"
            label="处方来源">
        </el-table-column>
        <el-table-column
            prop="status"
            label="处方状态">
        </el-table-column>
        <el-table-column
            prop="failure"
            label="失效类型">
        </el-table-column>
        <el-table-column
            prop="address"
            fixed="right"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.pre_id)" type="text" size="small">详情</el-button>
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
        title="开方详情"
        :visible.sync="dialogVisible"
        width="900px"
        class="doctorDetails">
      <div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">开方时间</span>
              <span>{{ dayjs(prescriptionInfo.create_time * 1000).format('YYYY/MM/DD HH:mm') }}</span>
            </el-col>
            <el-col :span="5">
              <span class="titleName">处方状态</span>
              <span>{{ prescriptionInfo.status }}</span>
            </el-col>
            <el-col :span="5">
              <span class="titleName">处方来源</span>
              <span>{{ prescriptionInfo.pre_type===4 ? '云诊所开方':'问诊开方'}}</span>
            </el-col>
            <el-col :span="5">
              <span class="titleName">处方号</span>
              <span>{{ prescriptionInfo.pre_id }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine">
          <span class="herderText">诊断</span>
          <span class="titleName">失效类型</span>
          <span class="text-Danger">{{ prescriptionInfo.failure }}</span>
        </div>
        <div class="detailsLine">
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">患者：</span>
            <span class="tagList">{{ prescriptionInfo.user_name }}</span>
            <span class="tagList">{{ prescriptionInfo.sex === 1 ? '男' : '女' }}</span>
            <span class="tagList">{{ prescriptionInfo.age }}</span>
          </div>
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">主诉：</span>
            <span class="tagList">{{ prescriptionInfo.chief_complaint }}</span>
          </div>
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">诊断：</span>
            <span>{{ prescriptionInfo.diagnosis }}</span>
          </div>
        </div>
        <div class="detailsLine">
          <span class="herderText">开方</span>
        </div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="4">
              <span class="titleName">药品剂型</span>
              <span>{{ prescriptionInfo.drug_type === 1 ? '颗粒' : '饮片' }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">药房名称</span>
              <span>{{ prescriptionInfo.hospital_name }}</span>
            </el-col>
            <el-col :span="5">
              <span class="titleName">隐藏剂量：</span>
              <span>{{ prescriptionInfo.is_show === 0 ? '否' : '是' }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine" style="background: #eee;padding-top: 10px">
          <span style="font-size: 20px;font-weight: bold;margin-right: 40px;padding-left: 10px">Rp</span>
          <div class="listBox">
            <div v-for="item in prescriptionInfo.item_list">
              <span>{{ item.generic_name }}</span><span
                class="mr-6">{{ item.item_use_level }}{{ item.item_unit }}</span>
            </div>
            <div v-for="item in prescriptionInfo.oil_item_list">
              <span>{{ item.oil_name }}</span><span class="mr-6">{{ item.item_use_level }}{{ item.oil_unit }}</span>
            </div>
          </div>
          <div style="border-top: 5px solid #fff;padding-left: 10px;padding-top: 10px">共1
            {{prescriptionInfo.total_num }}剂，每日1剂，每剂分{{ prescriptionInfo.day_num }}次服用
          </div>
        </div>
        <div class="detailsLine" style="margin-top: 20px">
          <span class="herderText">医嘱</span>
        </div>
        <div class="detailsLine">
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">用法：</span>
            <span class="tagList">{{ prescriptionInfo.use_method }}</span>
          </div>
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">禁忌：</span>
            <span class="tagList">{{ prescriptionInfo.taboo }}</span>
          </div>
          <div style="height: 25px;line-height: 25px">
            <span class="titleName">特殊说明：</span>
            <span class="tagList">{{ prescriptionInfo.doctor_advice }}</span>
          </div>
        </div>
        <div class="detailsLine" style="margin-top: 20px">
          <span class="herderText">费用明细</span>
        </div>
        <div class="detailsLine">
          <div class="detailAccount">
            <span class="titleName">药品金额：</span>
            <span class="tagList">{{ prescriptionInfo.pre_money }}元</span>
          </div>
          <div class="detailAccount">
            <span class="titleName">诊金 (患者端附加到药品金额)</span>
            <span class="tagList">{{ prescriptionInfo.consulting_gold }}元</span>
          </div>
          <div class="detailAccount">
            <span class="titleName">总计：</span>
            <span class="tagList">{{ prescriptionInfo.total_money }}元</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: "inquiryTepList",
  data() {
    return {
      total: 0, //总条数
      currPage: 1,//当前页码
      pageSize: 10, //每页条数
      tableData: [],
      dialogVisible: false,
      doctorDetails: [],
      doctor_infoList:[],
      prescriptionInfo: {},
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
    handleClick(pre_id) {
      console.log(pre_id)
      this.axios
          .post("platform/Doctorstatistics/getDoctorPrescriptionInfo", {'pre_id': pre_id})
          .then((res) => {
            this.prescriptionInfo = res.data.info
            switch (this.prescriptionInfo.status) {
              case  1:
                this.prescriptionInfo.status = '待取药'
                break;
              case  2:
                this.prescriptionInfo.status = '待审方'
                break;
              case  3:
                this.prescriptionInfo.status = '已通过'
                break;
              case  4:
                this.prescriptionInfo.status = '已抓药'
                break;
              default:
                if (this.prescriptionInfo.status === 5) {
                  this.prescriptionInfo.failure = '过期未取药'
                } else if (this.prescriptionInfo.status === 6) {
                  this.prescriptionInfo.failure = '审方不通过'
                } else if (this.prescriptionInfo.status === 7) {
                  this.prescriptionInfo.failure = '医生手动作废'
                } else if (this.prescriptionInfo.status === 8) {
                  this.prescriptionInfo.failure = '平台退款'
                }
                this.prescriptionInfo.status = '已失效'
            }
            this.dialogVisible = true
          })
    },
    init() {
      let data = {
        page: this.currPage,
        pageNumber: this.pageSize,
        doctor_id: this.doctorID
      }
      this.axios
          .post("platform/Doctorstatistics/getDoctorPrescriptionList", data)
          .then((res) => {
            this.tableData = res.data.list
            this.tableData.forEach(item => {
              item.drug_type = item.drug_type === 1 ? "颗粒" : '饮片'
              item.gold_join = item.gold_join === 0 ? "不加入" : '加入'
              item.is_show = item.is_show === 0 ? "否" : '是'
              item.pre_type = item.pre_type === 4 ? "云诊所开方" : '问诊开方'
              if (item.create_time && item.create_time !== 0) {
                item.create_time = this.dayjs(item.create_time * 1000).format('YYYY/MM/DD HH:mm')
              }else {
                item.create_time=''
              }
              switch (item.status) {
                case  1:
                  item.status = '待取药'
                  break;
                case  2:
                  item.status = '待审方'
                  break;
                case  3:
                  item.status = '已通过'
                  break;
                case  4:
                  item.status = '已抓药'
                  break;
                default:
                  if (item.status === 5) {
                    item.failure = '过期未取药'
                  } else if (item.status === 6) {
                    item.failure = '审方不通过'
                  } else if (item.status === 7) {
                    item.failure = '医生手动作废'
                  } else if (item.status === 8) {
                    item.failure = '平台退款'
                  }
                  item.status = '已失效'
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
.inquiryTepList {
  .doctorDetails {
    .titleName {
      font-weight: bold;
      padding-right: 10px;
    }

    .detailsLine {
      padding-bottom: 20px;

      .herderText {
        font-size: 18px;
        font-weight: bold;
        margin-right: 40px
      }

      .detailAccount {
        width: 350px;
        height: 25px;
        display: flex;
        justify-content: space-between;
      }
    }

    .tagList {
      margin-right: 10px;
    }

    .listBox {
      display: flex;
      padding: 10px;
      flex-wrap: wrap;

      & > div {
        width: 117px;
        height: 40px;
        line-height: 40px;
      }
    }

    .mr-6 {
      margin-left: 10px;
    }
  }
}
</style>