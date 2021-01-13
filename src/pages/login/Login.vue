<template>
  <div>
    <img src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/khwyrhmg0bshiiavgi9w.png" alt="小鹅通"
         title="小鹅通" class="logo">
    <div class="login-wrapper">
      <div class="login-bg">
        <img
            src="https://pics3.baidu.com/feed/38dbb6fd5266d0161be06409b6ba0f0234fa35a8.jpeg?token=09fd7fa4e140e6777b683eaf75021886&s=F71A14C7C42210BCB388CCAA03007019"
            alt="">
      </div>
      <div class="login-container">
        <div class="account-title">
          <p class="account-title-item"  @click="tab(1)" :class="{'account-title-active':active===1}">
            密码登录
            <span class="account-title-line"></span>
          </p>
          <p class="account-title-item" @click="tab(2)" :class="{'account-title-active':active===2}">
            验证码登录
            <span class="account-title-line"></span>
          </p>
        </div>
        <div v-if="active===1">
          <el-form
              label-position="top"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="myform"
          >
            <el-form-item prop="phone" label="手机号/帐号">
              <el-input
                  v-model="ruleForm.phone"
                  type="text"
                  clearable
                  placeholder="请输入您的手机号/帐号"
                  maxlength="11"
                  size="medium"
                  @keydown.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" label="密码">
              <div class="between flex">
                <el-input
                    type="password"
                    show-password
                    v-model="ruleForm.pass"
                    placeholder="请输入密码"
                    @keydown.enter.native="submitForm('ruleForm')"
                    size="medium"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
          <p class="account-operate">忘记密码？</p>
        </div>
        <div v-if="active===2">
          <el-form
              label-position="top"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="myform"
          >
            <el-form-item prop="phone" label="手机号/帐号">
              <el-input
                  v-model="ruleForm.phone"
                  type="text"
                  clearable
                  placeholder="请输入您的手机号/帐号"
                  maxlength="11"
                  size="medium"
                  @keydown.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-input
                  v-model="ruleForm.verificationCode"
                  type="text"
                  placeholder="短信验证码"
                  autocomplete="off"
                  clearable
                  maxlength="6"
                  size="medium"
              >
                <el-button
                    slot="suffix"
                    type="text"
                    class="send-code"
                    :disabled="disabledSendVerifyBtn"
                    @click="sendVerifyCode"
                    size="medium"
                >{{ sendVerifyBtnText }}</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="loginBtn"
            size="medium">登 录
        </el-button>
        <p class="verify-des">
          还没账号？
          <a href="javascript:void(0)">立即注册</a></p>
      </div>
    </div>
    <div class="bottom">
      <a href="http://www.beian.miit.gov.cn/" style="color: #999">
        粤ICP备15020529号
      </a>
      Copyright © 2015-2020 深圳小鹅网络技术有限公司 All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validCode = (rule, value, callback) => {
      if (value != "") {
        if (!this.checkCode()) {
          callback(new Error("请输入正确的验证码"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        phone: this.$route.query.phone || "",
        pass: "",
      },
      rules: {
        phone: [{required: true, trigger: "blur", message: "请输入您的手机号/帐号"}],
        pass: [{required: true, message: "请输入密码", trigger: "blur"}],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      active:1,
      remainTimes:0,
    };
  },
  computed: {
    disabledSendVerifyBtn: function () {
      return this.remainTimes > 0;
    },
    sendVerifyBtnText: function () {
      if (this.remainTimes > 0) {
        return "重新发送" + this.remainTimes + "s";
      } else {
        return "发送验证码";
      }
    },
  },
  mounted() {
  },
  methods: {
    tab(i){
      this.active=i
    },
    //发送验证码
    sendVerifyCode() {
      this.$message.success("验证码已发送"), this.startTimer(120);
      const telephone = this.ruleForm.telephone;
      if (telephone !== "" && isPhone(telephone)) {
        // 发送验证码
        let data = {
          msg_type: 1,
          phone: telephone,
        };
        const loading = this.$loading();
        this.axios
            .post("store/Platform/sendMsg", data)
            .then((res) => {
              // 弹框提示
              if (res.code === 0) {
                this.$message.success("验证码已发送"), this.startTimer(120);
              }
            })

            .finally(() => {
              loading.close();
            });
      } else {
        this.$refs.ruleForm.validateField("telephone");
      }
    },
    //验证码倒计时
    startTimer(times) {
      this.remainTimes = times;
      let setInterval = window.setInterval(() => {
        if (this.remainTimes > 0) {
          this.remainTimes--;
        } else {
          window.clearInterval(setInterval);
        }
      }, 1000);
    },
    submitForm() {
      this.$router.push('/home/workbench')
    },
    //验证码登录
  },
};
</script>

<style lang="scss">
.login-wrapper {
  .el-form-item--small .el-form-item__label {
    font-weight: bold;
  }

  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 3%;
  left: 2%;
  z-index: 1;
  width: 119px;
  cursor: pointer;
}

.login-wrapper {
  width: 1000px;
  height: 550px;
  position: absolute;
  top: calc(50% - 275px);
  left: calc(50% - 500px);
  display: flex;

  .login-bg {
    position: relative;
    width: 480px;
    height: 100%;
  }

  .login-container {
    width: 520px;
    height: 100%;
    padding: 40px 70px;
    background: white;
    box-sizing: border-box;
    position: relative;

    .account-title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 64px;

      .account-title-item {
        position: relative;
        margin: 0 29px;
        font-size: 18px;
        color: #999;
        font-weight: 500;
        cursor: pointer;
      }
      .account-title-line {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 0;
        height: 2px;
        transition: all 0.2s linear;
      }
      .account-title-active {
        color: #333;
        .account-title-line {
          width: 40px;
          background-color: #105CFB;
        }
      }
    }
  }
  .account-operate {
    text-align: right;
    cursor: pointer;
  }
  .verify-des {
    text-align: center;
    padding-top: 20px;
    color: #666;
    font-size: 13px;
    a {
      color: #105cfb;
      font-size: 13px;
      text-decoration:none
    }
  }
  .loginBtn {
    margin-top: 40px;
    box-sizing: border-box;
    bottom: 125px;
    width: 380px;
    height: 56px;
    font-size: 16px;
    text-align: center;
    border: none;
    border-radius: 28px;
    color: #fff;
    background-color: #105cfb;
    outline: none;
  }
}


.myform {
  margin-top: 35px;
}

.codeInput {
  width: 209px;
}
.bottom {
  width: 100%;
  height: 58px;
  line-height: 58px;
  font-size: 12px;
  color: #999;
  position: absolute;
  bottom: 3.6%;
  text-align: center;
}

@keyframes mymove {
  0% {
    width: 0px;
    right: 0;
    height: 5px;
  }
  50% {
    width: 420px;
  }
  80% {
    width: 420px;
    right: 12%;
  }
  100% {
    height: 440px;
    right: 10%;
  }
}
</style>
