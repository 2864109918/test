<template>
  <div class="navBar jus-a">
    <div class="tabLeft ali-c jus-c" @click="tabLeftClick">
      <img v-if="arrow==1" src="@/assets/b_return@2x.png" alt />
      <img v-if="arrow==2" src="@/assets/c_return_a@2x.png" alt />
    </div>
    <div class="tabContent ali-c jus-c">
      <slot name="tabContent"></slot>
    </div>
    <div class="tabright"></div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    //传入1为白色箭头 传入2位黑色箭头 其他值就不显示箭头
    arrow: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    tabLeftClick() {
      if (this.arrow == 1 || this.arrow == 2) {
        this.$router.go(-1);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.navBar {
  height: 1.31rem;
  div {
    &:active {
      opacity: 0.7;
    }
  }

  .tabLeft {
    flex: 1;
    img {
      width: 0.22rem;
    }
  }
  .tabContent {
    flex: 3;
  }
  .tabright {
    flex: 1;
  }
}
</style>
