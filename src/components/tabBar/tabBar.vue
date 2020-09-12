<template>
  <div class="tabBar jus-c ali-c" style="max-width:750px;margin:0 auto;">
    <div class="answer" @click="toAnswer">
      <div v-if="status==1" class="answer_active ali-c jus-c">
        <img src="@/assets/answer_sel@2x.png" alt />
        <p>答题</p>
      </div>
      <div v-else class="answer_unactive ali-c jus-c">
        <img src="@/assets/answer_def@2x.png" alt />
        <p class="no_active">答题</p>
      </div>
    </div>
    <div class="profile" @click="toProfile">
      <div v-if="status==2" class="answer_active ali-c jus-c">
        <img src="@/assets/my_sel@2x.png" alt />
        <p>我的</p>
      </div>
      <div v-else class="answer_unactive ali-c jus-c">
        <img src="@/assets/my_def@2x.png" alt />
        <p class="no_active">我的</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    //1为答题页  2为我的
    status: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    toAnswer() {
      let path = this.$route.path;
      if (path !== "/home") {
        this.$router.push("/home");
      }
    },
    toProfile() {
      let path = this.$route.path;
      if (path !== "/profile") {
        this.$router.push("/profile");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;

  height: 1.3rem;
  z-index:2300;
  background: #ffffff;
  div {
    flex: 1;
    height: 1.31rem;
    flex-wrap: wrap;
    text-align: center;
    img {
      width: 0.52rem;
      height: 0.56rem;
    }
    p {
      font-size: 0.27rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #3e80fc;
      width: 100%;
    }
  }

  .no_active {
    color: #787878 !important;
  }
}
</style>
