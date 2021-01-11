<template>
  <div class="Workbench">
    <el-row :gutter="20">
<!--      <el-col :span="6">-->
<!--        <div>已认证医生总数</div>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <div>已认证医生总数</div>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <div>注册用户总数</div>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <div>已登记患者总数</div>-->
<!--      </el-col>-->
    </el-row>
    <el-row>
      <el-col :span="12">
        <div ref="mis3" style="width:100%;height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div ref="mis2" style="width:100%;height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div ref="main" style="width:100%;height:300px;"></div>
      </el-col>
      <el-col :span="12">
        <div ref="mis4" style="width:100%;height:300px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// // 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/aria'
import 'echarts/lib/component/legend'

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
    drawLine() {
      this.myChart = echarts.init(this.$refs.main);
      this.mis2 = echarts.init(this.$refs.mis2);
      this.mis3 = echarts.init(this.$refs.mis3);
      this.mis4 = echarts.init(this.$refs.mis4);
// 绘制图表
      this.myChart.setOption({
        title: {
          text: '医生数量统计',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 24
          }

        },
        tooltip: {},
        aria: {
          show: true
        },
        xAxis: {
          data: ['2020-12-20', '2020-12-21', '2020-12-22', '2020-12-23', '2020-12-24', '2020-12-25']
        },
        yAxis: {},
        series: [{
          name: '增长数',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
      this.mis2.setOption(
          {
            title: {
              text: '用户性格分析',
              left: 'center',
              top: 20,
              textStyle: {
                fontSize: 24
              }

            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  {value: 460, name: '浪漫'},
                  {value: 380, name: '动作'},
                  {value: 324, name: '文艺'},
                  {value: 265, name: '喜剧'},
                  {value: 230, name: '其他'}
                ].sort(function (a, b) {
                  return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                  fontSize: 14
                },
                labelLine: {
                  smooth: 0.2,
                  length: 20,
                  length2: 100
                },
                itemStyle: {
                  color: '#c23531',
                  shadowBlur: 20,
                  shadowColor: 'rgba(91, 12, 10, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          }
      );
      this.mis3.setOption(
          {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['登录次数', '最近接诊', '最近开方', '发布公告', '患者新增']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '登录次数',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '最近接诊',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '最近开方',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '发布公告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '患者新增',
                type: 'line',
                stack: '总量',
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
      );
      this.mis4.setOption(
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  {value: 1048, name: '用户活跃度'},
                  {value: 735, name: '用户点击'},
                  {value: 580, name: '用户回访'},
                  {value: 484, name: '用户流失度'},
                ]
              }
            ]
          }
      )
    }
  },
  mounted() {
    //
    this.drawLine()
    window.onresize = () => {
      return (() => {
        this.myChart.resize();
        this.mis2.resize();
        this.mis3.resize();
        this.mis4.resize();
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
.Workbench {
  .dataCard {
    background: red;
    //border-radius: 4px;
    //text-align: center;
  }
}
</style>