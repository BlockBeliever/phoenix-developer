<template>
  <div class="login-container">
    <div class="login-form">
      <div class="title-container">
        <h3 class="title">开发者平台</h3>
      </div>

      <div>
        <vue-qr :logo-src="imageUrl" :text="qrStr" :size="200" />
      </div>
      <div style="position:relative;margin-top:20px;">
        <div class="tips">
          <span>请使用钱包app扫码登陆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import { MessageBox } from 'element-ui'

import { preLogin, login } from '@/api/user'

export default {
  name: 'Login',
  components: {
    vueQr
  },
  data() {
    return {
      preLogin: {},
      timer: '',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      imageUrl: require('../../assets/images/logo.jpg'),
      qrStr: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async created() {
    // window.addEventListener('storage', this.afterQRScan)
    var res = await preLogin()
    this.preLogin = res.data

    var content = {
      'uuid': this.preLogin.uuid,
      'callType':"developer",
      'clientId': this.preLogin.clientId.toString()
    }
    var qrMap = {
      'type': 'developlogin',
      'content': content,
      'timestamp': this.preLogin.createTime.toString()
    }
    this.qrStr = JSON.stringify(qrMap)

    // console.log(res);
  },
  mounted() {
    this.timer = setInterval(this.handleLogin, 2000)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {

    handleLogin() {
      var now = Date.parse(new Date())
      if (now > this.preLogin.createTime * 1000 + 180 * 1000) {
        clearInterval(this.timer)
        MessageBox.alert('二维码已经过期，请刷新！', {
          confirmButtonText: '刷新',
          type: 'warning'
        }).then(() => {
          location.reload()
        }).catch(() => {
          location.reload()
        })
      }
      login(this.preLogin.uuid).then((res) => {
        if (res.code === 0) {
          clearInterval(this.timer)
          // 保存信息到store 和 存储
          this.loading = true
          this.$store.dispatch('user/login', res.data)
          console.log('跳转')
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 270px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
