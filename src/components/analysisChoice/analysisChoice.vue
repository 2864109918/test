<template>
  <div class="analysisChoice">
    <div class="title">
      <p v-html="testData.title"></p>
    </div>
    <div v-for="(item, index) in testData.option" :key="index">
      <p class="testStatus" v-if="item.typedata==1">单选题:</p>
      <p class="testStatus" v-if="item.typedata==2">多选题:</p>
      <choice
        @selectEvent="analysisSelect"
        :testData="item"
        :answerInfo="answerInfo[index]"
        :analysisStatus="true"
        :choiceIndex="index"
        :key="item.id"
      ></choice>
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
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
  computed: {},
  data() {
    return {
      chidrenSelect: [],
    };
  },
  watch: {
    answerInfo: {
      handler(newVal, oldVal) {},
      deep: true,
    },
  },
  methods: {
    analysisSelect(obj) {
      //将子组件的状态信息保存到一个对象里
      let index = obj["choiceIndex"];
      this.$set(this.chidrenSelect, index, obj);
      this.$emit("selectEvent", this.chidrenSelect); //抛出事件给父级
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
  .testStatus {
    padding: 0.3rem;
    color: red;
    font-size: 0.4rem;
  }
}
</style>
