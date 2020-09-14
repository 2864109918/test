<template>
  <div class="analysisChoice">
    <div class="title">
      <p v-html="testData.title"></p>
    </div>

    <div v-for="(item, index) in testData.option" :key="index">
      <choice
        @analysisSelect="analysisSelect"
        :testData="item"
        :answerInfo="answerInfo[index]"
        :analysisStatus="true"
        :choiceIndex="index"
        :key="item.id"
      ></choice>
    </div>
    <div class="btn ali-c">
      <div class="a"></div>
      <div class="confirm" v-if="!complete" @click="confirm">确定</div>
      <div class="confirm" v-if="complete" @click="next">下一题</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import choice from "@/components/choice/choice"; //题目组件
//子组件将选中答案抛给父组件，父组件获取答案信息传递给子组件
export default {
  name: "",
  components: { choice },
  props: {
    //题目数据
    testData: {
      type: Object,
      default() {
        return {};
      },
    },
    //子组件的答案信息，所以是数组
    answerInfo: {
      type: [Array,Object],
      default() {
        return [];
      },
    },
  },
  computed: {},
  data() {
    return {
      complete:false,
      chidrenSelect: [],
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
  methods: {
    analysisSelect(id, index, type, select) {
      //将子组件的状态信息保存到一个对象里
      this.$set(this.chidrenSelect, index, {
        id,
        type,
        select: select.sort(),
      });
    },
    //确定选项，触发事件
    confirm() {
      let v = this.chidrenSelect;
      for (let i = 0; i < v.length; i++) {
        if (!v[i]) {
          Toast.fail("检查未填项!");
          return;
        }
        if (v[i].type == 1 && v[i].select.length == 0) {
          Toast.fail("检查未填项!");
          return;
        }
        if (v[i].type == 2 && v[i].select.length <= 1) {
          Toast.fail("多选题至少选择两个！");
          return;
        }
      }
      this.$emit("analysisConfirm", v);
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
.analysisChoice {
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
