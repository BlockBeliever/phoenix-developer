<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" label="序号" :index="indexMethod" width="
        50">
      </el-table-column>
      <el-table-column prop="token_name" label="名称"> </el-table-column>

      <el-table-column prop="token_symbol" label="英文标示"> </el-table-column>

      <el-table-column prop="token_icon" label="图标">
        <el-avatar slot-scope="scope" size="medium" :src="scope.row.base64Url"></el-avatar>
      </el-table-column>

      <el-table-column prop="quantity" label="发行量">
        <template slot-scope="scope">{{
          formatQuantity(scope.row.quantity)
        }}</template>
      </el-table-column>

      <el-table-column prop="comment" label="增发理由"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{
          formatStatus(scope.row.status)
        }}</template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">{{
          scope.row.create_time | formatTimestamp
        }}</template>
      </el-table-column>
      <el-table-column prop="approve_time" label="审核时间">
        <template slot-scope="scope">{{
          scope.row.approve_time | formatTimestamp
        }}</template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <span class="action" @click="approve(scope.row.id, 1)">
              通过
            </span>

            <span @click="approve(scope.row.id, 2)" class="action">
              不通过
            </span>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTokenIssues, approveIssues } from "@/api/token";
import { urlToBase64OfList } from "@/utils/EnAndDeFile";

export default {
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  async created() {
    this.loading = true
    const { code, data } = await getTokenIssues(parseInt(this.$route.query.tokenId))
    this.loading = false
    if (code !== 0) return
    data && data.forEach(item => {
      item.base64Url = ""
    })
    this.tableData = data || []
    this.tableData = await urlToBase64OfList(data, "token_icon")
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    formatStatus(status) {
      switch (status) {
        case 0:
          return "审核中";
        case 2:
          return "审核不通过";
        case 1:
          return "审核通过";
        default:
          return "审核中";
      }
    },
    formatQuantity(quantit) {
      return (quantit / 100000).toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",")
    },
    approve(id, status) {
      var id = parseInt(id);
      approveIssues(id, status).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "审核成功",
            type: "success",
            duration: 2000
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          this.$notify({
            title: "失败",
            message: res.message,
            type: "error",
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.action {
  color: #1890ff;
  font-size: 12px;
  padding: 0 5px;
}

.action:hover {
  font-weight: bolder;
}
</style>
