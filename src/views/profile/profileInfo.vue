<template>
  <div class="profileInfo">
    <navBar class="nav" :arrow="2">
      <p class="navTitle" slot="tabContent">个人资料</p>
    </navBar>

    <div class="avatar ali-c">
      <p>头像</p>
      <van-uploader :max-count="1" :after-read="afterRead">
        <img class="avatarImg" v-if="profile.avatar" :src="profile.avatar" alt />
        <img class="avatarImg" v-else src="@/assets/c_head.png" alt />
      </van-uploader>

      <img class="arrow" src="@/assets/c_return_a@2x.png" alt />
    </div>

    <div class="i jus-b ali-c">
      <p class="left_i">姓名</p>
      <p class="right_i">{{profile.nickname||'未填'}}</p>
    </div>
    <div class="i jus-b ali-c">
      <p class="left_i">性别</p>
      <p class="right_i">{{profile.gender||'未填'}}</p>
    </div>
    <div class="i jus-b ali-c">
      <p class="left_i">手机号</p>
      <p class="right_i">{{profile.mobile||'未填'}}</p>
    </div>
    <div class="i jus-b ali-c">
      <p class="left_i">单位名称</p>
      <p class="right_i">{{profile.group_name||'未填'}}</p>
    </div>
    <div class="i jus-b ali-c">
      <p class="left_i">生日</p>
      <p class="right_i">{{profile.birthday||'未填'}}</p>
    </div>
  </div>
</template>

<script>
import { myCenter, setImg, userAvatar } from "@/request/api.js";
import navBar from "@/components/navBar/navBar";

import Vue from "vue";
import { Uploader } from "vant";

Vue.use(Uploader);

import { Toast } from "vant";

export default {
  name: "",
  components: { navBar },
  props: {},
  data() {
    return {
      profile: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      this.$loading();
      myCenter({
        token: localStorage.getItem("user_id"),
      })
        .then((res) => {
          Toast.clear();
          if (res.code == 1) {
            this.profile = res.data.info;
          }
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail("网络出现问题,请检查网络！");
        });
    },
    //更换头像
    afterRead(file) {
      let param = new FormData(); //创建form对象
      param.append("image", file.file);
      setImg(param).then((res) => {
        if (res.code == 1) {
          userAvatar({
            avatar: res.data.img,
          }).then((res) => {
            if (res.code == 1) {
              this.getData();
            }
          });
        } else {
          this.$tip(res.msg);
        }
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
.profileInfo {
  background-color: #f5f5f5;
  height: 100vh;
  .nav {
    background-color: white;
    .navTitle {
      font-size: 0.48rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #343434;
    }
  }

  .avatar {
    width: 100%;
    margin: 0.3rem 0;
    padding: 0 0.3rem;
    height: 1.87rem;
    background: #ffffff;
    .avatarImg {
      height: 1.5rem;
    }
    p {
      flex: 1;
      font-size: 0.38rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #343434;
    }
    img {
      width: 1.47rem;
      border-radius: 50%;
    }
    .arrow {
      width: 0.2rem;
      transform: rotateY(180deg);
      margin: 0 0.2rem;
    }
  }

  .i {
    padding: 0 0.3rem;
    height: 1.34rem;
    background: #ffffff;
    border-bottom: 0.02rem solid #eeeeee;
    .left_i {
      font-size: 0.38rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #343434;
    }
    .right_i {
      font-size: 0.38rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #9a9a9a;
    }
  }
}
</style>
