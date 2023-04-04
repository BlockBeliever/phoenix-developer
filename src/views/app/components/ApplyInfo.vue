<template>
  <div class="container">
    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        申请账号Id ：
      </el-col>
      <el-col :span="16">
        <span>5</span>
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
        <span>5</span>
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
        <span>5</span>
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
        <span>5</span>
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
        <span>5</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="4"
        class="title"
      >
        种类 ：
      </el-col>
      <el-col :span="16">
        <span>5</span>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive



export default {
  name: 'Develop',
  
  directives: {
    clipboard
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
   
    return {
      block:true
    }
  },
  computed: {
   
  },
  created() {
   
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
