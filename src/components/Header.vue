<template>
  <div class="Head-wrap">
    <div>
      <p class="textCor">知识付费系统</p>
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
  display: flex;
  background-color: white;
  height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  .textCor{
    color: #000;
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
      font-size: 20px;
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
