<template>
  <div class="container">
    <div class="flexbox" v-if="developerInfo.developer.status==0">
        <div>
          <img src="https://files.axshare.com/gsc/7DON1M/0d/3c/90/0d3c90bdc637471db987c488ba2fc9c6/images/%E7%94%B3%E8%AF%B7%E4%B8%AD/u16.png?pageId=5f9d2780-4b0d-41da-afa6-f0c18dade4f7">
        </div>
        <span style="margin-top:20px;margin-bottom: 50px;">资料审核中，请耐心等待！</span>
      </div>
    <div class="flexbox" v-if="developerInfo.developer.status==1">
        <i class="el-icon-circle-check" style="font-size:58px; color:#67C23A"></i>
        <span style="margin-top:20px;margin-bottom: 50px;">恭喜您已认证成功</span>
      </div>
    <el-card v-if="developerInfo.developer.status==1||developerInfo.developer.status==0">
 <el-row>
      <el-col
        :span="4"
        class="title"
      >
        申请账号Id ：
      </el-col>
      <el-col :span="16">
        <span>{{developerInfo.developer.uid}}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        申请用户 ：
      </el-col>
      <el-col :span="16">
        <span>{{developerInfo.developer.username}}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        申请时间 ：
      </el-col>
      <el-col :span="16">
        <span>{{ developerInfo.developer.createTime | formatTimestamp}}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        申请理由 ：
      </el-col>
      <el-col :span="16">
        <span>{{ developerInfo.developer.applyComment }}</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        通过时间 ：
      </el-col>
      <el-col :span="16">
        <span>{{ developerInfo.developer.approveTime | formatTimestamp}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        状态 ：
      </el-col>
      <el-col :span="16">
        <span>{{status}}</span>
      </el-col>
    </el-row>

    </el-card>
   
    <el-card v-else>
      <div class="flexbox" v-if="!showformsubmit">
        <i class="el-icon-circle-close" style="font-size:58px; color:#F46C6C"></i>
        <span style="margin-top:20px">开发者申请失败</span>
      <el-button type="primary" style="margin-top:40px" @click="showformsubmit=true">重新申请</el-button>
      </div>
      <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
      v-if="showformsubmit"
    >
    
      <div class="createPost-main-container">
        
        <el-row>
          <Warning />
        </el-row>
        <el-row>
          <el-form-item
            label="用户ID"
            prop="comment"
          >
            <el-input
              type="text"
              :rows="5"
              disabled
              v-model="uid"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="申请理由"
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
    </el-card>
    
  </div>
</template>

<script>
import Warning from '@/components/Warning/index'
import { mapGetters } from "vuex";
import { appleyDeveloper } from '@/api/developer'
export default {
  name: 'DevelopInfo',
  
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(rule.field + '为必传项'))
      } else {
        return callback()
      }
    }
    return {
      showformsubmit:false,
      postForm: {comment:""},
      rules: {
        comment: [{ validator: validateRequire, trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(["developerInfo"]),
    ...mapGetters(["uid"]),
    status: function(){
      switch (this.developerInfo.developer.status) {
        case 0:
          return "审核中"
          break;
        case 2:
          return "审核不通过"
          break;
        case 1:
          return "审核通过"
          break;
      
        default:
          return "审核中"
          break;
      }
    }
  },
  methods:{
    submitForm() {
      console.log()
      // this.$emit('moveactive',2)
      var _parentThis = this;
      this.$refs.postForm.validate(valid => {
        if (valid) {
          appleyDeveloper(_parentThis.postForm.comment).then((res) => {
            if (res.code === 0) {
              this.$notify({
                title: '成功',
                message: '申请成功，等待审核',
                type: 'success',
                duration: 3000
              })
              window.location.reload()
              // this.$emit('moveactive',2)
              this.$router.push({ path: "/info/apply" })
            }else{
              this.$notify({
                title: '失败',
                message: res.message,
                type: 'error',
                duration: 3000
              })
            }
          })
          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.flexbox{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  padding: 50px 30px;

  .trip {
    font-weight: bolder;
    color: #999999;
  }
  .title {
    text-align: right;
    padding-right: 20px;
    font-weight: bolder;
  }

  pre {
    margin: 0;
  }

  .el-row {
    line-height: 50px;

    span {
      padding-right: 100px;
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
