<template>
  <div class="login">
    <div class="title">
      <p>南昌县公共机构能耗统计员</p>
      <p>上岗考试系统</p>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    // let isLogin = localStorage.getItem("token");
    // if (isLogin) {
    //   this.$router.replace("/home");
    //   console.log(1231);
    // }
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.login {
  position: relative;

  background: url("~@/assets/a_bg@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
 min-height: 100vh;

  // .bg {
  //   position: absolute;
  //   z-index: -1;
  //   top: 0;
  //   right: 0;
  //   left: 0;
  //   bottom: 0;
  // }
  .title {
    margin: 0 auto;
    padding-top: 0.57rem;
    text-align: center;
    font-size: 0.54rem;
    font-family: hzgb;
    color: #ffffff;
    font-weight: 600;
    line-height: 0.93rem;
  }
  .content {
    margin: 0 auto 0.3rem;
    margin-top: 0.6rem;
    width: 8.4rem;
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgb(200, 200, 200);
    padding: 0.7rem;
  }
}
</style>
