<template>
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
        width="
        50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
      > </el-table-column>

      <el-table-column
        prop="symbol"
        label="英文名称"
      > </el-table-column>

      <el-table-column
        prop="icon"
        label="图标"
      >
        <el-avatar
          slot-scope="scope"
          size="medium"
          :src="cover(scope.row.icon)" 
        ></el-avatar>
      </el-table-column>

      <el-table-column
        prop="domain"
        label="URL"
      > </el-table-column>

      <el-table-column
        prop="callbackUrl"
        label="回调URL"
      > </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">{{
          formatStatus(scope.row.status)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="isPublish"
        label="是否发布"
      >
        <template slot-scope="scope">{{
          formatPublish(scope.row.isPublish)
        }}</template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间"
      >
        <template slot-scope="scope">{{
          scope.row.createTime | formatTimestamp
        }}</template>
      </el-table-column>
      <el-table-column
        prop="approveTime"
        label="审核时间"
      >
        <template slot-scope="scope">{{
          scope.row.approveTime | formatTimestamp
        }}</template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <!-- <router-link
            :to="'/app/edit?id=' + scope.row.id"
            class="action"
          >
            编辑
          </router-link> -->
          <router-link
            :to="'/app/menber?tokenId=' + scope.row.id"
            class="action"
          >
            用户
          </router-link>
          <span
            class="action"
            @click="publish(scope.row.id)"
            v-if="scope.row.isPublish == 0 || scope.row.isPublish == 3"
          >
            发布
          </span>
          <span
            class="action"
            @click="downToken(scope.row.id)"
            v-if="scope.row.isPublish == 1"
          >
            下架
          </span>
          <span
            class="action"
            @click="delToken(scope.row.id)"
          >
            删除
          </span>
          <br />
         
          <router-link
            :to="
              '/app/pay?id=' +
                scope.row.id +
                '&n=' +
                scope.row.name +
                '&e=' +
                scope.row.symbol
            "
            class="action"
            v-if="scope.row.status == 1"
          >
            支付
          </router-link>
          <router-link
            :to="
              '/app/develop-info?client=' +
                scope.row.clientId +
                '&n=' +
                scope.row.name +
                '&e=' +
                scope.row.symbol+
                '&dappId=' +
                scope.row.id
            "
            class="action"
            v-if="scope.row.status == 1"
          >
            开发者
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDapps, publishDapp,tokenDel,tokenDown } from "@/api/developer";

export default {
  data() {
    return {
      tableData: []
    };
  },
  async created() {
    console.log("ceshi");
    getDapps()
      .then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    cover(val){
			let arr=val.split("/")
			if(arr[0]=="http:"||arr[0]=="https:"){
				return val
			}else{
				if(val.indexOf("thumb2.jpg") != -1){
				    return this.$IMGURL+'/'+val
				}else{
				    return this.$IMGURL+val
				}
			}
		},
    downToken(id){
      tokenDown({id:id}).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "下架成功",
            type: "success",
            duration: 2000
          });
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          this.$notify({
            title: "下架失败",
            message: res.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    delToken(id){
      tokenDel({id:id}).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          this.$notify({
            title: "删除失败",
            message: res.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
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
        case 3:
          return "禁用";
          break;

        default:
          return "审核中";
          break;
      }
    },
    formatPublish(isPublish) {
      switch (isPublish) {
        case 0:
          return "未发布";
          break;
        case 1:
          return "已发布";
          break;
        default:
          return "未发布";
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
    publish(id) {
      var id = parseInt(id);
      publishDapp(id).then(res => {
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
  cursor: pointer;
  font-weight: bolder;
}
</style>
