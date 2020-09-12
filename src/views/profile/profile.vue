<template>
  <div class="profile">
    <div class="bg"></div>
    <div class="profileDetail ali-c jus-b">
      <div class="avatar ali-c" >
        <img v-if="profile.avatar" :src="profile.avatar" alt />
        <img v-else src="@/assets/c_head.png" alt />
      </div>
      <div class="detail">
        <p class="userName van-ellipsis">{{profile.nickname||'未填'}}</p>
        <p class="company van-ellipsis">{{profile.group_name||'未填'}}</p>
      </div>
      <div class="data ali-c" @click="toProfileInfo">
        <p>个人资料</p>
        <img src="@/assets/c_return@2x.png" alt />
      </div>
    </div>

    <div class="bulletin ali-c jus-a" @click="article">
      <img src="@/assets/c_notice@2x.png" alt />

      <p
        class="text van-ellipsis"
        @click.stop="articleDetail"
      >{{profile.article&&profile.article[0].title||'暂无最新公告哦~'}}</p>
      <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
    </div>
    <div class="option">
      <div class="item ali-c" @click="toAnswer">
        <img src="@/assets/c_recording@2x.png" alt />
        <p>答题记录</p>
        <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
      </div>
      <div class="item ali-c" @click="toCertificate">
        <img src="@/assets/c_certificate@2x.png" alt />
        <p>查看证书</p>
        <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
      </div>
      <div class="item ali-c" @click="toOpinion">
        <img src="@/assets/c_opinion@2x.png" alt />
        <p>意见反馈</p>
        <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
      </div>
      <div class="item ali-c" @click="toSetting">
        <img src="@/assets/c_site@2x.png" alt />
        <p>设置</p>
        <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
      </div>
    </div>

    <tabBar :status="2"></tabBar>
  </div>
</template>

<script>
import { myCenter } from "@/request/api.js";

import tabBar from "@/components/tabBar/tabBar";
import { Toast } from "vant";
export default {
  name: "",
  components: { tabBar },
  props: {},
  data() {
    return {
      profile: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    //个人资料
    toProfileInfo() {
      this.$router.push("/profileInfo");
    },
    //公告列表
    article() {
      this.$router.push("/bulletin");
    },
    //公告详情
    articleDetail() {
      this.$router.push("/bulletinDetails/12");
    },
    //答题记录
    toAnswer() {
      this.$router.push("/answerRecord");
    },
    //查看证书
    toCertificate() {
      this.$router.push("/certificate");
    },
    //意见反馈
    toOpinion() {
      this.$router.push("/opinion");
    },
    //设置页
    toSetting() {
      this.$router.push("/setting");
    },
  },
  created() {
    this.$loading();
    myCenter({
      token: localStorage.getItem("user_id"),
    }).then((res) => {
      Toast.clear();

      console.log(res);
      if (res.code == 1) {
        this.profile = res.data.info;
      }
    });
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.profile {
  background-color: #f5f5f5;
  position: relative;
  height: 100vh;
  margin-bottom: 2rem;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 8rem;
    background: url("~@/assets/c_bg@2x.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .navBg {
    position: relative;
    z-index: 10;
    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .profileDetail {
    position: relative;
    top: 0.7rem;
    z-index: 50;
    height: 2rem;
    padding-top: 1rem;
    padding: 0 0.3rem;
    .avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .detail {
      flex: 1;
      width: 5.2rem;
      padding-left: 0.3rem;
      .userName {
        font-size: 0.54rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        padding-bottom: 0.3rem;
      }
      .company {
        font-size: 0.35rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }

    .data {
      height: 2rem;
      font-size: 0.35rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      img {
        width: 0.22rem;
        margin-left: 0.2rem;
      }
    }
  }

  .bulletin {
    margin-top: 1.4rem;
    padding: 0 0.2rem;
    position: relative;
    z-index: 50;
    left: 50%;
    transform: translateX(-4.6rem);
    width: 9.2rem;
    height: 1.47rem;
    background: #ffffff;
    border-radius: 0.1rem;

    img {
      width: 2rem;
    }

    .arrow {
      width: 0.2rem;
      transform: rotateY(180deg);
      margin: 0 0.1rem;
    }
    .text {
      line-height: 1.3rem;
      flex: 1;
      padding-left: 0.5rem;
    }
  }
  .option {
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgb(200, 200, 200);
    position: relative;
    left: 50%;
    transform: translateX(-4.6rem);
    margin-top: 0.4rem;
    z-index: 50;
    width: 9.2rem;
    background: #ffffff;
    border-radius: 0.21rem;
    // padding-bottom: 4rem;
    .item {
      margin: 0 0.4rem;
      height: 1.6rem;
      border-bottom: 0.02rem solid #eeeeee;
      img {
        width: 0.48rem;
      }
      p {
        flex: 1;
        font-size: 0.38rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #343434;
        margin-left: 0.3rem;
      }
      .arrow {
        width: 0.2rem;
        transform: rotateY(180deg);
        margin: 0 0.1rem;
      }
    }
  }
}
</style>
