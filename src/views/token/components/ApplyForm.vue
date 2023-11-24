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
        <el-row v-if="developerInfo == null || developerInfo.developer.status != 1">
          <Warning />
        </el-row>

        <el-row>
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input v-model="postForm.name"></el-input>
          </el-form-item>

          <el-form-item
            label="英文标示"
            prop="symbol"
          >
            <el-input v-model="postForm.symbol"></el-input>
          </el-form-item>
          <el-form-item
            label="应用图标"
            prop="icon"
          >
          <TcUpload :type="'listType'" ref="imageRef" :accept="'image/*'" :imageUrl="'null'" :uploadPath="'developer/apply/'" @success="upSuccess"/>
          <!-- <UpFile :show="show" @fileList="getFileList" :filetype="filetype"></UpFile> -->
            <!-- <el-upload
              class="avatar-uploader"
              :action="$APIURL+'v1/developer/uplaod'"
              :data="uplaodData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="postForm.icon" :src="$IMGURL+postForm.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
          </el-form-item>
          <el-form-item
            label="发行量"
            prop="quantityLimit"
          >
            <el-input
              v-model="postForm.quantityLimit"
              placeholder="必须为整数，后五位系统自动转化为小数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="管理用户"
            prop="issueUsername"
          >
            <el-input v-model="postForm.issueUsername"></el-input>
          </el-form-item>
          <el-form-item
            label="代币官网"
            prop="website"
          >
            <el-input v-model="postForm.website"></el-input>
          </el-form-item>
          <el-form-item
            label="发行说明"
            prop="comment"
          >
            <el-input
              type="textarea"
              :rows="5"
              v-model="postForm.comment"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >立即申请</el-button>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Warning from '@/components/Warning/index'
import {generateToken} from '@/api/token'
import { mapGetters } from "vuex";
import TcUpload from '@/components/TcUpload'
const defaultForm = {
  name: '',
  symbol: '', // 文章题目
  icon: '', // 文章内容
  website: '', // 文章摘要
  comment: '', // 文章摘要
  issueUsername: '', // 文章外链
  quantityLimit: '', // 文章图片 
}

export default {
  name: 'ApplyForm',
  components: { Warning,TcUpload },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    return {
      show:true,
  filetype: ['image/*',  'img/*'],
      postForm: Object.assign({}, defaultForm),
      rules: {
        name: [{ validator: validateRequire , trigger: 'blur'}],
        symbol: [{ validator: validateRequire , trigger: 'blur'}],
        icon: [{ validator: validateRequire , trigger: 'blur'}],
        website: [{ validator: validateRequire , trigger: 'blur'}],
        comment: [{ validator: validateRequire , trigger: 'blur'}],
        issueUsername: [{ validator: validateRequire , trigger: 'blur'}],
        quantityLimit: [{ validator: validateRequire , trigger: 'blur'}],
      },
       uplaodData:{"type":"token"}
    }
  },
  computed: {
    ...mapGetters(["developerInfo","uid"]),
  },
  methods: {
    upSuccess(val) {
      if(val.length > 0){
        this.postForm.icon=val[0].url
      }else{
        this.postForm.icon=""
      }
    },
    // getFileList(e){
    //     this.postForm.icon=e
    //   },
    submitForm() {
      if(this.developerInfo == null || this.developerInfo.developer.status != 1){
        this.$notify({
            title: '失败',
            message: '您还不是开发者，不能发行代币',
            type: 'error',
            duration: 2000
          })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          generateToken(this.postForm).then((res)=>{
            if(res.code == 0){
              this.$notify({
                title: '成功',
                message: '申请成功，等待审核',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ path: "/coin/list" })
            }else{
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'error',
                duration: 2000
              })
            }

          })
         

        
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     handleAvatarSuccess(res, file){
      if(res["code"] == 0 && res["data"] != null){
        this.postForm.icon = res["data"]
      }else{
        this.$message.error('上传失败，请重试!');
      }
    },
    beforeAvatarUpload(file){
      if(this.uid == null || this.uid <= 0){
          this.$message.error('您未登陆!');
      }
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 0.5MB!');
      }
      this.uplaodData.uid = this.uid;
      console.log("上传前");
    }
  }
}
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
