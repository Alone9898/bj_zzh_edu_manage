<template>
  <div class="orderDetails">
    <span style="font-size: 16px">订单详情</span>
    <el-button @click="getBack" style="float: right"><i class="el-icon-back el-icon--left"></i>返回</el-button>
    <div style="margin-top: 20px;padding: 20px">
      <div class="box_bg" style="margin-top: 20px">
        <div class="linebox">
          <div class="circle" :class="{step:isActive>=1}">1</div>
          <div class="stepText" :class="{stepAtv:isActive>=1}">支付订单</div>
          <div class="line" :class="{step:isActive>=2}"></div>
          <div class="circle" :class="{step:isActive>=2}">2</div>
          <div class="stepText" :class="{stepAtv:isActive>=2}">药房发货</div>
          <div class="line" :class="{step:isActive>=3}"></div>
          <div class="circle" :class="{step:isActive>=3}">3</div>
          <div class="stepText" :class="{stepAtv:isActive>=3}">客户收货</div>
          <div class="line" :class="{step:isActive>=4}"></div>
          <div class="circle" :class="{step:isActive>=4}">4</div>
          <div class="stepText" :class="{stepAtv:isActive>=4}">订单完成</div>
        </div>
        <div class="timebox">
          <div>{{ orderDetailsInfo.create_time || '' }}</div>
          <div>{{ orderDetailsInfo.send_time || '' }}</div>
          <div>{{ orderDetailsInfo.completion_time || '' }}</div>
          <div>{{ orderDetailsInfo.completion_time || '' }}</div>
        </div>
        <div class="detailsLine" style="display: flex;justify-content: space-between">
          <div>
            <span class="titleName">当前订单状态：</span>
            <span>{{ orderDetailsInfo.status }}</span>
          </div>
          <div>
            <el-button type="primary" v-if="orderDetailsInfo.delivery===1" @click="search">查看物流<i class="el-icon-search el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
      <div class="detailsLine" style="margin-top: 20px">
        <span class="herderText">费用明细</span>
      </div>
      <div class="box_bg">
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">订单编号</span>
              <span>{{ orderDetailsInfo.order_sn }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">支付时间</span>
              <span>{{ orderDetailsInfo.create_time }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">用户昵称</span>
              <span>{{ orderDetailsInfo.nick_name }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">用户手机号</span>
              <span>{{ orderDetailsInfo.phone }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">处方号</span>
              <span>{{ orderDetailsInfo.pre_id }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">患者姓名</span>
              <span>{{ orderDetailsInfo.user_name }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">医生姓名</span>
              <span>{{ orderDetailsInfo.doctor_name }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detailsLine" style="margin-top: 20px">
        <span class="herderText">收货信息</span>
      </div>
      <div class="box_bg">
        <div class="detailsLine" v-if="orderDetailsInfo.delivery===1">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">收货人</span>
              <span>{{ orderDetailsInfo.consignee_name }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">联系电话</span>
              <span>{{ orderDetailsInfo.consignee_phone}}</span>
            </el-col>
            <el-col :span="9">
              <span class="titleName">收货地址</span>
              <span>{{orderDetailsInfo.province_name }}{{orderDetailsInfo.city_name }}{{orderDetailsInfo.district_name }}{{orderDetailsInfo.address }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine" v-if="orderDetailsInfo.delivery===1">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">配送方式</span>
              <span>{{ orderDetailsInfo.delivery===1?'快递':'自提' }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">快递公司</span>
              <span>{{orderDetailsInfo.company_name}}</span>
            </el-col>
            <el-col :span="8">
              <span class="titleName">快递公司（实际发货）</span>
              <span>{{orderDetailsInfo.express_name}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine" v-if="orderDetailsInfo.delivery===2">
          <el-row :gutter="20">
            <el-col :span="10">
              <span class="titleName">自提地址</span>
              <span>{{orderDetailsInfo.province_name }}{{orderDetailsInfo.city_name }}{{orderDetailsInfo.district_name }}{{orderDetailsInfo.address }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="detailsLine" v-if="orderDetailsInfo.delivery===1">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">快递单号</span>
              <span>{{orderDetailsInfo.express_no}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detailsLine" style="margin-top: 20px">
        <span class="herderText">药品信息</span>
      </div>
      <div class="box_bg" style="padding-bottom: 20px">
        <div class="detailsLine">
          <el-row :gutter="20">
            <el-col :span="6">
              <span class="titleName">剂型</span>
              <span>{{ orderDetailsInfo.drug_type }}</span>
            </el-col>
            <el-col :span="6">
              <span class="titleName">药房</span>
              <span>{{orderDetailsInfo.hospital_name}}</span>
            </el-col>
          </el-row>
        </div>
        <div style="border: 1px solid #c9cdd6" v-if="orderDetailsInfo.drug_type !=='其他'">
          <el-table
              :header-cell-style="{background:'#F5F5F5'}"
              :data="orderDetailsInfo.item_list"
              style="width: 100%">
            <el-table-column
                prop="generic_name"
                label="药品名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="item_use_level"
                label="开方量（按饮片)"
                align="center">
            </el-table-column>
            <el-table-column
                prop="dosage_unit"
                align="center"
                label="规格">
              <template slot-scope="scope">
                {{scope.row.dosage_unit===1?'袋装':'散装'}}
              </template>
            </el-table-column>
            <el-table-column
                prop="conversion"
                align="center"
                label="当量">
            </el-table-column>
            <el-table-column
                prop="price"
                align="center"
                label="单价">
            </el-table-column>
            <el-table-column
                prop="item_use_level"
                align="center"
                label="数量">
              <template slot-scope="scope">
                {{scope.row.item_use_level}}{{scope.row.item_unit}}
              </template>
            </el-table-column>
            <el-table-column
                prop="price"
                align="center"
                label="金额（元)">
              <template slot-scope="scope">
                {{(scope.row.item_use_level * scope.row.price).toFixed(4)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="border: 1px solid #c9cdd6" v-if="orderDetailsInfo.drug_type ==='其他'">
          <el-table
              :header-cell-style="{background:'#F5F5F5'}"
              :data="orderDetailsInfo.oil_item_list"
              style="width: 100%">
            <el-table-column
                prop="oil_name"
                label="膏方名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="oil_spec"
                label="规格"
                align="center">
            </el-table-column>
            <el-table-column
                prop="item_use_level"
                align="center"
                label="数量">
              <template slot-scope="scope">
                {{scope.row.item_use_level }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detailsLine" style="margin-top: 20px">
          <el-row :gutter="20">
            <el-col :span="12" >
              <span v-if="orderDetailsInfo.drug_type !=='其他'">共<span v-if="orderDetailsInfo.item_list">{{orderDetailsInfo.item_list.length}}</span>味药材，共{{ orderDetailsInfo.total_num }}剂</span>
              <span><span v-if="orderDetailsInfo.drug_type ==='其他'">共{{ orderDetailsInfo.oil_item_count }}件</span></span>
            </el-col>
            <el-col :span="12">
              <div style="float: right">
                <div class="detailsLine" style="display: flex;justify-content: space-between">
                  <div style="width: 100px">药品金额：</div>
                  <div v-if="orderDetailsInfo.drug_type !=='其他'">{{ orderDetailsInfo.drug_price }} 元</div>
                  <div v-if="orderDetailsInfo.drug_type ==='其他'">{{ orderDetailsInfo.ointment_price}} 元</div>
                </div>
                <div class="detailsLine" style="display: flex;justify-content: space-between">
                  <div style="width: 100px">诊金：</div>
                  <div>{{ orderDetailsInfo.consulting_gold }} 元</div>
                </div>
                <div class="detailsLine" style="display: flex;justify-content: space-between">
                  <div style="width: 100px">优惠金额：</div>
                  <div>- {{ orderDetailsInfo.discount_price }} 元</div>
                </div>
                <div class="detailsLine" style="display: flex;justify-content: space-between">
                  <div style="width: 100px">运费：</div>
                  <div>{{ orderDetailsInfo.freight_price }} 元</div>
                </div>
                <div class="detailsLine" style="display: flex;justify-content: space-between;padding-bottom: 0">
                  <div style="width: 100px;font-weight: bold">合计：</div>
                  <div><span class="text-Danger">{{ orderDetailsInfo.pay_money}} </span>元</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog
        title="查看物流"
        :visible.sync="logistics"
        width="20%">
     <div style="padding: 0 20px">
       <div style="padding: 10px 0">
         <span class="titleName">快递公司：</span>
         <span>{{ orderLogisticsInfo.express_name }}</span>
       </div>
       <div style="padding: 10px 0">
         <span class="titleName">快递单号：</span>
         <span>{{ orderLogisticsInfo.express_no }}</span>
       </div>
       <div style="padding: 10px 0">
         <span class="titleName">联系电话：</span>
         <span>{{ orderLogisticsInfo.express_phone }}</span>
       </div>
       <div style="margin-top: 20px">
         <el-timeline>
           <el-timeline-item
               v-for="(activity, index) in orderLogisticsInfo.logistics_list"
               :key="index"
               :color='index===1?"#4F926E":""'
               :timestamp="activity.time">
             {{activity.context}}
           </el-timeline-item>
         </el-timeline>
       </div>
     </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderDetails",
  data() {
    return {
      orderDetailsInfo: [],
      orderLogisticsInfo: [],
      logistics:false,
      isActive: 0
    }
  },
  props: {
    orderID: ''
  },
  components: {},
  methods: {
    //
    getBack() { // 返回
      this.$emit('getBack', false)
    },
    search(){
      this.axios
          .post("platform/Orderstatistics/getOrderLogisticsInfo", {'order_id': this.orderID})
          .then((res) => {
            this.orderLogisticsInfo=res.data.info
          })
      this.logistics=true
    },
    // ----------分页控制-------------,
    init() {
      this.axios
          .post("platform/Orderstatistics/getOrderInfo", {'order_id': this.orderID})
          .then((res) => {
            this.orderDetailsInfo = res.data.info
            if(this.orderDetailsInfo.create_time){
              this.orderDetailsInfo.create_time = this.dayjs(this.orderDetailsInfo.create_time * 1000).format('YYYY/MM/DD HH:mm')
              this.isActive=1
            }
            if(this.orderDetailsInfo.send_time){
              this.orderDetailsInfo.send_time = this.dayjs(this.orderDetailsInfo.send_time * 1000).format('YYYY/MM/DD HH:mm')
              this.isActive=2
            }
            if(this.orderDetailsInfo.completion_time){
              this.orderDetailsInfo.completion_time = this.dayjs(this.orderDetailsInfo.completion_time * 1000).format('YYYY/MM/DD HH:mm')
              this.isActive=4
            }
            switch (this.orderDetailsInfo.drug_type) {
              case 1:
                this.orderDetailsInfo.drug_type = '颗粒'
                break;
              case 2:
                this.orderDetailsInfo.drug_type = '饮片'
                break;
              default:
                this.orderDetailsInfo.drug_type = '其他'
            }
            switch (this.orderDetailsInfo.status){
              case 1:
                this.orderDetailsInfo.status='待发货[待审核]'
                break;
              case 2:
                this.orderDetailsInfo.status='待发货'
                break;
              case 3:
                this.orderDetailsInfo.status='待收货'
                break;
              case 4:
                this.orderDetailsInfo.status='已完成'
                break;
              case 5:
                this.orderDetailsInfo.status='已取消[不通过]'
                break;
              case 6:
                this.orderDetailsInfo.status='已取消[平台退款]）'
                break;
            }
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
.orderDetails {
  .box_bg {
    background: #EAF3EE;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    padding-bottom: 0;

    .linebox {
      height: 50px;
      display: flex;
      align-items: center;

      .circle {
        background: #ccc;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        line-height: 30px;
        text-align: center;
      }

      .line {
        width: 160px;
        height: 1px;
        margin: 0 30px;
        background: #0a0a0a;
      }

      .stepText {
        font-weight: bold;
        font-size: 16px;
        padding-left: 10px;
      }

      .step {
        background: #4F926E !important;
      }

      .stepAtv {
        color: #4F926E !important;
      }
    }

    .timebox {
      display: flex;
      padding-left: 40px;
      padding-bottom: 20px;
      div {
        margin-right: 212px;
      }
    }
  }

  .detailsLine {
    padding-bottom: 20px;
    .herderText {
      font-size: 18px;
      font-weight: bold;
      margin-right: 40px
    }

    .titleName {
      font-weight: bold;
      padding-right: 10px;
    }

    .tagList {
      margin-right: 10px;
    }

    .detailAccount {
      width: 250px;
      height: 25px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>