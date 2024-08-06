<template>
  <div class="container">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" label="序号" :index="indexMethod" width="50">
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="symbol" label="英文标示"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <el-avatar slot-scope="scope" size="medium" :src="scope.row.base64Url"></el-avatar>
      </el-table-column>
      <el-table-column prop="quantityLimit" label="发行量">
        <template slot-scope="scope">{{
          formatQuantity(scope.row.quantityLimit)
        }}</template>
      </el-table-column>
      <el-table-column prop="issueUsername" label="管理用户"> </el-table-column>
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
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/coin/flow?tokenId=' + scope.row.id" class="action">
            流水
          </router-link>
          <router-link :to="'/coin/menber?tokenId=' + scope.row.id" class="action">
            用户
          </router-link>
          <br />
          <router-link :to="'/coin/issue?tokenId=' + scope.row.id + '&s=' + scope.row.symbol
            " class="action">
            发行
          </router-link>
          <router-link :to="'/coin/issue-list?tokenId=' + scope.row.id" class="action">
            审核发行
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTokens } from "@/api/token";
import { urlToBase64OfList } from "@/utils/EnAndDeFile";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  async created() {
    this.loading = true
    const { code, data } = await getTokens()
    this.loading = false
    if (code !== 0) return
    data && data.forEach(item => {
      item.base64Url = ""
    })
    this.tableData = data || []
    this.tableData = await urlToBase64OfList(data, "icon")
    console.log(this.tableData);

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
          return "禁用";
      }
    },
    formatQuantity(quantit) {
      return (quantit / 100000).toString().replace(/\B(?=(\d{5})+(?!\d))/g, ",")
    },
  },
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
