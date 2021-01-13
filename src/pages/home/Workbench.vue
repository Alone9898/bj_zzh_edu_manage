<template>
  <div class="Workbench flex">
    <div class="bgWhite">
      <div class="mb22">今日收入(元)</div>
      <div class="gray fs36">2,560.00</div>
    </div>
    <div class="bgWhite">
      <div class="mb22">今日付费用户</div>
      <div class="gray fs36">5</div>
    </div>
    <div class="pd0">
      <div class="bgWhite data-overview-item-pay mb16">
        <div class="mb8">总付费用户</div>
        <div class="gray fs24">2,560.00</div>
      </div>
      <div class="bgWhite data-overview-item-pay">
        <div class="mb8">可提现金额(元)</div>
        <div class="gray fs24">40,5600.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Workbench",
  data() {
    return {
      myChart: '',
    }
  },
  component: {
    //someComponent
  },
  methods: {
    //
  },
  mounted() {
    //
  }
}
</script>

<style lang="scss" scoped>
.Workbench {
  &>div{
    width: 33%;
    margin-right: 16px;
    padding: 24px 20px 16px;
  }
  &>div:nth-child(3){
    padding: 0;
  }
  .gray:hover{
    color: #105CFB;
    cursor: pointer;
    transition: color 0.3s;
  }
  .data-overview-item-pay{
    padding: 12px 16px 10px;
  }
}
</style>