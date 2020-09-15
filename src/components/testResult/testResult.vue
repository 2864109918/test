<template>
  <div class="result">
    <img src="@/assets/b_bg_c@2x.png" alt />
    <div class="result_detail">
      <div class="result_text jus-b ali-c">
        <img src="@/assets/b_label_left@2x.png" alt />
        <span v-if="result.is_pass==1">本次考试成功</span>
        <span v-else>本次考试失败</span>
        <img src="@/assets/b_label_left@2x.png" alt />
      </div>

      <div class="result_img">
        <img v-if="result.is_pass==1" src="@/assets/b_success@2x.png" alt />

        <img v-else src="@/assets/b_fail@2x.png" alt />
      </div>

      <div class="result_content ali-c jus-a">
        <div>
          <p>{{result.score}}</p>
          <p>考试分</p>
        </div>

        <div>
          <p>{{result.wrong_question}}</p>
          <p>错题数</p>
        </div>

        <div>
          <p>{{result.probabilityCorrect}}</p>
          <p>正确率</p>
        </div>

        <div>
          <p>{{result.operating_time}}</p>
          <p>用时</p>
        </div>
      </div>

      <div class="result_btn" v-if="result.is_pass==1" @click="i_know">我知道了</div>

      <div class="result_btn" v-if="result.is_pass==0" @click="restartTest">再考一次</div>

      <!-- <div class="result_btn">申请考试</div> -->
    </div>
  </div>
</template>

<script>
import { getstate } from "@/request/api.js";
export default {
  name: "",
  components: {},
  props: {
    result: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    //我知道了
    i_know() {
      this.$router.go(0);
    },
    //再考一次
    restartTest() {
      console.log(1321);

        getstate({}).then((res) => {
          if (res.code == 1) {
            console.log(res);
            //不可以考试
            if (res.data.status == "need_apply") {
              //需要申请考试
              this.applyShow = true;
            } else if (res.data.status == "success") {
              //已经通过考试
              Dialog.alert({
                message: res.data.msg,
              }).then(() => {
                this.$router.replace("/profile");
              });
            } else if (res.data.status == "need_wait") {
              //已申请待审核状态
              Dialog.alert({
                message: res.data.msg,
              }).then(() => {
                this.$router.replace("/profile");
              });
            } else if (res.data.status == "can") {
              this.$router.go(0);
            }
          } else {
            Toast(res.data.msg);
            // this.$router.go(0)
          }
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.result {
  // position: absolute;
  z-index: 1;
  width: 9rem;
  margin: 0 auto;
  margin-top: -1rem;
  .result_detail {
    position: relative;
    z-index: 5;
    top: 1.35rem;
    width: 85%;
    margin: 0 auto;
    margin-top: -2rem;
    height: 10.94rem;
    background: rgb(255, 255, 255);
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    .result_text {
      width: 60%;
      margin: 0 auto;
      // width: 2.52rem;
      height: 1.5rem;
      font-size: 0.43rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
      line-height: 0.44rem;
      img {
        width: 0.4rem;
      }
    }
    .result_img {
      width: 60%;
      margin: 0 auto;
      margin-top: 0.2rem;
    }
    .result_content {
      width: 95%;
      height: 2rem;
      margin: 0 auto;
      margin-top: 1rem;
      background: url("~@/assets/b_bg_a@2x.png");
      background-size: 100%;
      background-repeat: no-repeat;
      text-align: center;
      color: white;

      font-size: 0.35rem;
      font-family: DINCond-Bold;
      font-weight: 400;
      color: #fefefe;
      line-height: 0.44rem;
    }
    .result_btn {
      width: 3.39rem;
      height: 1.07rem;
      background: #3e80fc;
      border-radius: 1rem;
      color: white;

      margin: 0 auto;
      margin-top: 0.8rem;
      font-size: 0.43rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.07rem;
      text-align: center;
      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
