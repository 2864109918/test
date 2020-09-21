<template>
  <div class="certificate">
    <navBar class="van-hairline--bottom" :arrow="2">
      <p class="navTitle" slot="tabContent">查看证书</p>
    </navBar>

    <div id="canvas" class="content ali-c jus-c" @click="getCanvas" v-if="!fromCanvas">
      <img class="zsBG" src="@/assets/zsBG.png" alt />

      <div class="profile">
        <div class="details ali-c jus-b">
          <div class="info">
            <div class="name ali-c">
              <span class="i">姓名</span>：
              <span class="t">{{profile.nickname}}</span>
            </div>
            <div class="birth ali-c">
              <span class="i">出生日期</span>：
              <span class="t">{{birthday}}</span>
            </div>
            <div class="companyName ali-c">
              <span class="i">单位名称</span>：
              <!-- <span class="t">南昌嘉瑞科技发展有限公司</span> -->
              <span class="t">{{profile.group_name}}</span>
            </div>
          </div>
          <div class="img scale">
            <img :src="profile.image" id="userImg" alt />
          </div>
        </div>
        <div class="poio ">已通过2020年度南昌县公共机构能耗统计员资格考试，特发此证。</div>
        <div class="sumin ali-c scale">
          <div class="flex1"></div>
          <div>
            <p>南昌县公共机构节能领导小组办公室</p>
            <p>颁发日期：{{profile.passtime}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="fromCanvas" v-if="fromCanvas">
      <img :src="fromCanvas" alt />
    </div>

    <!-- <div class="none" v-else>
      <img src="@/assets/c_record_empty@2x.png" alt />
      <p>快去考试吧，还没有证书呢~</p>
    </div>-->
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";

import { myCenter } from "@/request/api.js";
import { Toast } from "vant";

import html2canvas from "html2canvas";

export default {
  name: "",
  components: {
    navBar,
  },
  props: {},
  data() {
    return {
      profile: {},
      fromCanvas: "", //绘制好的图片
      timmer: '',
    };
  },
  watch: {},
  computed: {
    birthday() {
      let arr =
        (this.profile.birthday && this.profile.birthday.split("-")) || [];
      return (arr[0] || "0000") + "年" + (arr[1] || "00") + "月";
    },
  },
  beforeDestroy() {
    clearInterval(this.timmer)
  },
  methods: {
    getCanvas(){
      let a = document.getElementById("userImg");
      this.timmer = setInterval(() =>{
        if(a.compelete){
          html2canvas(document.getElementById("canvas"), {
            allowTaint: false,
            useCORS: true,
            async: false,
          }).then((res) => {
            let imgUrl = res.toDataURL();
            this.fromCanvas = imgUrl;
            clearInterval(this.timmer)
          });
        }
      },20)
    },
  },
  created() {
    this.$loading();
    let that = this;
    myCenter()
      .then((res) => {
        Toast.clear();
        if (res.code == 1) {
          this.profile = res.data.info;
          if (this.profile.is_pass == 1) {
          }
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
  .zsBG {
    width: 9rem;
  }
  .profile {
    position: absolute;
    top: 1.8rem;
    left: 50%;
    right: 0;
    transform: translateX(-4.5rem);
    padding: 0 1.8rem;
    padding-top: 0.3rem;
    width: 9rem;
    .info {
      flex: 1;
      >div {
        padding: 0.1rem 0;
        font-size: 0.15rem;
        font-weight: 600;
        .i {
          text-align-last: justify;
          -moz-text-align-last: justify; //兼容firefox
          text-align: justify;
          text-justify: distribute-all-lines; //兼容ie
          display: block; //ie下需设为block
          min-width: 0.8rem;
        }
        .t {
          width: 2.3rem;
          display: inline-block;
          padding: 0 0.2rem;
          padding-bottom: 0.05rem;
          border-bottom: 0.01rem solid;
        }
      }
    }
    .img {
      width: 1.5rem;
    }
  }

  .poio {
    font-size: 0.18rem;
    line-height: 0.5rem;
    text-align: left;
    // padding-bottom: 1rem;
    font-weight: 600;
  }
  .sumin {
    float: right;
    padding-top: 0.2rem;
    // padding-left: 1rem;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.2rem;
    transform: scale(0.55) translateX(1.5rem);
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
.fromCanvas{
  margin-top: 1rem;
}

.scale {
  transform: scale(0.7);
}
</style>
