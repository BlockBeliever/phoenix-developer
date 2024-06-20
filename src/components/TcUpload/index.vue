<template>
  <div>
    <img src="" alt="" />
    <!-- list-type上传 -->
    <el-upload
      v-if="type === 'listType'"
      action=""
      :class="{ hide: hideUpload }"
      list-type="picture-card"
      :http-request="avatarUpload"
      :limit="limit"
      :file-list="fileList"
      :accept="accept"
      multiple
      :on-success="handleSuccess"
      :on-change="handleChange"
    >
      <div slot="file" slot-scope="{ file }">
        <img
          v-for="(item, index) in fileList"
          :key="index"
          class="el-upload-list__item-thumbnail"
          :src="item.base64Url"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <!-- 拖拽上传 -->
    <el-upload
      v-if="type === 'drag'"
      class="upload-demo"
      drag
      multiple
      :http-request="dragUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">请将上传文件拖至此处 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          <!-- jpg/png files with a size less than 500kb -->
        </div>
      </template>
    </el-upload>
    <!-- 按钮上传 -->
    <div v-if="type === 'button'">
      <input
        :id="id"
        type="file"
        style="display: none"
        name="single"
        multiple
        :accept="accept"
        @change="selectdFile"
      />
      <el-button type="primary" size="small" @click="handleOpenFile">
        <i class="fa fa-upload" />
        {{ buttonName }}
      </el-button>
    </div>
  </div>
</template>

<script>
import cos from "@/utils/cos.js";
import md5 from "js-md5";
import { encryption, getFileFromUrl, decryption } from "@/utils/EnAndDeFile";
export default {
  name: "TcUpload",
  props: {
    // 图片路径
    imageUrl: {
      type: [String, Array],
      default: "",
    },
    // 上传模式
    type: {
      type: String,
      default: "",
    },
    // 限制上传数量
    limit: {
      type: Number,
      default: 1,
    },
    // 文件选取限制
    accept: {
      type: String,
      default: "*",
    },
    // 按钮名称
    buttonName: {
      type: String,
      default: "点击上传",
    },
    // 上传路径地址
    uploadPath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      id: "upload-video-id-" + +new Date(),
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      hideUpload: false,
    };
  },
  mounted() {
    if (this.imageUrl !== "null") this.hideUpload = true;
    setTimeout(() => {
      this.getFileList();
    }, 800);
  },
  methods: {
    handleSuccess(res, file, filelist) {
      this.fileList = filelist;
    },
    async getFileList() {
      if (this.imageUrl !== "null") {
        const file = await getFileFromUrl(this.imageUrl, "img");
        const base64Url = await decryption(file);
        this.fileList.push({
          base64Url,
        });
      } else {
        this.fileList.length = 0;
      }
    },
    handleChange(file, fileList) {
      //上传图片后将 hideUpload 变量设置为 false
      this.hideUpload = fileList.length >= this.limit;
    },
    handlePictureCardPreview(uploadFile) {
      this.dialogImageUrl = uploadFile.base64Url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((item) => item.uid === file.uid);
      this.fileList.splice(index, 1);
      this.hideUpload = this.fileList.length >= this.limit;
      this.$emit("success", this.fileList);
    },
    // list-type上传
    avatarUpload({ file }) {
      this.upload(file);
    },
    // 点击按钮选择文件
    selectdFile($event) {
      const file = $event.target.files[0];
      if (file) {
        this.upload(file);
      }
    },
    // 拖拽选择文件
    dragUpload({ file }) {
      this.upload(file);
    },
    // 上传
    async upload(file) {
      const _this = this;
      const newFile = await encryption(file);
      try {
        let index = newFile.name.lastIndexOf(".");
        // 直接调用 cos sdk 的方法
        cos.uploadFile(
          {
            Bucket: "flct-1319989102" /* 填写自己的 bucket，必须字段 */,
            Region: "ap-singapore" /* 存储桶所在地域，必须字段 */,
            Key: `${
              this.uploadPath
            }phoenixadmin/${new Date().toLocaleDateString()}/${md5(
              newFile.name.substring(0, index + 1)
            )}${Date.now()}.${newFile.name.substring(
              index + 1,
              newFile.name.length
            )}` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            Body: newFile,
            SliceSize:
              1024 *
              1024 *
              300 /* 触发分块上传的阈值，超过300MB 使用分块上传，小于300MB使用简单上传。可自行设置，非必须 */,
            onProgress: function (progressData) {
              _this.$emit("progress", progressData);
            },
          },
          async function (err, data) {
            if (err) {
              _this.$message.error("上传失败！");
              setTimeout(() => {
                this.$emit("fail");
              }, 2000);
            } else {
              _this.$message.success("上传成功！");
              // _this.$emit('success', data)
              let url = "https://" + data.Location;
              // const file = await getFileFromUrl(url, newFile.name)
              const base64Url = await decryption(url);
              _this.fileList = [];
              _this.fileList = [{ url, base64Url }];
              // _this.fileList = [{ url: 'https://' + data.Location }]
              _this.$emit("success", _this.fileList);
            }
          }
        );
      } catch (error) {
        _this.$message.error(error);
      }
    },
    // 点击按钮选择文件
    handleOpenFile() {
      document.getElementById(this.id).click();
    },
  },
};
</script>

<style lang="scss">
/* 推荐，实现简单 */
// .el-upload-list__item.is-ready,
// .el-upload-list__item.is-uploading {
//   display: none !important;
// }

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 146px;
  height: 146px;
}

.hide .el-upload--picture-card {
  display: none;
  /* 上传按钮隐藏 */
}
</style>
