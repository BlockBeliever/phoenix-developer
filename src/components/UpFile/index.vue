<template>
  <div id="app">
    <!-- <el-dialog :title="title" :visible.sync="show"> -->
      <dashboard :uppy="uppy"  />
    <!-- </el-dialog> -->
   
    <!-- <div id="upload"></div> -->
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { getUpInfo,getHost } from "@/api/token";
import { Dashboard } from '@uppy/vue'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import Tus from '@uppy/tus'
import request from "@/utils/request";
import { string } from 'clipboard';

// import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";
// import Tus from "@uppy/tus";
// import "@uppy/core/dist/style.min.css";
// import "@uppy/dashboard/dist/style.min.css";

export default {
  name: "App",
  components: {
    Dashboard
  },
  props: {
    title: {
      type: String,
      default: "上传"
      },
      show: {
      type: Boolean,
      default: true
      },
      filetype: {
      type: Array,
      default: ['image/*', 'video/*', 'img/*', '.apk']
      },
    },
  data() {
    return {
      info: {},
      fileList:[]
    };
  },
  mounted() {
    // location.reload()
    this.getURLInfo();
  },
  computed: {
    uppy(){
      var info=this.info
      var type=this.filetype
      return new Uppy(
      {
          autoProceed: true,
          allowMultipleUploads: false, // 上传完成之后，是否可继续添加文件上传
          restrictions: {
              maxFileSize: 1024 * 1024 * 1024 * 4, // 以字节为单位
              maxNumberOfFiles: 100,
              minNumberOfFiles: 1,
              allowedFileTypes: type // mime类型(image/png)或者文件后缀名(.jpg)
          }
      }
    )
      .use(Webcam)

      // .setMeta({ Authorization: "Bearer "+getToken().access_token})
      .use(Tus, { endpoint:info.url+ '/big/upload/' ,
      chunkSize: 1024 * 1024 * 2,
      async onBeforeRequest(req) {
           req.setHeader( 'Authorization',  "Bearer "+getToken().access_token);
          req.setHeader('sign', info.sign);
      },
     })

      .on('complete', result => {
        console.log('successful files:', result.successful)
        if(result.successful.length>0){
          let arr=result.successful[0].uploadURL
        let md5=arr.split("/")
        // console.log(md5.length,md5[md5.length-1])
        let url= info.url+"/upload?md5="+md5[md5.length-1]+"&output=json2"
        setTimeout(()=>{
          request({
                  url:url,
                  method:'get',
                  params:{
                    "sign":info.sign
                  }
                  // headers:{
                  //   "sign":info.sign
                  // }
              }).then(res=>{
                if(res.status=="ok"){
                  this.fileList = [];
                  let arr=this.info.url.split("/")
                  arr.splice(-1,1)
                  let url=arr[0]+"//"+arr[2]+res.data.src
                  this.fileList.push(url)
                  this.$emit("fileList", this.fileList);
                }
              
              })
        },500)
            
        }
        
        
      })

    }

  },
  methods: {
   async getURLInfo() {
    var host=""
    let all={
      "name":1,
      "offset":0,
      "status":0,
      "limit":20,
      }   
    //  await getHost(all).then(({data}) => {
    //   console.log(data)
    //   host=data["records"][0].storage
    //   })
     await getUpInfo({})
        .then(({ data }) => {
          this.info = data;
        //   new Uppy()
        //     .use(Dashboard, { inline: true, target: "#upload" })
        //     // .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
        //     // uppy.setMeta({ auth_token: '9ee60e59-cb0f-4578-aaba-29b9fc2919ca',callback_url:'http://127.0.0.1/callback'})
        //     .use(Tus, {
        //       endpoint: data.url + "/big/upload/",
        //       chunkSize: 1024 * 1024 * 2,
        //       async onBeforeRequest(req) {
        //         req.setHeader("Authorization", "Bearer " + getToken().access_token);
        //         req.setHeader("sign", data.sign);
        //       },
        //     })
        })
    },
  },
  beforeDestroy() {
    // this.uppy.close();
  },
};
</script>
<style scoped>
::v-deep .uppy-Dashboard-inner{
width: 200px !important;
height: 160px !important;
}
::v-deep .uppy-Dashboard-AddFiles-title{
  margin-top:45px
}
</style>