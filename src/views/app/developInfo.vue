<template>
  <div class="container">
    <div>
      <el-row>
        <el-col :span="4" class="title">
          DappId ：
        </el-col>
        <el-col :span="16">
          <span>{{ dappId }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">
          Dapp名称 ：
        </el-col>
        <el-col :span="16">
          <span>{{ name }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">
          英文名称 ：
        </el-col>
        <el-col :span="16">
          <span>{{ symbol }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="title">
          ClientId ：
        </el-col>
        <el-col :span="16">
          <span>{{ clientId }}</span>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy(clientId, $event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="title">
          Secret ：
        </el-col>
        <el-col :span="16">
          <span>
            {{ secret }}
          </span>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy(secret, $event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="title">
          PrivateKey ：
        </el-col>
        <el-col :span="16">
          <pre
            >{{ privateKey }}
        </pre
          >
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy(privateKey, $event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="title">
          PublicKey ：
        </el-col>
        <el-col :span="16">
          <pre
            >{{ publicKey }}
        </pre
          >
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-document"
            @click="handleCopy(publicKey, $event)"
          >
            copy
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import clip from "@/utils/clipboard"; // use clipboard directly
import clipboard from "@/directive/clipboard/index.js"; // use clipboard by v-directive
import { getDappDevelopInfo } from "@/api/developer";

export default {
  name: "DevelopInfo",

  directives: {
    clipboard
  },
  data() {
    return {
      dappId:0,
      clientId: "1",
      secret: "2",
      publicKey: "3",
      privateKey: "4"
    };
  },
  computed: {
    name() {
      return this.$route.query.n;
    },
    symbol() {
      return this.$route.query.e;
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event);
    }
  },
  created() {
    let id = this.$route.query.client;
    this.dappId = this.$route.query.dappId;
    let prent = this;

    getDappDevelopInfo(id).then(res => {
      console.log(res);
      if (res.code == 0) {
        prent.clientId = res.data.ID;
        prent.secret = res.data.Secret;
        prent.publicKey = res.data.PublickKey;
        prent.privateKey = res.data.PrivateKey;
      } else {
        console.log(res);
      }
    });
  }
};
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
