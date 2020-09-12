<template>
  <div class="bulletinDetails">
    <navBar class="navBg" :arrow="2">
      <p class="navTitle" slot="tabContent">详情</p>
    </navBar>

    <div class="content">
      <div v-html="content"></div>

      <div v-if="!content" >暂无内容哦</div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";

import { notice_detail } from "@/request/api.js";
import { Toast } from "vant";

export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {
      content: "",
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    if (this.$route.params.id) {
      this.$loading();
      notice_detail({
        article_id: this.$route.params.id,
      }).then((res) => {
        Toast.clear();
        if (res.code == 1) {
        //   this.content = res.data.list.content;
          console.log(res);
        }
      });
    }
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.navBg {
  background-color: white;
  .navTitle {
    font-size: 0.48rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
}

.content {
  padding: 0 0.3rem;
}
</style>
