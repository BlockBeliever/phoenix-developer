<template>
  <div class="container">
    <div
      v-if="developerInfo == null || developerInfo.developer.status != 2"
      class="trip"
    >
      您还不是开发者
    </div>
    <div v-else>
      <el-row>
        <el-col
          :span="4"
          class="title"
        >
          ClientId ：
        </el-col>
        <el-col :span="16">
          <span>5</span>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy('asas',$event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :span="4"
          class="title"
        >
          Secret ：
        </el-col>
        <el-col :span="16">
          <span>
            5f486f43b5dc9054fe90034ccc1a5ef9
          </span>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy('asas',$event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :span="4"
          class="title"
        >
          PrivateKey ：
        </el-col>
        <el-col :span="16">
          <pre>
-----BEGIN rsa private key-----
MIIEpAIBAAKCAQEAmIOTpXEncFIsfQV//IYI9Jko+/3p7Q0KcTF8+4baDIhmIYP7
D2BVfwPUxCTPOL/A6BejksOyjtma4lddhgW1Iqt7//lFNoDHVnqCMbQrFKqZKjiC
3k5oS7mjmux6bfvK47GTiOzFpDoG25JXJg1D2s/Hi9j1cCNWpdF023UM7B5DNGYN
ZfHLKu0jQxwnCycxYh5VLY4RbuoJ9nHI+gnJ/O98/bruQSY1LsE2pXOfQsYT7G8Z
FBMb9MRc1w5VzqhLw3JdNGzRYo+E8MACWYUt+CG3r7Y8As9LaO8KPMqAnGjyPVyC
VM0VzluWCD5lt3YiwRniRnEIu50WVkV5juvXiQIDAQABAoIBAQCIjVZGzNdY89ot
Xh1HxeKCzhcp+B/YRNLSolKbChR1IDMBUyAYllI2VQHNVH/M+bMImxGzuFBJIoBQ
o5RzCO0zS4LMnyzfLdJMlYe4ZO4lpNFaQhq6XE15b48SiSTdEJKJ51aHRCd5cRLu
yUoKIdpdMagiiHDIpHtSIAWW8GhPhy8dH4Tox7eSIdAF8VmKbX9mkCktuwMNurjD
avLY5LFnFN8iDjZQThSgA6wh3FHa0SwL/bg2k+6z3UmKoM0u3u1qI0SnL6MfDNEH
pChwOwdymbRCBJAqO9ohuKAPm0Jwp+RrX2PYxd7mQ8Wdw+H5YanaC24zhFpC2VxJ
8Kk5GgpZAoGBAMfnMSDuooSNqghW+RVOLI0+VRCD24BqkXL0Tsvdgixi5Hqvw+9B
IkI3FLFzRktcKXReJVdD1onSkaWGljbTZWM0mo63qjn3E0lXV0i7BuLMr3FF7xEd
1CkrHyeHr21Gbkz+G0dlgx4Df/q9D2aupWK8ICejr+3BDVnNER5+UCH7AoGBAMNQ
AUApG7TCD4TRNC6zC3k8XjuJUOgCAjIYqJ6zhy2VaJTNmMsE/L8VsEoDK5wrfu9f
VjUlnaeknpfVMVBPBI3cDYAaeU3OzNkhBpROiwjN9JaD6pED54aYpp1P1LHanYM6
rvU3cSoqJaTMQTCx6QB3x/vALLFeI7erjZHc0zlLAoGAdR0aKDwGVHgWZHpnxTae
XUVmWp2VbF+CxQEiZMdqKwzo5IOy26miI37XjbqGNUJSOw2o/L4Oo4IMuBfoS0h/
/qXj4rbxcLIyx2X3CfIgb6ERK+CX1cRO9qt/vg39FZ0Mo+i/HI35Sg0s3j4DFto8
pGKox/Ba8oSGiNTeMao40h8CgYBUBsBy/PyJeI+6oVJk4OyHvPwBeyMOnYaaTNeG
Z1A5wTScCBO7DCs8fjU4skJ5zpCupQJunP9Fl2IPik3L8iLQcSJxwXH8koK4yyeM
eHoCULDwbFJnDxn1YwkTVrv3xEjNo1qP7slFzZoiWymUrIXEiMPFwDi6Gfkd1LV0
Ul+hHwKBgQCflA/MxTcmiHbBSbqZ5g7s+t4YuaYhJx7c4Y3BoqupAzks2t4k8GrQ
M9yssXtnXVaAtDshpPxCjWsHW4bNr4I+YSG+MyjDAzmCj0+VCZrt6ZxYDJTYwTAu
3eO+SlWxpOoX8h8uUvJdeCg8CrlegKbxmD2/LkF+/4CEmO6f0LilYg==
-----END rsa private key-----
        </pre>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy(` PrivateKeykey-----`,$event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :span="4"
          class="title"
        >
          PublicKey ：
        </el-col>
        <el-col :span="16">
          <pre>
-----BEGIN rsa public key-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmIOTpXEncFIsfQV//IYI
9Jko+/3p7Q0KcTF8+4baDIhmIYP7D2BVfwPUxCTPOL/A6BejksOyjtma4lddhgW1
Iqt7//lFNoDHVnqCMbQrFKqZKjiC3k5oS7mjmux6bfvK47GTiOzFpDoG25JXJg1D
2s/Hi9j1cCNWpdF023UM7B5DNGYNZfHLKu0jQxwnCycxYh5VLY4RbuoJ9nHI+gnJ
/O98/bruQSY1LsE2pXOfQsYT7G8ZFBMb9MRc1w5VzqhLw3JdNGzRYo+E8MACWYUt
+CG3r7Y8As9LaO8KPMqAnGjyPVyCVM0VzluWCD5lt3YiwRniRnEIu50WVkV5juvX
iQIDAQAB
-----END rsa public key-----
        </pre>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy('asas',$event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import { mapGetters } from "vuex";


export default {
  name: 'Develop',
  
  directives: {
    clipboard
  },
  data() {
    return {
    }
  },
  computed: {
   ...mapGetters(["developerInfo"]),
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
