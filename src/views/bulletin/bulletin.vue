<template>
  <div class="bulletin">
    <navBar class="navBg" :arrow="2">
      <p class="navTitle" slot="tabContent">通知公告</p>
    </navBar>

    <div class="list" v-if="bulletinList.length">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item ali-c" v-for="(item, index) in bulletinList" :key="index">
          <div class="info" @click="toDetails(item.id)">
            <p class="text van-multi-ellipsis--l2">{{item.title}}</p>
            <p class="time">{{item.createtime}}</p>
          </div>
          <div class="img">
            <img :src="item.image" alt />
          </div>
        </div>
      </van-list>
    </div>

    <div class="none" v-else>
      <img src="@/assets/c_record_empty@2x.png" alt />
      <p>暂无通知公告哦~</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { List } from "vant";
Vue.use(List);
import navBar from "@/components/navBar/navBar";
import { debounce } from "@/utils/utils.js";
import { notice_list } from "@/request/api.js";
export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {
      bulletinList: [],
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
      return notice_list({
        page: ++this.page,
        pagesize: this.pagesize,
      }).then((res) => {
        if (res.code == 1) {
          this.bulletinList = [...this.bulletinList, ...res.data.list];
          return res.data.list.length;
        }
      });
    },
    onLoad: debounce(function () {
      this.getData().then((res) => {
        if (res < this.pagesize) {
          this.finished = true;
        }
        this.loading = false;
      });
    }, 2000),
    toDetails(id) {
      this.$router.push({
        path: "/bulletinDetails/" + id,
      });
    },
  },

  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.bulletin {
  background-color: #f0f0f0;
  min-height: 100vh;
  .navBg {
    background-color: white;

    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
  }
  .list {
    .item {
      height: 2.67rem;
      background: #ffffff;
      padding: 0.3rem;
      border-bottom: 0.03rem solid #ededed;
      .info {
        flex: 1;
        .text {
          font-size: 0.4rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .time {
          margin-top: 0.2rem;
          font-size: 0.32rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
      .img {
        margin-left: 0.5rem;
        width: 3.07rem;
      }
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
</style>
