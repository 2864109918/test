<template>
  <div class="resetPassword">
    <navBar class="navBg" :arrow="2">
      <p class="navTitle" slot="tabContent">修改密码</p>
    </navBar>

    <div class="from">
      <div class="oldPass">
        <span>原密码</span>
        <input type="password" v-model="oldPass" placeholder="请输入原密码" />
      </div>
      <div class="newPass btop">
        <span>新密码</span>
        <input type="password" v-model="newPass" placeholder="请输入新密码" />
      </div>
      <div class="confirmPass btop">
        <span>确认密码</span>
        <input type="password" v-model="confirmPass" placeholder="请输入确认密码" />
      </div>
    </div>
    <div class="btn" @click="confirm">确定</div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import { Toast } from "vant";

import { changePsd } from "@/request/api.js";
export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return { oldPass: "", newPass: "", confirmPass: "" };
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      if (this.oldPass == "") {
        Toast("原密码不能为空！");
        return;
      }
      if (this.newPass == "") {
        Toast("新密码不能为空！");
        return;
      }
      if (this.confirmPass == "") {
        Toast("确认密码不能为空！");
        return;
      }
      if (this.newPass.length < 6) {
        Toast("新密码不能低于六位！");
        return;
      }
      if (this.newPass !== this.confirmPass) {
        Toast("新密码和确认密码不一致！");
        return;
      }

      changePsd({
        original_password: this.oldPass,
        password: this.newPass,
        confirm_password: this.confirmPass,
      }).then((res) => {
        if (res.code == 1) {
          Toast.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.resetPassword {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(52, 52, 52, 1);
     .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
    }

  .from {
    margin-top: 0.2rem;
    background: rgba(255, 255, 255, 1);
    div {
      padding: 0 0.3rem;
      height: 1.3rem;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        flex: 7;
      }
      span {
        flex: 2;
      }
    }
  }
  .btn {
    width: 80%;
    height: 1rem;
    background: rgba(2, 118, 255, 1);
    border-radius: 0.5rem;
    margin: 0 auto;
    text-align: center;
    color: white;
    line-height: 1rem;
    margin-top: 0.5rem;
    &:active {
      opacity: 0.8;
    }
  }
}
.navBg {
  background-color: white;
}
.btop {
  border-top: 0.03rem solid #f5f5f5;
}
</style>
