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
        <el-row v-if="developerInfo == null || developerInfo.developer.status == 2">
          <Warning />
        </el-row>

        <el-row>
          <el-form-item label="应用名称">
            <el-input
              v-model="name"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="英文名称">
            <el-input
              v-model="symbol"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="支付代币"
            prop="token"
          >
            <el-input v-model="postForm.token"></el-input>
          </el-form-item>
          <el-form-item
            label="收款账户"
            prop="username"
          >
            <el-input
              v-model="postForm.username"
              placeholder="该账户为dapp的收款账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="postForm.status"></el-switch>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >提交</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Warning from "@/components/Warning/index";
import { setDappPay, getDappPay } from "@/api/developer";
import { mapGetters } from "vuex";

const defaultForm = {
  id: 0,
  dappId:0,
  status:true,
  token: "",
  username: "",
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
      name: this.$route.query.n,
      symbol: this.$route.query.e ,
      rules: {
        token: [{ validator: validateRequire, trigger: "blur" }],
        username: [{ validator: validateRequire, trigger: "blur" }],
      }
    };
  },
  computed: {
    ...mapGetters(["developerInfo"])
  },
  methods: {
    submitForm() {
      let dappId = parseInt(this.$route.query.id);
      this.$refs.postForm.validate(valid => {
        if (valid) {
          var data ={
            id:this.postForm.id,
            dappId: dappId,
            status: this.postForm.status?1:0,
            token:this.postForm.token,
            username:this.postForm.username,
          }
          setDappPay(data).then(res => {
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "支付设置成功",
                type: "success",
                duration: 2000
              });
              this.$router.go(-1)
              // window.location.reload();
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
    }

  },
  created() {
    let dappId = parseInt(this.$route.query.id);

    getDappPay(dappId).then(res => {
      console.log(res,"=======");
      if (res.code == 0) {
        this.postForm.id = res.data.id;
        this.postForm.token = res.data.tokenSymbol;
        this.postForm.username = res.data.username;
        this.postForm.status = res.data.status == 1?true:false;
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
