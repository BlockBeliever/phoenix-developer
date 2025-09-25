<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
      label-width="100px"
    >
      <div class="createPost-main-container">
        <el-row
          v-if="developerInfo == null || developerInfo.developer.status != 1"
        >
          <Warning />
        </el-row>

        <el-row>
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="postForm.name"></el-input>
          </el-form-item>

          <el-form-item label="英文名称" prop="symbol">
            <el-input v-model="postForm.symbol"></el-input>
          </el-form-item>
          <el-form-item label="应用图标" prop="icon">
                        <el-upload
              class="avatar-uploader"
              :action="$APIURL+'v1/developer/uplaod'"
              :data="uplaodData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="postForm.icon" :src="$IMGURL+postForm.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="应用URL" prop="domain">
            <el-input
              v-model="postForm.domain"
              placeholder="域名，主页必须是域名可以直接访问"
            ></el-input>
          </el-form-item>
          <el-form-item label="回调URL" prop="callbackUrl">
            <el-input
              v-model="postForm.callbackUrl"
              placeholder="回调目录，支付等消息回调信息"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否旋转" prop="isRotate">
            <el-checkbox v-model="postForm.isRotate" @change="handleRotateCheckbox($event)">
            </el-checkbox>
          </el-form-item>
          <el-form-item label="应用简介" prop="intro">
            <el-input
              v-model="postForm.intro"
              placeholder="一句话简介"
            ></el-input>
          </el-form-item>
          <el-form-item label="申请说明" prop="comment">
            <el-input
              type="textarea"
              :rows="5"
              v-model="postForm.comment"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm">修改</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Warning from "@/components/Warning/index";
import { editDapp, getDappDetail } from "@/api/developer";
import { mapGetters } from "vuex";

const defaultForm = {
  id: 0,
  name: "",
  symbol: "",
  icon: "",
  intro: "",
  comment: "",
  domain: "",
  callbackUrl: "",
  isRotate: 0
};

export default {
  name: "ApplyForm",
  components: { Warning },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        name: [{ validator: validateRequire, trigger: "blur" }],
        symbol: [{ validator: validateRequire, trigger: "blur" }],
        icon: [{ validator: validateRequire, trigger: "blur" }],
        intro: [{ validator: validateRequire, trigger: "blur" }],
        comment: [{ validator: validateRequire, trigger: "blur" }],
        domain: [{ validator: validateRequire, trigger: "blur" }],
        callbackUrl: [{ validator: validateRequire, trigger: "blur" }]
      },
       uplaodData:{"type":"dapp"}
    };
  },
  computed: {
    ...mapGetters(["developerInfo","uid"])
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          editDapp(this.postForm).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "编辑成功",
                type: "success",
                duration: 2000
              });
              window.location.reload();
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     handleAvatarSuccess(res, file){
     console.log(res);
      if(res["code"] == 0 && res["data"] != null){
        this.postForm.icon = res["data"]
      }else{
        this.$message.error('上传失败，请重试!');
      }
    },
    beforeAvatarUpload(file){
      if(this.uid == null  || this.uid <= 0){
          this.$message.error('您未登陆!');
      }
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 0.5MB!');
      }
      this.uplaodData.uid = this.uid;
      console.log("上传前");
    },
    handleRotateCheckbox(val) {
      if (val) {
        this.postForm.isRotate = 1;
      } else {
        this.postForm.isRotate = 0;
      }
    }
  },
  created() {
    let id = parseInt(this.$route.query.id);
    let prent = this;
    prent.postForm.id = id;
    getDappDetail(id).then(res => {
      console.log(res);
      if (res.code == 0) {
        prent.postForm.name = res.data.name;
        prent.postForm.symbol = res.data.symbol;
        prent.postForm.icon = res.data.icon;
        prent.postForm.intro = res.data.intro;
        prent.postForm.comment = res.data.comment;
        prent.postForm.domain = res.data.domain;
        prent.postForm.callbackUrl = res.data.callbackUrl;
        prent.postForm.isRotate = res.data.isRotate;
      } else {
        console.log(res);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
  width: 600px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
