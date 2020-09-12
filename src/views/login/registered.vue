<template>
  <div class="registered">
    <div class="info">注册</div>
    <div class="options ali-c">
      <img src="@/assets/a_username@2x.png" alt />
      <input type="text" maxlength="11" placeholder="请输入账号" v-model="account" />
    </div>
    <div class="options ali-c">
      <img src="@/assets/a_password@2x.png" alt />
      <input type="password" maxlength="20" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="options ali-c">
      <img src="@/assets/tel.png" alt />
      <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="tel" />
    </div>
    <div class="options ali-c">
      <img src="@/assets/a_unitname@2x.png" alt />
      <input type="text" maxlength="20" v-model="companyName" placeholder="请输入单位名称" />
    </div>
    <div class="options ali-c">
      <img src="@/assets/a_fullname@2x.png" alt />
      <input type="text" maxlength="4" placeholder="请输入姓名" v-model="userName" />
    </div>
    <div class="options ali-c" @click="sexSelect">
      <img src="@/assets/a_gender@2x.png" alt />
      <input type="text" placeholder="请选择性别" readonly v-model="sex" />
    </div>
    <div class="options ali-c" @click="timeSelect">
      <img src="@/assets/a_years@2x.png" alt />
      <input type="text" placeholder="请选择出生年月" readonly v-model="birthday" />
    </div>
    <div class="options ali-c">
      <van-uploader :after-read="afterRead" :max-count="1">
        <img src="@/assets/a_picture@2x.png" alt />
        <input type="text" placeholder="请上传正面图片" v-if="!image" readonly />
        <img :src="'http://sggsxt.0791jr.com' + image" class="up_img" v-if="image" alt />
      </van-uploader>
    </div>
    <van-button class="logIn_btn" round size="large" @click="toReg" type="info">注册</van-button>
    <div class="text ali-c jus-c">
      <p>
        已有账号?
        <router-link to="/index/login"  tag="span">去登录</router-link>
      </p>
    </div>

    <!-- 性别选择 -->
    <van-popup v-model="sexShow" position="bottom" :style="{ height: '40%' }">
      <van-picker show-toolbar :columns="sexArr" @confirm="sexOnConfirm" @cancel="sexOnCancel" />
    </van-popup>
    <!-- 年月选择 -->
    <van-popup v-model="timeShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="timeConfirm"
        @cancel="timeCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Uploader } from "vant";
import Exif from "exif-js";
import { register, setImg } from "@/request/api.js";
import { u_formatTimestamp, u_Reg } from "@/utils/utils.js";

Vue.use(Toast, Uploader);
export default {
  name: "",
  components: {
    "van-uploader": Uploader,
  },
  data() {
    return {
      //-------------------数据变量--------------------
      account: "", //账号
      password: "", //密码
      companyName: "", //单位名称
      userName: "", //姓名
      sex: "", //性别 1男 2女
      birthday: "", //出生年月
      image: "", //正面图片
      tel: "", // 手机号

      //-------------------逻辑相关--------------------
      sexShow: false, //选择性别是否显示
      sexArr: ["男", "女"], //性别列表
      timeShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),

      picValue: "", // 图片文件
    };
  },
  watch: {},
  computed: {},
  methods: {
    //----------------选择性别弹窗-----------------
    sexSelect() {
      this.sexShow = true;
    },
    sexOnConfirm(e) {
      this.sex = e;
      this.sexShow = false;
    },
    sexOnCancel(e) {
      this.sexShow = false;
    },
    //----------------选择年月----------------
    timeSelect() {
      this.timeShow = true;
    },
    timeConfirm(e) {
      this.timeShow = false;

      let time = u_formatTimestamp(e, {
        type: "ymd",
      });

      this.birthday = time;
    },
    timeCancel() {
      this.timeShow = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    //----------------选择图片----------------
    afterRead(e) {
      console.log(e);
      this.picValue = e.file;
      this.imgPreview(this.picValue);
    },
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) {
        Toast.clear();
        this.$tip("很抱歉，您的设备不支持FileReader!");
        return;
      }

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.postImg(this.result);
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation);
              self.postImg(data);
            };
          }
        };
      }
    },
    postImg(imgs) {
      //这里写接口
      let uploadfile = this.dataURLtoFile(imgs);
      uploadfile = new File([uploadfile], this.picValue.name, {
        type: this.picValue.type,
      });

      let param = new FormData(); //创建form对象
      param.append("image", uploadfile); //通过append向form对象添加数据
      setImg(param).then((res) => {
        if (res.code == 1) {
          this.image = res.data.img;
        } else {
          console.log(res);
          this.$tip(res.msg);
        }
      });

      
    },
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    // 注册
    toReg() {
      if (!this.account) {
        this.$tip("请输入账号!");
        return;
      }
      if (!this.password) {
        this.$tip("请输入密码!");
        return;
      }
      if (!this.tel) {
        this.$tip("请输入手机号!");
        return;
      }
      if (!u_Reg(this.tel, "phone")) {
        this.$tip("请输入正确的手机号!");
        return;
      }
      if (!this.companyName) {
        this.$tip("请输入单位名称!");
        return;
      }
      if (!this.userName) {
        this.$tip("请输入姓名!");
        return;
      }
      if (!this.sex) {
        this.$tip("请选择性别!");
        return;
      }
      if (!this.birthday) {
        this.$tip("请选择出生年月!");
        return;
      }
      if (!this.image) {
        this.$tip("请上传正面照!");
        return;
      }

      this.$loading();
      register({
        username: this.account,
        password: this.password,
        imgae: this.image,
        nickname: this.userName,
        mobile: this.tel,
        gender: this.sex == "男" ? 1 : 2,
        birthday: this.birthday,
        group_name: this.companyName,
      }).then((res) => {
        Toast.clear();
        if (res.code == 1) {
          this.$tip("注册成功!");
          // localStorage.setItem("userInfos", JSON.stringify(res.data.user));
          // localStorage.setItem("token", res.data.user.token);
          setTimeout(() => {
            this.$router.push("/index/login");
          }, 1500);
        } else {
          this.$tip(res.msg);
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.registered {
  .info {
    font-size: 0.72rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #010101;
  }
  .options {
    min-height: 1rem;
    padding: 0 0.2rem;
    margin: 0.4rem 0;
    border-bottom: 0.02rem solid #e4e4e4;
    img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.2rem;
    }
    input {
      height: 0.6rem;
      padding: 0.1rem;
      flex: 1;
    }
    .up_img {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0.2rem 0;
      border: 1px solid #e9e9e9;
      border-radius: 0.1rem;
    }
  }
  .text {
    margin-top: 0.3rem;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: #9a9a9a;
    span {
      color: #3e80fc;
    }
  }
}
</style>
