<template>
  <div class="setting">
    <navBar class="navBg" :arrow="2">
      <p class="navTitle" slot="tabContent">设置</p>
    </navBar>

    <div class="options">
      <div class="option ali-c jus-b" @click="toResetPsd">
        <p>修改密码</p>
        <img src="@/assets/c_return_a@2x.png" alt />
      </div>
    </div>
    <div class="options" @click="outLogin">
      <div class="option outLogin">
        <p>退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Toast } from "vant";
Vue.use(Dialog);

import { loginOut } from "@/request/api.js";

import navBar from "@/components/navBar/navBar";
export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    //修改密码
    toResetPsd() {
      this.$router.push("/resetPassword");
    },
    //   退出登录
    outLogin() {
      Dialog.confirm({
        message: "你确定要退出登录吗？",
      }).then(() => {
        let isLogin = localStorage.getItem("token");

        if (isLogin) {
          loginOut().then((res) => {
            console.log(res);
            if (res.code == 1) {
              Toast.success("退出登录成功！");
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.$router.replace("/index/login");
              }, 1500);
            } else {
              Toast.success("退出登录成功！");
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.$router.replace("/index/login");
              }, 1500);
            }
          });
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.setting {
  background-color: #f2f2f2;
  height: 100vh;
  .navBg {
    background-color: white;
    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
    }
  }
  .options {
    margin-top: 0.2rem;
    .option {
      height: 1.33rem;
      background: #ffffff;
      padding: 0 0.5rem;
      &:active {
        opacity: 0.8;
      }
      img {
        width: 0.16rem;
        transform: rotateY(180deg);
      }
    }
  }
  .outLogin {
    margin-top: 0.6rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 1.33rem;
    text-align: center;
  }
}
</style>
