<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
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
  </div>
</template>

<script>
import Warning from '@/components/Warning/index'
import { appleyDeveloper } from '@/api/developer'
import { mapGetters } from "vuex";
export default {
  name: 'ApplyForm',
  components: {  Warning,},
  computed: {
    ...mapGetters(["uid"])
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(rule.field + '为必传项'))
      } else {
        return callback()
      }
    }
    return {
      active:0,
      postForm: {comment:""},
      rules: {
        comment: [{ validator: validateRequire, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      var _parentThis = this;
      this.$emit('active',2)
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

.createPost-container {
  position: relative;

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
