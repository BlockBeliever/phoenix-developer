<template>
  <div class="container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
        width="
        50"
      >
      </el-table-column>
      <el-table-column prop="token_name" label="名称"> </el-table-column>

      <el-table-column prop="token_symbol" label="英文标示"> </el-table-column>

      <el-table-column prop="token_icon" label="图标">
        <el-avatar
          slot-scope="scope"
          size="medium"
          :src="formatIcon(scope.row.token_icon)"
        ></el-avatar>
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

export default {
  data() {
    return {
      tableData: []
    };
  },
  async created() {
    var id = parseInt(this.$route.query.tokenId);
    getTokenIssues(id)
      .then(res => {
        if (res.code == 0) {
          this.tableData = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    formatStatus(status) {
      switch (status) {
        case 0:
          return "审核中";
          break;
        case 2:
          return "审核不通过";
          break;
        case 1:
          return "审核通过";
          break;

        default:
          return "审核中";
          break;
      }
    },
    formatIcon(icon) {
      return this.$IMGURL + icon;
    },
    formatQuantity(quantit) {
      let s = quantit.toString();
      let l = s.length;
      return s.substr(0, l - 3) + "." + s.substr(l - 3);
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
          setTimeout(function() {
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
