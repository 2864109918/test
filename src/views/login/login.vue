<template>
  <div class="Login">
    <div class="info">登录</div>
    <div class="logIn">
      <div class="options ali-c">
        <img src="@/assets/a_username@2x.png" alt />
        <input type="text" maxlength="11" v-model="tel" placeholder="请输入账号" />
      </div>
      <div class="options ali-c">
        <img src="@/assets/a_password@2x.png" alt />
        <input type="password" v-model="psd" placeholder="请输入密码" />
      </div>
      <van-button class="logIn_btn" round size="large" @click="Login" type="info">登录</van-button>
      <div class="text ali-c jus-b">
        <p>
          没有账号?
          <router-link to="/index/registered" tag="span">去注册</router-link>
        </p>
        <span @click="resetPsd">忘记密码？</span>
      </div>
    </div>

    <van-popup v-model="show">
      <div class="resetPsd">
        <img src="@/assets/img@2x.png" alt />

        <div class="close" @click="closePopup">
          <img src="@/assets/delete@2x.png" alt />
        </div>

        <div class="resetPsd_info">
          <p>忘记密码？联系管理员设置新密码吧!</p>
          <p>管理员电话：{{phone}}</p>
        </div>
        <div class="resetPsd_btn" @click="Callphone">拨打电话</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { login, indexConfig } from "@/request/api.js";

Vue.use(Toast);
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      phone: "",
      show: false,
      tel: "", // 账号
      psd: "", // 密码
    };
  },
  watch: {},
  computed: {},
  methods: {
    Login() {
      if (!this.tel) {
        Toast.fail("账号不能为空!");
        return;
      }
      if (!this.psd) {
        Toast.fail("密码不能为空!");
        return;
      }
      this.$loading();
      login({
        mobile: this.tel,
        password: this.psd,
      }).then((res) => {
        Toast.clear();
        this.$tip(res.msg);
        if (res.code == 1) {
          localStorage.setItem("userInfos", JSON.stringify(res.data.userinfo));
          localStorage.setItem("token", res.data.userinfo.token);
          this.$router.replace("/home");
        }
      });
    },
    resetPsd() {
      this.$loading();
      indexConfig().then((res) => {
        Toast.clear();
        if (res.code == 1) {
          this.phone = res.data.data.admin_tel;
          this.show = true;
        }
      });
    },

    Callphone() {
      window.location.href = "tel:" + this.phone;
    },
    closePopup() {
      this.show = false;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.Login {
  .info {
    font-size: 0.72rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #010101;
  }
  .logIn {
    margin-top: 0.4rem;
    .logIn_btn {
      margin-top: 0.2rem;
    }
  }

  .options {
    height: 1rem;
    padding: 0 0.2rem;
    margin: 0.4rem 0;
    border-bottom: 0.02rem solid #e4e4e4;
    img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.2rem;
    }
    input {
      height: 0.6rem;
      padding: 0.1rem;
      flex: 1;
    }
  }
  .text {
    margin-top: 0.3rem;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: #9a9a9a;
    span {
      color: #3e80fc;
    }
  }
  /deep/ .van-popup {
    background-color: transparent;
  }
}

.resetPsd {
  background-color: white;
  width: 8rem;
  height: 8rem;
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;

  .close {
    width: 0.64rem;
    height: 0.64rem;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
  }
  .resetPsd_info {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.4rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0.64rem;
  }

  .resetPsd_btn {
    width: 4rem;
    height: 1.07rem;
    background: #3d80fc;
    border-radius: 1rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    font-size: 0.48rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.07rem;
    text-align: center;
    &:active {
      opacity: 0.7;
    }
  }
}
</style>
