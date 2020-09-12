<template>
  <div class="applying">
    <img class="bg" src="@/assets/audit_bg_png@2x.png" alt />
    <div class="top_box">
      <div class="top_area flex">
        <div class="flex1 flex" @click="back">
          <img src="@/assets/b_return@2x.png" alt />
        </div>
        <p class="title">审核结果</p>
        <div class="flex1"></div>
      </div>
    </div>

    <div class="info">
      <div class="img">
        <img src="@/assets/audit_png@2x.png" alt />
      </div>

      <div class="text">
        <p v-html="msg">正在审核中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";

export default {
  name: "",
  components: {
    navBar,
  },
  props: {},
  data() {
    return {
      msg: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    back() {
      this.$router.replace("/index/login");
    },
  },
  created() {
    this.msg = this.$route.query.msg;
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.applying {
  position: relative;
  height: 100vh;
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  .top_box {
    height: 1.3rem;
    .top_area {
      width: 100%;
      max-width: 750px;
      height: 1.3rem;
      margin: 0 auto;
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      right: 0;
      background-color: transparent;
      img {
        width: 0.3rem;
        height: 0.55rem;
        margin: auto;
      }
    }
  }
  .title {
    font-size: 0.46rem;
    font-family: PingFang SC;
    line-height: 1.3rem;
    text-align: center;
    font-weight: 500;
    color: #ffffff;
    flex: 3;
  }
  .info {
    margin-top: 1.4rem;
    .img {
      margin: 0 auto;
      width: 2.8rem;
    }
    p {
      margin-top: 3.5rem;
      text-align: center;
      font-size: 0.4rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #343434;
      line-height: 0.48rem;
    }
    .text {
      width: 70%;
      margin: 0 auto;
    }
  }
}
</style>
