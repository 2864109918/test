<template>
  <div class="multipleChoice">
    <div class="title">
      <p v-html="testData.title"></p>
    </div>
    <div class="options">
      <div
        class="item ali-c"
        :class="{active:item.option==select[0]}"
        v-for="(item, index) in testData.option"
        :key="index"
        @click="selected(item.option)"
      >
        <div class="i">{{item.option}}.</div>
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
  computed: {},
  data() {
    return {
      select: [], //选中
      complete: false, //是否完成此题
    };
  },
  watch: {
    answerInfo: {
      handler(newVal, oldVal) {
        this.complete = true;
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    //选中选项
    selected(v) {
      this.$set(this.select, 0, v);
    },
    //确定选项，触发事件
    confirm() {
      if (this.select) {
        this.$emit("confirm", this.select);
      }
    },
    next() {
      this.$emit("next");
    },
  },
  created() {},
  mounted() {
    console.log(this.testData);
  },
};
</script>

<style scoped lang="less">
.multipleChoice {
  padding: 0.3rem;
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
</style>
