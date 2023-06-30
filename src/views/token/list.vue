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
      >
      </el-table-column>

      <el-table-column
        prop="symbol"
        label="英文标示"
      >
      </el-table-column>

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
        prop="quantityLimit"
        label="发行量"
      >
        <template slot-scope="scope">{{ formatQuantity(scope.row.quantityLimit ) }}</template>
      </el-table-column>

      <el-table-column
        prop="issueUsername"
        label="管理用户"
      >
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">{{ formatStatus(scope.row.status ) }}</template>
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="创建时间"
      >
        <template slot-scope="scope">{{ scope.row.create_time  | formatTimestamp }}</template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <router-link
            :to="'/coin/flow?tokenId='+scope.row.id"
            class="action"
          >
            流水
          </router-link>

          <router-link
            :to="'/coin/menber?tokenId='+scope.row.id"
            class="action"
          >
            用户
          </router-link>
          <br />
          <router-link
            :to="'/coin/issue?tokenId='+scope.row.id+'&s='+scope.row.symbol"
            class="action"
          >
            发行
          </router-link>
          <router-link
            :to="'/coin/issue-list?tokenId='+scope.row.id"
            class="action"
          >
            审核发行
          </router-link>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getTokens} from '@/api/token'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    async created(){  
      getTokens().then((res)=>{
         console.log(res);
        if(res.code == 0){
          this.tableData = res.data
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
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
      indexMethod(index){
         return index + 1;
      },
      formatStatus(status){
        switch (status) {
          case 0:
            return "审核中"
            break;
          case 2:
            return "审核不通过"
            break;
          case 1:
            return "审核通过"
            break;
        
          default:
            return "禁用"
            break;
        }
      },
      formatIcon(icon){
        return this.$IMGURL + icon
      },
      formatQuantity(quantit){  
        let s = quantit.toString();
        let l = s.length;
        // return s.substr(0,l-5)+"."+s.substr(l-5)
        return s/100000
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


