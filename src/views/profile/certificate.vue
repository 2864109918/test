<template>
  <div class="certificate">
    <navBar :arrow="2">
      <p class="navTitle" slot="tabContent">查看证书</p>
    </navBar>

    <div class="content ali-c jus-c" v-if="profile.is_pass==1">
      <img src="@/assets/zsBG.png" alt />

      <div class="profile">
        <div class="details ali-c jus-b">
          <div class="info">
            <div class="name ali-c">
              <span class="i">姓 名</span>：
              <span class="t">{{profile.nickname}}</span>
            </div>
            <div class="birth ali-c">
              <span class="i">出 生 日 期</span>：
              <span class="t">{{birthday}}</span>
            </div>
            <div class="companyName ali-c">
              <span class="i">单 位 名 称</span>：
              <span class="t">{{profile.group_name}}</span>
            </div>
          </div>
          <div class="img">
            <img :src="profile.image" alt />
          </div>
        </div>
        <p class="poio">已通过2020年度南昌县公共机构能耗统计员资格考试，特发此证。</p>
        <div class="sumin ali-c">
          <div class="flex1"></div>
          <div>
            <p>南昌县公共机构节能领导小组办公室</p>
            <p>颁发日期：{{profile.passtime}}</p>
          </div>
        </div>
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
  computed: {
    birthday() {
      let arr = this.profile.birthday && this.profile.birthday.split("-");
      return (arr[0] || "0000") + "年" + (arr[1] || "00") + "月";
    },
  },
  methods: {},
  created() {
    this.$loading();
    myCenter()
      .then((res) => {
        Toast.clear();
        if (res.code == 1) {
          this.profile = res.data.info;
        }
      })
      .catch((err) => {
        Toast.clear();
        Toast.fail("网络出现问题,请检查网络！");
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
  width: 100%;
  margin-top: 1rem;
  position: relative;
  .profile {
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
    padding: 0 1.8rem;
    padding-top: 0.3rem;
    // height: 5rem;
    width: 100%;
    .info {
      flex: 1;
      div {
        padding: 0.1rem 0;
        font-size: 0.2rem;

        .i {
          text-align-last: justify;
          -moz-text-align-last: justify; //兼容firefox
          text-align: justify;
          text-justify: distribute-all-lines; //兼容ie
          display: block; //ie下需设为block
          width: 1rem;
        }

        .t {
          width: 2rem;
          display: inline-block;
          padding: 0 0.2rem;
          padding-bottom: 0.03rem;
          border-bottom: 0.01rem solid;
        }
      }
    }
    .img {
      width: 1.5rem;
    }
  }

  .poio {
    font-size: 0.3rem;
    margin-top: 0.4rem;
    line-height: 0.5rem;
    text-align: center;
    // padding-bottom: 1rem;
    font-weight: 600;
  }
  .sumin {
    padding-top: 0.2rem;
    padding-left: 1rem;
    line-height: 0.4rem;
    font-size: 0.2rem;
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
