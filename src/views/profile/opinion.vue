<template>
  <div class="opinion">
    <navBar class="nav" :arrow="2">
      <p class="navTitle" slot="tabContent">意见反馈</p>
    </navBar>

    <div class="i">
      <textarea class="text" v-model="content" :placeholder="ph" maxlength="200" cols="50" rows="8"></textarea>

      <van-uploader class="uploader" :max-count="1" :after-read="afterRead">
        <div class="default ali-c jus-c">
          <img v-if="!base64" src="@/assets/c_photo@2x.png" alt />
          <img v-else :src="base64" alt />
        </div>
      </van-uploader>
    </div>

    <div class="btn" @click="confirm">确定</div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
import { Toast } from "vant";

import { setImg, feedback } from "@/request/api.js";

export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {
      content: "", //内容
      mobile: "", //电话
      imgUrl: "", //图片地址
      ph: "请输入遇到的问题或建议...",
      base64: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    afterRead(file) {
      this.base64 = file.content;
      let param = new FormData(); //创建form对象
      param.append("image", file.file);
      setImg(param).then((res) => {
        if (res.code == 1) {
          this.imgUrl = res.data.img;
        } else {
          this.$tip(res.msg);
        }
      });
    },
    confirm() {
      if (this.content == "") {
        Toast("内容不能为空！");
        return;
      }
      feedback({
        content: this.content,
        images: this.imgUrl,
        mobile: this.mobile,
      }).then((res) => {
        console.log(res);
        if (res.code == 1) {
          Toast.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.opinion {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;

  .nav {
    background-color: white;
    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
    }
  }
}

.i {
  background-color: white;
  padding-bottom: 0.3rem;
  height: 6rem;
}
.text {
  width: 100%;
  height: 3rem;
  border-top: 0.02rem solid #eeeeee;
  padding: 0.3rem;
}
.uploader {
  margin-left: 0.5rem;
}
.default {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 1);
  border: 0.03px dashed rgba(220, 220, 220, 1);
  border-radius: 0.2rem;

  font-size: 0.21rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(192, 192, 192, 1);
  text-align: center;
}
.showImg {
  width: 1.6rem;
  height: 1.6rem;
  background: rgba(255, 255, 255, 1);
  border: 0.03px dashed rgba(220, 220, 220, 1);
  display: flex;
  align-items: center;
  img {
    width: 2rem;
  }
}
.btn {
  width: 80%;
  height: 1rem;
  background: rgba(2, 118, 255, 1);
  border-radius: 0.5rem;
  margin: 0 auto;
  text-align: center;
  color: white;
  line-height: 1rem;
  margin-top: 0.5rem;
  &:active {
    opacity: 0.8;
  }
}
</style>
