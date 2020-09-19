<template>
  <div class="answerRecord">
    <navBar class="van-hairline--bottom" :arrow="2">
      <p class="navTitle" slot="tabContent">答题记录</p>
    </navBar>

    <van-list
      v-if="Datalist.length"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
      :immediate-check="false"
    >
      <div
        class="record ali-c anima"
        :style="{animationDelay:'0.'+index+'s'}"
        v-for="(item, index) in Datalist"
        :key="index"
      >
        <div class="info ali-c jus-b">
          <p class="title">{{item.memo}}</p>
          <p class="time">{{item.createtime}}</p>
        </div>
        <div class="detail ali-c jus-b">
          <div class="ali-c">
            <span>正确率：{{item.correct_rate}}</span>
            <span>错题：{{item.wrong_question}}</span>
            <span>用时：{{item.operating_time}}</span>
          </div>
          <div class="num">{{item.score}}分</div>
        </div>
      </div>
    </van-list>

    <div class="none" v-else>
      <img src="@/assets/c_record_empty@2x.png" alt />
      <p>快去考试吧，还没有记录呢~</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { List, Toast } from "vant";
Vue.use(List);

import { debounce } from "@/utils/utils.js";
import { answerRecord } from "@/request/api.js";
import navBar from "@/components/navBar/navBar";
export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {
      Datalist: [],
      page: 0,
      pagesize: 10,
      loading: false,
      finished: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      this.$loading();
      return answerRecord({
        page: ++this.page,
        pagesize: this.pagesize,
      })
        .then((res) => {
          Toast.clear();
          if (res.code == 1) {
            this.Datalist = [...this.Datalist, ...res.data.answerDetail];
          }
          return res.data.answerDetail.length; //返回当前获取的数据个数，如果少于pagesize就说明数据已获取最大值了
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail("网络出现问题,请检查网络！");
        });
    },

    onLoad: debounce(function () {
      //触发上拉刷新事件
      this.getData().then((res) => {
        if (res < this.pagesize) {
          this.finished = true;
        }
        this.loading = false;
      });
    }, 2000),
  },
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.anima {
  transform: translateX(100%);
  opacity: 0;
  animation: one-in 1s 1 forwards ease-out;
}

@keyframes one-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

.answerRecord {
  .navTitle {
    font-size: 0.48rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #343434;
  }
  .record {
    padding: 0 0.3rem;
    height: 1.74rem;
    background: #ffffff;
    border-bottom: 0.02rem solid #eeeeee;
    flex-wrap: wrap;
    > div {
      width: 100%;
    }
    .title {
      font-size: 0.38rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #343434;
    }
    .time {
      font-size: 0.3rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
    }
    .detail {
      span {
        padding-right: 0.2rem;

        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #a6a6a6;
      }
      .num {
        font-size: 0.54rem;
        font-family: DINCond-Bold;
        font-weight: 400;
        color: #f24646;
      }
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
}
</style>
