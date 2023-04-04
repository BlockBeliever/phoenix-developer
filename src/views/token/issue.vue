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
          v-if="developerInfo == null || developerInfo.developer.status == 2"
        >
          <Warning />
        </el-row>

        <el-row>
          <el-form-item label="代币" prop="symbol">
            <el-input v-model="symbol" disabled></el-input>
          </el-form-item>

          <el-form-item label="发行量" prop="quantity">
            <el-input
              v-model="postForm.quantity"
              placeholder="必须为整数，后三位系统自动转化为小数"
            ></el-input>
          </el-form-item>

          <el-form-item label="发行说明" prop="comment">
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
import Warning from "@/components/Warning/index";
import { issueToken } from "@/api/token";
import { mapGetters } from "vuex";

const defaultForm = {
  comment: "", // 文章摘要
  quantity: "" // 文章图片
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
        comment: [{ validator: validateRequire, trigger: "blur" }],
        quantity: [{ validator: validateRequire, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["developerInfo"]),
    symbol() {
      return this.$route.query.s;
    }
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          var data = {
            comment: this.postForm.comment,
            quantity: this.postForm.quantity,
            tokenId: parseInt(this.$route.query.tokenId)
          };
          issueToken(data).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "申请成功，等待审核",
                type: "success",
                duration: 2000
              });
              this.$router.push({
                path: "/coin/issue-list",
                query: { tokenId: this.$route.query.tokenId }
              });
            } else {
              this.$notify({
                title: "成功",
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
  width: 600px;

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
