<template>
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="序号"
        width="180"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="用户Id"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="用户名"
      >
      </el-table-column>

      <el-table-column
        prop="address"
        label="余额"
      >
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' 
  export default {
    components: { Pagination },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        total: 200,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    methods: {
      getList() {
           this.total =200
      }
    }
  }
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


