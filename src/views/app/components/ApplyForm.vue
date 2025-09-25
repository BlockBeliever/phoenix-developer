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
            <TcUpload
              ref="imageRef"
              :type="'listType'"
              :accept="'image/*'"
              :imageUrl="'null'"
              :uploadPath="'developer/apply/'"
              @success="upSuccess"
            />
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
          <el-button type="primary" @click="submitForm">立即申请</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import TcUpload from "@/components/TcUpload";
import Warning from "@/components/Warning/index";
import { appleyDapp } from "@/api/developer";
import { mapGetters } from "vuex";

const defaultForm = {
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
  components: { Warning, TcUpload },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    return {
      show: true,
      filetype: ["image/*", "img/*"],
      postForm: Object.assign({}, defaultForm),
      rules: {
        name: [{ validator: validateRequire, trigger: "blur" }],
        symbol: [{ validator: validateRequire, trigger: "blur" }],
        icon: [{ validator: validateRequire, trigger: "blur" }],
        intro: [{ validator: validateRequire, trigger: "blur" }],
        comment: [{ validator: validateRequire, trigger: "blur" }],
        domain: [{ validator: validateRequire, trigger: "blur" }],
        callbackUrl: [{ validator: validateRequire, trigger: "blur" }],
      },
      uplaodData: { type: "dapp" },
    };
  },
  computed: {
    ...mapGetters(["developerInfo", "uid"]),
  },
  methods: {
    upSuccess(val) {
      if (val.length > 0) {
        this.postForm.icon = val[0].url;
      } else {
        this.postForm.icon = "";
      }
    },
    submitForm() {
      if (
        this.developerInfo == null ||
        this.developerInfo.developer.status != 1
      ) {
        this.$notify({
          title: "失败",
          message: "您还不是开发者，不能开发dapp",
          type: "error",
          duration: 2000,
        });
        return;
      }
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          appleyDapp(this.postForm).then((res) => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "申请成功，等待审核",
                type: "success",
                duration: 2000,
              });
              this.$router.push({ path: "/app/list" });
            } else {
              this.$notify({
                title: "成功",
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRotateCheckbox(val) {
      if (val) {
        this.postForm.isRotate = 1;
      } else {
        this.postForm.isRotate = 0;
      }
    }
  },
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
    border-color: #409eff;
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
