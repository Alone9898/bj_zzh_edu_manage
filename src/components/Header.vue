<template>
  <div class="Head-wrap">
    <div>
      <p class="textCor">歧黄数据统计中心</p>
      <div class="switchBox">
        <el-tooltip v-if="!isCollapse" class="item" effect="dark" content="收起导航栏" placement="bottom">
          <i  class="el-icon-s-fold textCor" @click="switchover(true)"></i>
        </el-tooltip>
        <el-tooltip v-if="isCollapse" class="item" effect="dark" content="展开导航栏" placement="bottom">
          <i  class="el-icon-s-unfold textCor" @click="switchover(false)"></i>
        </el-tooltip>
      </div>
    </div>
    <div>
      <el-dropdown @command="fullScreen">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="src"></el-avatar>
        <i class="el-icon-caret-bottom el-icon--right" style="font-size:18px;line-height:28px;color: #0f0f0f"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid" v-if="this.userInfo" disabled>{{ this.userInfo.group_name }}</el-dropdown-item>
          <el-dropdown-item icon="el-icon-full-screen" divided command="fullScreen">全屏</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" command="Out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      pageName: 'Head',
      fullscreen: false,
      isCollapse: true,
      userInfo: '',
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607666817517&di=20c19bd9ae260d9e4c9c39b4fbf1255d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7274e8be5b2c7f7ac56ecb34c2e45181c167ecb6d44a-feXDfj_fw658',
    };
  },
  methods: {
    switchover(i) {
      this.isCollapse = i
      this.$emit('switchover', i)
    },
    tologOut() {
      this.axios
          .post("platform/login/logout")
          .then((res) => {
            window.utils.storage.remove("userInfo");
            window.utils.storage.remove("headerToken");
            window.utils.storage.remove("exposedToken");
            this.$router.push("/");
          })
    },
    fullScreen(cm) {
      if (cm === 'fullScreen') {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            // @ts-ignore
          } else if (document.webkitCancelFullScreen) {
            // @ts-ignore
            document.webkitCancelFullScreen();
            // @ts-ignore
          } else if (document.mozCancelFullScreen) {
            // @ts-ignore
            document.mozCancelFullScreen();
            // @ts-ignore
          } else if (document.msExitFullscreen) {
            // @ts-ignore
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
            // @ts-ignore
          } else if (element.webkitRequestFullScreen) {
            // @ts-ignore
            element.webkitRequestFullScreen();
            // @ts-ignore
          } else if (element.mozRequestFullScreen) {
            // @ts-ignore
            element.mozRequestFullScreen();
            // @ts-ignore
          } else if (element.msRequestFullscreen) {
            // IE11
            // @ts-ignore
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      } else if (cm === 'Out') {
        this.tologOut()
      }
    }
  },
  mounted() {
    this.userInfo=window.utils.storage.getter("userInfo")
  },
};
</script>

<style lang="scss" scoped>
.Head-wrap {
  height: 100%;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .textCor{
    color: #000;
  }
  .switchBox {
    font-size: 24px;
    color: white;
    height: 24px;
    margin-left: 5px;
    cursor: pointer;
  }

  & > div:nth-child(1) {
    display: flex;
    align-items: center;

    img {
      width: 56px;
      height: 50px;
      margin-right: 10px;
    }

    p {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .el-dropdown {
    margin-right: 20px;
    justify-self: flex-end;

    .el-dropdown-link {
      height: 28px;
      display: flex;
      line-height: 28px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
