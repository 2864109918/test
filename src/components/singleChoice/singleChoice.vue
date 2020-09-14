<template>
  <div class="singleChoice">
    <div class="title">
      <p v-html="testData.title"></p>
    </div>
    <!-- 选择时候展示 -->
    <div class="options" v-if="!complete">
      <div
        class="item ali-c"
        :class="{active: select.indexOf(item.option)!=-1}"
        v-for="(item, index) in testData.option"
        :key="index"
        @click="selected(item.option)"
      >
        <div class="i">{{item.option}}.</div>
        <div class="content" v-html="item.option_content"></div>
      </div>
    </div>
    <!-- 选项正确显示内容 -->
    <div class="options" v-else-if="isCorrect==1">
      <div
        class="item ali-c"
        :class="{success:answerInfo.answ.indexOf(item.option)!==-1}"
        v-for="(item, index) in testData.option"
        :key="index"
        @click="selected(item.option)"
      >
        <img
          class="icon"
          v-if="answerInfo.answ.indexOf(item.option)!==-1"
          src="@/assets/b_correct@2x.png"
          alt
        />

        <div class="i" v-else>{{item.option}}.</div>
        <div class="content" v-html="item.option_content"></div>
      </div>
    </div>
    <!-- 选项错误显示内容 -->
    <div class="options" v-else-if="isCorrect==0">
      <div
        class="item ali-c"
        :class="{fail:filterArray(item.option)}"
        v-for="(item, index) in testData.option"
        :key="index"
        @click="selected(item.option)"
      >
        <img class="icon" v-if="filterArray(item.option)" src="@/assets/b_wrong@2x.png" alt />

        <div class="i" v-else>{{item.option}}.</div>
        <div class="content" v-html="item.option_content"></div>
      </div>
    </div>

    <div class="btn ali-c">
      <div class="a"></div>
      <div class="confirm" v-if="select[0]&&!complete" @click="confirm">确定</div>
      <div class="confirm" v-if="complete" @click="next">下一题</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
//子组件将选中答案抛给父组件，父组件获取答案信息传递给子组件
export default {
  name: "",
  components: {},
  props: {
    //题目数据
    testData: {
      type: Object,
      default() {
        return {};
      },
    },
    //题目答案信息
    answerInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    //选中选项中是否存在正确答案数组里内容
    filterArray: function () {
      return function (option) {
        return this.select.indexOf(option) !== -1;
      };
    },
  },
  data() {
    return {
      select: [], //选中
      complete: false, //是否完成此题
      isCorrect: null, //是否回答正确
    };
  },
  watch: {
    answerInfo: {
      handler(newVal, oldVal) {
        this.isCorrect = newVal.is_correct;
        if (this.isCorrect == 1) {
          console.log("答对");
        } else {
          console.log("错误");
        }

        this.complete = true;
      },
      deep: true,
    },
  },
  methods: {
    //选中选项
    selected(v) {
      //你选中的选项是否存在数组里
      let isExist = this.select.indexOf(v);
      if (isExist == -1) {
        this.select.push(v); //不存在就push数组
      } else {
        this.select.splice(isExist, 1); //存在就删除此选项
      }
    },
    //确定选项，触发事件
    confirm() {
      if (this.select.length >= 2) {
        this.$emit("confirm", this.select);
      } else {
        Toast.fail("请选择多个选项！");
      }
    },
    next() {
      this.$emit("next");
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.singleChoice {
  padding: 0.3rem;
  background: #ffffff;
  .title {
    font-size: 0.4rem;
    text-indent: 0.8rem;
    line-height: 0.6rem;
  }
  .options {
    margin-top: 0.5rem;
    .item {
      width: 8.4rem;
      min-height: 1.2rem;
      background: #fbfbfb;
      border: 0.02rem solid #e9e9e9;
      border-radius: 0.3rem;
      margin-bottom: 0.4rem;
      padding: 0.5rem;
      font-size: 0.43rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
    }
  }

  .btn {
    height: 1.5rem;
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
}
//`-----------------状态---------------------------

.icon {
  width: 0.35rem;
}

//选中
.active {
  background: #d8ecff !important;
  border: 0.02rem solid #3e80fc !important;
  p {
    color: #0250a0 !important;
  }
}

//选错
.fail {
  background: #fddadb !important;
  border: 0.02rem solid #ff5258 !important;
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
</style>
