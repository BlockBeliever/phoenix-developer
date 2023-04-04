<template>
  <div  class="">
    <div class="container-all" >
      <el-steps   style="margin-bottom: 20px" :active="active" v-if="developerInfo !=null&&developerInfo.developer.status==2">
          <el-step title="提交资料" ></el-step>
          <el-step title="等待审核"  ></el-step>
          <el-step title="认证失败"  ></el-step>
      </el-steps>
      <el-steps   style="margin-bottom: 20px" :active="active" v-else>
          <el-step title="提交资料"  ></el-step>
          <el-step title="等待审核"  ></el-step>
          <el-step title="认证成功"  ></el-step>
      </el-steps>
    </div>
    <apply-form v-if="developerInfo ==null"/>
    <apply-info v-else :status="developerInfo.status"  @moveactive="moveactive"/>
  </div>
</template>

<script>
import ApplyForm from './components/ApplyForm'
import ApplyInfo from './components/ApplyInfo'
import { mapGetters } from "vuex";

export default {
  name: 'CreateArticle',
  components: { ApplyForm ,ApplyInfo},
  computed: {
    ...mapGetters(["developerInfo"]),
    active: function(){
      if(this.developerInfo!=null){
        switch (this.developerInfo.developer.status) {
        case 0:
          return 2
          break;
        case 2:
          return 3
          break;
        case 1:
          return 3
          break;
      
        default:
          return 1
          break;
      }
      }else{
        return 1
      }
      
    }
  },
  data() {
    return {
    }
  },
  created(){
    this.$store.dispatch("developer/setDeveloperInfo");
  },
  methods:{
    moveactive(val){
      console.log(val)
      this.active=val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.container-all{
 
  width: 90%;
  margin: auto;
  margin-top:60px;
}
</style>