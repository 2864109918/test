<template>
  <div class="home" style="max-width:750px;margin:0 auto;">
    <!-- 顶部栏 -->
    <navBar class="nav" :arrow="3">
      <p class="navTitle" slot="tabContent">{{navTitle}}</p>
    </navBar>
    <van-count-down
      v-if="time"
      :auto-start="false"
      class="CountDown"
      @finish="timeOut"
      :time="time"
      ref="countDown"
    />
    <!-- 背景图 -->
    <div class="bg_img"></div>

    <div
      class="test"
      @click.once="startTime"
      v-if="questionList.length&&!Object.keys(result).length"
    >
      <div class="title ali-c">
        <div class="leftTitle ali-c">
          <img src="@/assets/b_label@2x.png" alt />
          <p v-if="indexQuestion.typedata == 1">单选题</p>
          <p v-if="indexQuestion.typedata == 2">多选题</p>
          <p v-if="indexQuestion.typedata == 4">分析题</p>
        </div>
        <div class="count ali-c">
          <span class="n">{{index + 1}}</span>
          <span class="c">/{{questionList.length}}</span>
        </div>
      </div>

      <!-- 题目组件参数说明： 题目信息  答案信息(等待确认事件发生后传递)  现在题目序号  key(必须要有kye，不然会组件复用) -->
      <div v-if="indexQuestion.typedata==1||indexQuestion.typedata==2">
        <choice
          :testData="indexQuestion"
          :answerInfo="answerInfo"
          :key="indexQuestion.id"
          :testIndex="index"
          @selectEvent="selectEvent"
        ></choice>
      </div>

      <div v-if="indexQuestion.typedata==4">
        <analysisChoice
          :testData="indexQuestion"
          :answerInfo="answerInfo"
          :key="indexQuestion.id"
          :testIndex="index"
          @selectEvent="selectEvent"
        ></analysisChoice>
      </div>
      <div class="btn ali-c">
        <div class="a"></div>
        <div class="confirm" @click="confirm" v-if="btnShow&&!nextShow">确定</div>
        <div
          class="confirm"
          @click="nextQues"
          v-else-if="nextShow&&index+1!==questionList.length"
        >下一题</div>
        <div class="confirm" @click="submitTest" v-if="submitShow">完成</div>
      </div>
    </div>

    <testResult v-if="Object.keys(result).length" @getStatus="getData" :result="result"></testResult>

    <van-popup :close-on-click-overlay="false" v-model="applyShow">
      <div class="applyTest">
        <p>申请考试</p>
        <div class="applyInput ali-c">
          <input type="text" v-model="applyName" placeholder="请输入您的姓名" />
          <input type="tel" v-model="applyPhone" maxlength="11" placeholder="请输入您的手机号" />
        </div>
        <div class="applyBtn" @click="applyTest">提交申请</div>
      </div>
    </van-popup>

    <tabBar class="van-hairline--top" :status="1"></tabBar>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Dialog, CountDown } from "vant";
import {
  getstate,
  getQues,
  upAnsw,
  submit,
  answerApply,
} from "@/request/api.js";
import navBar from "@/components/navBar/navBar"; //顶部文字
import tabBar from "@/components/tabBar/tabBar"; //底部按钮

import choice from "@/components/choice/choice"; //题目组件
import analysisChoice from "@/components/analysisChoice/analysisChoice"; //分析题
import testResult from "@/components/testResult/testResult"; //考试结果组件

Vue.use(Toast, Dialog, CountDown);
export default {
  name: "home",
  components: {
    navBar,
    tabBar,
    choice,
    analysisChoice,
    testResult,
    "van-count-down": CountDown,
  },
  data() {
    return {
      //------------------题目------------------------
      questionList: [], // 所有题目列表
      index: 0, //索引值
      selectAnswer: {}, //<<<<<<<<<<<<已选答案，子组件发射事件触发赋值，存储一个对象：题目ID 题目类型 题目已选答案 >>>>>>>>>>>>>
      //------------------答案------------------------
      answerInfo: {}, //此题题目答案
      submitShow: false, //完成按钮显示
      //------------------计分------------------------
      correct_number: 0, // 答对题数
      allScore: 0, //答对一题就加累计分数
      //------------------导航栏文字-----------------------
      navTitle: "在线考试",
      //------------------是否可以答题-----------------------
      testStatus: "", //padding账号待审核 need_apply失败两次需要重新申请 success已经通过考试不需要再考 fali考试失败不允许再考
      applyShow: false, //申请框显示
      applyName: "", //申请人名字
      applyPhone: "", //申请人手机号
      //------------------倒计时------------------------
      Timing: "", //答题规定时间,单位为分钟,从服务器获取，为空就不限制时间
      isTest: false, //现在是否处于考试，只要点击选项将会设置为true，倒计时也会开始      这个为true跳转时候会提醒确定离开考试
      testStartTime: 0, //考试开始时间
      testEndTime: 0, //考试结束时间
      //------------------考试结果------------------------
      result: {}, //考试结果
    };
  },
  watch: {},
  computed: {
    //计算倒计时
    time() {
      if (this.Timing) {
        return Number(this.Timing) * 60 * 1000;
      } else {
        return 0;
      }
    },
    //btn展示
    btnShow() {
      if (this.selectAnswer.testType == 1) {
        //单选题必须选一个答案
        return this.selectAnswer.select.length == 1 ? true : false;
      } else if (this.selectAnswer.testType == 2) {
        //多选题必须选两个答案
        return this.selectAnswer.select.length >= 1 ? true : false;
      } else if (Array.isArray(this.selectAnswer)) {
        return this.selectAnswer.every((v) => v.select.length >= 1);
      }
    },
    //下一题按钮展示
    nextShow() {
      return Object.keys(this.answerInfo).length > 1 ? true : false;
    },
    //当前题目内容
    indexQuestion() {
      return this.questionList[this.index];
    },
  },
  methods: {
    // 获取数据
    getData() {
      this.$loading();
      return getstate().then((res) => {
        if (res.code == 1) {
          console.log(res.data);
          Toast.clear();
          if (res.data.status == "pending") {
            //账号正在审核状态
            this.$router.replace({
              path: "/applying",
              query: {
                msg: res.data.msg,
              },
            });
            localStorage.clear();
            return "pending";
          }
          if (res.data.status == "fail") {
            //账号审核失败
            this.$router.replace({
              path: "/reviewFail",
              query: {
                msg: res.data.msg,
              },
            });
            localStorage.clear();
            return "fail";
          }
          if (res.data.status == "need_apply") {
            //需要申请考试
            this.applyShow = true;
            return "need_apply";
          }
          if (res.data.status == "success") {
            //已经通过考试
            Dialog.alert({
              message: res.data.msg,
            }).then(() => {
              this.$router.replace("/profile");
            });
            return "success";
          }
          if (res.data.status == "need_wait") {
            //已申请考试但在待审核状态
            Dialog.alert({
              message: res.data.msg,
            }).then(() => {
              this.$router.replace("/profile");
            });
            return "need_wait";
          }
          if (res.data.status == "can") {
            return "can";
          }
        }
      });
    },
    // 获取题目
    getQuestion() {
      this.$loading();
      getQues().then((res) => {
        Toast.clear();
        if (res.code == 1) {
          this.Timing = res.data.anwser_times;
          this.questionList = res.data.questionList;
        } else {
          //未登录
          Toast.fail(res.msg);
          setTimeout(() => {
            localStorage.clear();
            this.$router.replace("/index/login");
          }, 1500);
        }
      });
    },
    //确定按钮
    confirm() {
      let data = this.selectAnswer;
      if (Array.isArray(data)) {
        //分析题传递的才是数组，里面存储子题目信息
        if (data.length < this.indexQuestion.option.length) {
          Toast.fail("检查未填项!");
          return;
        }
        let v = data;
        for (let i = 0; i < v.length; i++) {
          if (!v[i]) {
            Toast.fail("检查未填项!");
            return;
          }
          if (v[i].testType == 1 && v[i].select.length == 0) {
            Toast.fail("检查未填项!");
            return;
          }
          if (v[i].testType == 2 && v[i].select.length <= 1) {
            Toast.fail("多选题至少选择两个！");
            return;
          }
        }
        this.analysisConfirm(data);
      } else if (typeof data == "object" && !Array.isArray(data)) {
        if (data.testType == 1) {
          if (data.select.length >= 1) {
            this.choiceConfirm(data);
          } else {
            Toast.fail("单选题至少选择一个选项！");
          }
        } else if (data.testType == 2) {
          if (data.select.length >= 2) {
            this.choiceConfirm(data);
          } else {
            Toast.fail("多选题至少选择两个选项！");
          }
        }
      }
    },
    //!单选,多选组件获取答案
    choiceConfirm(answers) {
      //由子组件传递选项
      this.$loading();
      upAnsw({
        question_id: answers.id,
        user_answ: answers.select.join("|"),
      }).then((res) => {
        Toast.clear();
        if (res.code == 1) {
          //将答案信息传递给子组件
          this.answerInfo = res.data.questionSingle;
          this.isFinally();
          if (res.data.questionSingle.is_correct == 1) {
            //正确题加一
            this.correct_number += 1;
            //答案信息为1正确，累加分数
            this.allScore += Number(res.data.questionSingle.score);
          }
        }
      });
    },
    //!分析题获取答案事件
    async analysisConfirm(v) {
      let results = [];
      this.$loading();
      for (let i = 0; i < v.length; i++) {
        await upAnsw({
          question_id: v[i].id,
          user_answ: v[i].select.join("|"),
        }).then((res) => {
          if (res.code == 1) {
            results.push(res.data.questionSingle);
            if (res.data.questionSingle.is_correct == 1) {
              //正确题加一
              this.correct_number += 1;
              //答案信息为1正确，累加分数
              this.allScore += Number(res.data.questionSingle.score);
            }
          }
        });
      }
      Toast.clear();
      this.answerInfo = results;
      this.isFinally();
    },
    // 下一题
    nextQues() {
      this.answerInfo = {};
      this.selectAnswer = {};
      this.index += 1;
    },
    //是否是最后一题
    isFinally() {
      //每次点击确定按钮都判断是否为最后一题，控制完成考试按钮
      if (this.index + 1 == this.questionList.length) {
        this.submitShow = true;
      }
    },
    //提交考试
    submitTest() {
      this.testEndTime = parseInt(new Date().getTime() / 1000);
      //总题数要算上分析里的小题，分析题大题肯定是不算的
      let allTestNum = 0;
      this.questionList.forEach((v) => {
        if (v.typedata == 1 || v.typedata == 2) {
          allTestNum += 1;
        } else if (v.typedata == 4) {
          allTestNum += v.option.length;
        }
      });
      submit({
        correct_number: this.correct_number, //正确题数
        score: this.allScore, //获得分数
        start_time: this.testStartTime, //开始时间
        end_time: this.testEndTime, //结束时间
        all_number: allTestNum, //所有题数
      }).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.result = res.data.complete; //考试数据
          this.$refs.countDown.pause(); //暂停倒计时
          this.isTest = false; //不处于考试状态!
          this.navTitle = "考试结果";
        }
      });
    },
    //子组件抛出选中题目信息
    selectEvent(data) {
      //单选题多选题传递是对象，分析题传递的是数组，里面存储子题目信息
      this.selectAnswer = data;
    },
    //考试时间倒计时结束触发事件
    timeOut() {
      Dialog.alert({
        message:
          "您未在考试规定时间完成答题，此次考试成绩作废，点击确定重新开始考试！",
      }).then(() => {
        //刷新此页面
        this.$router.go(0);
      });
    },
    //点击选项触发倒计时开始
    startTime() {
      this.testStartTime = parseInt(new Date().getTime() / 1000); //获取考试开始时间
      this.$refs.countDown.start(); //激活倒计时
      this.isTest = true; //处于考试状态
    },
    //弹出框申请考试
    applyTest() {
      if (!this.applyName) {
        Toast.fail("申请人名字不能为空");
        return;
      }
      if (!this.applyPhone || this.applyPhone.length !== 11) {
        console.log(this.applyPhone);
        Toast.fail("请输入正确的手机号");
        return;
      }
      answerApply({
        name: this.applyName,
        mobile: this.applyPhone,
      }).then((res) => {
        if (res.code == 1) {
          Toast.success(res.msg);
          setTimeout(() => {
            this.$router.replace("/profile");
          }, 1500);
        }
      });
    },
  },
  created() {
    this.getData().then((status) => {
      if (status !== "pending" && status !== "fail") {
        this.getQuestion();
      }
    });
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    //如果从答题页跳转个人详情页会销毁刚刚考试成绩
    if (to.name == "profile" && from.name == "home" && this.isTest) {
      Dialog.confirm({
        title: "警告",
        message: "您确定要离开考试吗？",
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
};
</script>

<style scoped lang="less">
.home {
  background-color: #f5f5f5;
  position: relative;
  padding-bottom: 1.5rem;
  min-height: 100vh;
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: white;
    }
  }
  .bg_img {
    height: 5rem;
    background: url("~@/assets/b_bg@2x.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .test {
    width: 9rem;
    margin: 0 auto;
    margin-top: -1.75rem;
    border-radius: 0.3rem;
    overflow: hidden;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgb(200, 200, 200);
    margin-bottom: 1rem;
    .title {
      background: #ffffff;
      height: 1.3rem;
      padding: 0 0.3rem;
      border-bottom: 0.02rem solid #eeeeee;
      .leftTitle {
        flex: 1;
        img {
          width: 0.7rem;
        }
        p {
          padding-left: 0.1rem;
          font-size: 0.43rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #343434;
        }
      }
      .count {
        height: 1.3rem;
        .n {
          font-size: 0.67rem;
          font-family: DINCond-Bold;
          font-weight: 400;
          color: #343434;
        }
        .c {
          font-size: 0.48rem;
          font-family: DINCond-Bold;
          font-weight: 400;
          color: #9a9a9a;
        }
      }
    }
  }

  .CountDown {
    position: absolute;
    display: block;
    width: 100%;
    top: 1.5rem;
    z-index: 1;
    text-align: center;
    color: white;
  }

  .btn {
    height: 1.5rem;
    background-color: white;
    padding: 0 0.7rem;
    .a {
      flex: 1;
    }
    div:active {
      opacity: 0.7;
    }
    .confirm {
      width: 1.6rem;
      height: 0.8rem;
      background: #3d80fc;
      border-radius: 0.5rem;
      color: white;
      text-align: center;
      line-height: 0.8rem;
    }
  }
  //选中
  .active {
    background: #d8ecff !important;
    border: 0.05rem solid #3e80fc !important;
    p {
      color: #0250a0 !important;
    }
  }

  //选错
  .fail {
    background: #fddadb;
    border: 0.02rem solid #ff5258;
    p {
      color: #df0202 !important;
    }
  }
  //选对
  .success {
    background: #dafdf0 !important;
    border: 0.02rem solid #4ee6af !important;
    p {
      color: #02ae4f !important;
    }
  }
  // 底部栏占位符
  .tabBar_space {
    height: 1.3rem;
  }
  // 答题解析
  .answer_info {
    width: 9rem;
    margin-top: 0.3rem;
    padding: 0 0 0.5rem 0;
    background: #ffffff;
    border-radius: 0.3rem;
    box-shadow: 0rem 0.1rem 0.1rem 0rem rgb(200, 200, 200);
    .title {
      height: 1.3rem;
      padding: 0 0.3rem;
      border-bottom: 0.02rem solid #eee;
      img {
        width: 0.7rem;
      }
      p {
        padding-left: 0.1rem;
        font-size: 0.43rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #343434;
      }
    }
    .right_box {
      padding: 0.3rem;
      .right_answer {
        font-size: 0.4rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #343434;
      }
      .right_reason {
        margin-top: 0.2rem;
      }
    }
  }
  //申请考试框
  .applyTest {
    width: 8rem;
    height: 7.2rem;
    background: #ffffff;
    border-radius: 1rem;
    padding: 0.9rem;
    text-align: center;
    p {
      font-size: 0.57rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #3e80fc;
    }
    .applyInput {
      margin-top: 0.8rem;
      height: 2.5rem;
      flex-wrap: wrap;
      input {
        width: 6.27rem;
        height: 0.94rem;
        background: #ffffff;
        border: 0.03rem solid #dedede;
        border-radius: 0.05rem;
        padding: 0 0.2rem;
      }
    }
    .applyBtn {
      margin-top: 0.8rem;
      width: 6.27rem;
      height: 1.07rem;
      background: #3e80fc;
      border-radius: 0.3rem;
      font-size: 0.4rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.07rem;
      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
