<template>
  <div class="certificate">
    <navBar :arrow="2">
      <p class="navTitle" slot="tabContent">查看证书</p>
    </navBar>

    <div class="content ali-c jus-c" v-if="profile.is_pass==1">
      <div class="img">
        <img :src="profile.image" alt />
      </div>
      <div class="info">
        <p>姓名：{{profile.nickname}}</p>
        <p>电话：{{profile.mobile}}</p>
        <p>单位名称：{{profile.group_name}}</p>
      </div>
    </div>

    <div class="none" v-else>
      <img src="@/assets/c_record_empty@2x.png" alt />
      <p>快去考试吧，还没有证书呢~</p>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";

import { myCenter } from "@/request/api.js";
import { Toast } from "vant";

export default {
  name: "",
  components: {
    navBar,
  },
  props: {},
  data() {
    return {
      profile: {},
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.$loading();
    myCenter().then((res) => {
      Toast.clear();
      if (res.code == 1) {

        this.profile = res.data.info;
      }
    });
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.navTitle {
  font-size: 0.48rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #343434;
}
.content {
  margin-top: 1rem;
  height: 7rem;
  background: url("~@/assets/c_bg_c@2x.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 0 1rem;
  .img {
    width: 3.1rem;
  }
  .info {
    margin-left: 0.5rem;
    p {
      font-size: 0.4rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #343434;
    }
  }
}
.none {
  text-align: center;
  width: 5rem;
  height: 3.3rem;
  margin: 0 auto;
  margin-top: 40%;
  p {
    margin-top: 0.3rem;
    font-size: 0.35rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #9a9a9a;
  }
}
</style>
