<template>
  <div class="reviewFail">
    <img class="bg" src="@/assets/audit_bg_png@2x.png" alt />
    <navBar>
      <p class="title" slot="tabContent">审核结果</p>
    </navBar>

    <div class="info">
      <div class="img">
        <img src="@/assets/audit_failure_png@2x.png" alt />
      </div>
      <p v-html="msg">原因:您的审核未通过</p>
    </div>

    <div class="btn" @click="apply">重新申请</div>
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
    apply() {
      this.$router.replace("/index/registered");
    },
  },
  created() {
    this.msg = this.$route.query.msg;
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.reviewFail {
  position: relative;
  height: 100vh;
  // background-color: #3e80fc;
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  .title {
    font-size: 0.46rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
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
  }
  .btn {
    margin: 0 auto;
    margin-top: 0.7rem;
    width: 2.4rem;
    height: 1rem;
    border: 0.02rem solid #3e80fc;
    border-radius: 1rem;
    text-align: center;
    color: #3e80fc;
    line-height: 1rem;
    &:active {
      opacity: 0.7;
    }
  }
}
</style>
