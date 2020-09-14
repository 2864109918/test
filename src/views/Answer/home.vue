<template>
  <div class="home" style="max-width:750px;margin:0 auto;">
    <!-- 顶部栏 -->
    <navBar class="nav" :arrow="3">
      <p class="navTitle" slot="tabContent">{{navTitle}}</p>
    </navBar>
    <!-- <van-count-down
      v-if="time&&!complete"
      :auto-start="false"
      class="CountDown"
      @finish="timeOut"
      :time="time"
      ref="countDown"
    />-->
    <!-- 背景图 -->
    <div class="bg_img"></div>

    <div class="test" v-if="questionList.length">
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

      <!-- 题目组件参数说明： 题目信息  答案信息(等待确认事件发生后传递)  现在题目序号  key(必须要有kye，不然会组件复用)  确认答案事件  下一题事件 -->
      <div v-if="indexQuestion.typedata==1||indexQuestion.typedata==2">
        <choice
          :testData="indexQuestion"
          :answerInfo="answerInfo"
          :key="indexQuestion.id"
          :testIndex="index"
          @confirm="confirm"
          @next="nextQues"
        ></choice>
      </div>

      <div v-if="indexQuestion.typedata==4">
        <analysisChoice
          :testData="indexQuestion"
          :answerInfo="answerInfo"
          :key="indexQuestion.id"
          :testIndex="index"
          @analysisConfirm="analysisConfirm"
          @next="nextQues"
        ></analysisChoice>
      </div>
    </div>

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

Vue.use(Toast, Dialog, CountDown);
export default {
  name: "home",
  components: {
    navBar,
    tabBar,
    choice,
    analysisChoice,
    "van-count-down": CountDown,
  },
  data() {
    return {
      //------------------题目------------------------
      questionList: [], // 所有题目列表
      index: 0, //索引值

      //------------------答案------------------------
      answerInfo: {}, //此题题目答案

      //------------------计分------------------------
      correct_number: 0, // 答对题数
      allScore: 0, //答对一题就加累计分数

      // answerInfo: "", // 答题解析数据
      // right_answer: [], // 正确答案

      //------------------导航栏文字-----------------------
      navTitle: "在线考试",

      //------------------是否可以答题-----------------------
      testStatus: "", //padding账号待审核 need_apply失败两次需要重新申请 success已经通过考试不需要再考 fali考试失败不允许再考
      applyShow: false, //申请框显示
      applyName: "", //申请人名字
      applyPhone: "", //申请人手机号
      //------------------倒计时------------------------
      Timing: "", //答题规定时间,单位为分钟,从服务器获取，为空就不限制时间
      isTest: false, //现在是否处于考试，只要点击选项将会设置为true，倒计时也会开始
      testStartTime: 0, //考试开始时间
      testEndTime: 0, //考试结束时间

      //------------------是否完成答题------------------------
      result: {}, //考试结果
      complete: false, //是否完成答题，显示答题结果
    };
  },
  watch: {},
  computed: {
    time() {
      //计算倒计时
      if (this.Timing) {
        return Number(this.Timing) * 60 * 1000;
      } else {
        return 0;
      }
    },
    //当前题目内容
    indexQuestion() {
      return this.questionList[this.index];
    },
  },
  methods: {
    // 获取数据
    getData() {
      return getstate({}).then((res) => {
        if (res.code == 1) {
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
            //已申请考试但在待审核状态

            Dialog.alert({
              message: res.data.msg,
            }).then(() => {
              this.$router.replace("/profile");
            });
          } else if (res.data.status == "pending") {
            //账号正在审核状态

            Toast(res.data.msg);
            setTimeout(() => {
              this.$router.replace("/index/login");
            }, 1500);
          }
        }
      });
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
      this.isTest = true; //处于考试状态
      this.testStartTime = parseInt(new Date().getTime() / 1000); //获取考试开始时间
      this.$refs.countDown.start(); //激活倒计时
    },
    // 获取题目
    getQuestion() {
      this.$loading();
      getQues().then((res) => {
        Toast.clear();
        if (res.code == 1) {
          // 所有题目
          res.data.questionList.forEach((v) => {
            if (v.typedata == 4) {
              this.questionList.push(v);
            }
          });

          // this.questionList = res.data.questionList;
        } else {
          //未登录
          Toast.fail(res.msg);
          setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.replace("/index/login");
          }, 1500);
        }
      });
    },
    //确认答案
    confirm(answers) {
      //由子组件传递选项，激活此函数
      this.$loading();
      upAnsw({
        question_id: this.indexQuestion.id,
        user_answ: answers.join("|"),
      }).then((res) => {
        Toast.clear();
        if (res.code == 1) {
          console.log(res.data);
          //将答案信息传递给子组件
          this.answerInfo = res.data.questionSingle;
          if (res.data.questionSingle.is_correct == 1) {
            //答案信息为1正确，累加分数
            this.allScore += Number(res.data.questionSingle.score);
          }
        }
      });
    },
    //!分析题确认答案触发事件
    async analysisConfirm(v) {
      let results = [];
      this.$loading();
      for (let i = 0; i < v.length; i++) {
        await upAnsw({
          question_id: v[i].id,
          user_answ: v[i].select.join("|"),
        }).then((res) => {
          if (res.code == 1) {
            console.log(v[i].id, res.data);
            results.push(res.data.questionSingle);
            if (res.data.questionSingle.is_correct == 1) {
              //答案信息为1正确，累加分数
              this.allScore += Number(res.data.questionSingle.score);
            }
          }
        });
      }
      Toast.clear();

      this.answerInfo = results;
      console.log(results);
    },
    // 下一题
    nextQues() {
      this.answerInfo = {};
      this.index += 1;
    },
    //提交考试
    submitTest() {
      this.testEndTime = parseInt(new Date().getTime() / 1000);
      console.log(this.testEndTime, this.testStartTime);
      submit({
        correct_number: this.correct_number, //正确题数
        score: this.allScore, //获得分数
        start_time: this.testStartTime, //开始时间
        end_time: this.testEndTime, //结束时间
        all_number: this.questionList.length, //所有题数
      }).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.result = res.data.complete; //考试数据
          this.isTest = false; //不在考试状态了
          // this.result.is_pass = 1;
          this.complete = true; //考试结束
          this.navTitle = "考试结果";
        }
      });
    },

    //我知道了
    i_know() {
      this.$router.go(0);
    },
    //再考一次
    restartTest() {
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
    this.getData().then(() => {
      this.getQuestion();
    });
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    //如果从答题页跳转个人详情页会销毁刚刚考试成绩
    if (to.name == "profile" && from.name == "home" && this.isTest) {
      Dialog.confirm({
        title: "警告",
        message: "您正在考试，如果离开此页，将会取消此次考试！",
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

// <div class="test" v-if="!complete">
//   <div class="topic">
//     <div class="title ali-c">
//       <div class="leftTitle ali-c">
//         <img src="@/assets/b_label@2x.png" alt />
//         <p v-if="indexQuestion.typedata == 1">单选题</p>
//         <p v-if="indexQuestion.typedata == 2">多选题</p>
//         <p v-if="indexQuestion.typedata == 3">填空题</p>
//         <p v-if="indexQuestion.typedata == 4">分析题</p>
//       </div>

//       <div class="count ali-c">
//         <span class="n">{{index + 1}}</span>
//         <span class="c">/{{questionList.length}}</span>
//       </div>
//     </div>

//     <div class="content" v-on:click.once="startTime">
//       <div class="topic_content">
//         <p v-html="indexQuestion.title"></p>
//       </div>

//       <!-- 答题时展示 -->
//       <div class="topic_options" v-if="!answerInfo">
//         <!-- 答题选项 -->
//         <div
//           class="topic_options_item ali-c"
//           :class="item.select ? 'active' : ''"
//           v-for="(item, index) in indexAnswer"
//           :key="index"
//           @click="selectItem(index,item.option)"
//         >
//           <p class="option_name">{{item.option}}、</p>
//           <p class="ali-c flex1" v-html="item.option_content"></p>
//         </div>
//       </div>

//       <!-- 答题错误时展示 -->
//       <div class="topic_options" v-else>
//         <!-- 单选显示错误答案 -->
//         <div v-if="right_answer.length==1">
//           <div
//             class="topic_options_item ali-c"
//             :class="{ 'answer_right' : item.option == right_answer ,'answer_select': item.select }"
//             :style="item.style ? item.style : ''"
//             v-for="(item, index) in indexAnswer"
//             :key="index"
//           >
//             <p class="option_name" v-if=" item.option == right_answer && item.select">
//               <img class="right_ico" src="@/assets/b_correct@2x.png" alt />
//             </p>
//             <p class="option_name" v-if="item.option != right_answer  && item.select">
//               <img class="right_ico" src="@/assets/b_wrong@2x.png" alt />
//             </p>
//             <p class="option_name" v-if="!item.select">{{item.option}}、</p>
//             <p class="ali-c flex1" v-html="item.option_content"></p>
//           </div>
//         </div>

//         <div v-else>
//           <!-- 如果多选题是正确的那么只显示正确的 -->
//           <div v-if="isTrue">
//             <div
//               class="topic_options_item ali-c"
//               :class="{  'answer_right' : right_answer.indexOf(item.option) != -1,'answer_select': item.select}"
//               :style="item.style ? item.style : ''"
//               v-for="(item, index) in indexAnswer"
//               :key="index"
//             >
//               <p
//                 class="option_name"
//                 v-if="right_answer.indexOf(item.option) != -1&&item.select"
//               >
//                 <img class="right_ico" src="@/assets/b_correct@2x.png" alt />
//               </p>

//               <p class="option_name">{{item.option}}、</p>
//               <p class="ali-c flex1" v-html="item.option_content"></p>
//             </div>
//           </div>
//           <!-- 如果多选题是正确的那么只显示错误的 -->
//           <div v-else>
//             <div
//               class="topic_options_item ali-c"
//               :class="{ 'answer_select': item.select}"
//               :style="item.style ? item.style : ''"
//               v-for="(item, index) in indexAnswer"
//               :key="index"
//             >
//               <p
//                 class="option_name"
//                 v-if="right_answer.indexOf(item.option) != -1&&item.select"
//               >
//                 <img class="right_ico" src="@/assets/b_wrong@2x.png" alt />
//               </p>
//               <p class="option_name">{{item.option}}、</p>
//               <p class="ali-c flex1" v-html="item.option_content"></p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="confirm">
//         <div class="btn" v-if="answerList.length > 0 && !answerInfo" @click="confirm">确认</div>
//         <div
//           class="btn"
//           v-else-if="answerInfo&&index+1!==questionList.length"
//           @click="nextQues"
//         >下一题</div>
//         <div class="btn" v-else-if="lastTest" @click="submitTest">完成</div>
//       </div>
//     </div>
//   </div>

//   <div class="answer_info flexv" v-if="answerInfo.is_correct == 0">
//     <div class="title ali-c">
//       <img src="@/assets/b_label@2x.png" alt />
//       <p>答题解析</p>
//     </div>

//     <!-- 正确答案 -->
//     <div class="right_box flexv">
//       <p
//         class="right_answer"
//         v-if="answerInfo.answ.length==1"
//       >正确答案:&nbsp;&nbsp;{{answerInfo.answ[0]}}</p>

//       <p class="right_answer" v-else>正确答案:&nbsp;&nbsp;{{answerInfo.answ.join(',')}}</p>

//       <!-- this.indexQuestion.typedata == 1 -->
//       <div class="right_reason" v-html="answerInfo.analysis ||'<p>无答案解析</p>'"></div>
//     </div>
//   </div>
// </div>
// <div class="result" v-else>
//   <img src="@/assets/b_bg_c@2x.png" alt />
//   <div class="result_detail">
//     <div class="result_text jus-b ali-c">
//       <img src="@/assets/b_label_left@2x.png" alt />
//       <span v-if="result.is_pass==1">本次考试成功</span>
//       <span v-else>本次考试失败</span>
//       <img src="@/assets/b_label_left@2x.png" alt />
//     </div>

//     <div class="result_img">
//       <img v-if="result.is_pass==1" src="@/assets/b_success@2x.png" alt />

//       <img v-else src="@/assets/b_fail@2x.png" alt />
//     </div>

//     <div class="result_content ali-c jus-a">
//       <div>
//         <p>{{result.score}}</p>
//         <p>考试分</p>
//       </div>

//       <div>
//         <p>{{result.wrong_question}}</p>
//         <p>错题数</p>
//       </div>

//       <div>
//         <p>{{result.probabilityCorrect}}</p>
//         <p>正确率</p>
//       </div>

//       <div>
//         <p>{{result.operating_time}}</p>
//         <p>用时</p>
//       </div>
//     </div>

//     <div class="result_btn" v-if="result.is_pass==1" @click="i_know">我知道了</div>

//     <div class="result_btn" v-if="result.is_pass==0" @click="restartTest">再考一次</div>

//     <!-- <div class="result_btn">申请考试</div> -->
//   </div>
// </div>

// <!--
// <van-popup :close-on-click-overlay="false" v-model="applyShow">
//   <div class="applyTest">
//     <p>申请考试</p>
//     <div class="applyInput ali-c">
//       <input type="text" v-model="applyName" placeholder="请输入您的姓名" />
//       <input type="tel" v-model="applyPhone" maxlength="11" placeholder="请输入您的手机号" />
//     </div>
//     <div class="applyBtn" @click="applyTest">提交申请</div>
//   </div>
// </van-popup>-->
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
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
  }

  // .topic {
  //   position: relative;
  //   z-index: 1;
  //   width: 9rem;
  //   margin: 0 auto;
  //   background: #ffffff;
  //   border-radius: 0.3rem;
  //   box-shadow: 0rem 0.1rem 0.1rem 0rem rgb(200, 200, 200);
  //   margin-bottom: 1.5rem;
  //   .title {
  //     height: 1.3rem;
  //     padding: 0 0.3rem;
  //     border-bottom: 0.02rem solid #eeeeee;
  //     .leftTitle {
  //       flex: 1;
  //       img {
  //         width: 0.7rem;
  //       }
  //       p {
  //         padding-left: 0.1rem;
  //         font-size: 0.43rem;
  //         font-family: PingFang SC;
  //         font-weight: bold;
  //         color: #343434;
  //       }
  //     }
  //     .count {
  //       height: 1.3rem;
  //       .n {
  //         font-size: 0.67rem;
  //         font-family: DINCond-Bold;
  //         font-weight: 400;
  //         color: #343434;
  //       }
  //       .c {
  //         font-size: 0.48rem;
  //         font-family: DINCond-Bold;
  //         font-weight: 400;
  //         color: #9a9a9a;
  //       }
  //     }
  //   }
  //   .content {
  //     padding: 0.7rem 0.6rem 0.6rem 0.6rem;

  //     .topic_content {
  //       font-size: 0.45rem;
  //     }
  //     .topic_options {
  //       margin-top: 0.5rem;
  //       .topic_options_item {
  //         transition: all 0.3s;
  //         margin: 0.2rem 0;
  //         padding: 0.2rem 0.3rem;
  //         background: #fbfbfb;
  //         border: 0.05rem solid #e4e4e4;
  //         border-radius: 0.3rem;
  //         .option_name {
  //           font-size: 0.43rem;
  //           line-height: 120%;
  //           color: #666;
  //           .right_ico {
  //             width: 0.4rem;
  //             height: 0.4rem;
  //             margin: auto 0.12rem auto 0;
  //           }
  //         }
  //         p {
  //           font-size: 0.43rem;
  //           font-family: PingFang SC;
  //           font-weight: 500;
  //           color: #666666;
  //         }
  //       }
  //       .answer_right {
  //         background: #dbfbee !important;
  //         border: 0.05rem solid #a3ebda !important;
  //         p {
  //           color: #06aa52 !important;
  //         }
  //       }
  //       .answer_select {
  //         background: #fed9dc;
  //         border: 0.05rem solid #d79e9d;
  //         p {
  //           color: #bc1e1b;
  //         }
  //       }
  //     }
  //     .confirm {
  //       height: 0.8rem;
  //       text-align: right;
  //       .btn {
  //         transition: all 0.5s;
  //         display: inline-block;
  //         width: 1.6rem;
  //         height: 0.8rem;
  //         background: #3e80fc;
  //         border-radius: 0.5rem;
  //         font-size: 0.4rem;
  //         font-family: PingFang SC;
  //         font-weight: bold;
  //         color: #ffffff;
  //         line-height: 0.8rem;
  //         text-align: center;
  //       }
  //     }
  //   }
  // }

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
  //考试结果
  .result {
    position: relative;
    z-index: 1;
    width: 9rem;
    margin: 0 auto;
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
