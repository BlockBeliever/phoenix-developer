<template>
  <div class="container">
    <!-- Create Button -->
    <div class="header">
      <el-button type="primary" @click="showCreateModal">创建文档</el-button>
    </div>

    <!-- Table -->
    <el-table :data="tableData" border style="width: 100%" v-loading="isLoading">
      <el-table-column type="index" label="序号" :index="indexMethod" width="50"></el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="path" label="文件路径" width="600">
        <template slot-scope="scope">
          <a :href="scope.row.path" target="_blank">{{ scope.row.path }}</a>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="创建时间">
        <template slot-scope="scope">{{
          new Date(scope.row.created_at * 1000).toLocaleString('shanghai', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })
        }}</template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
            <!-- <span class="action" @click="editFile(scope.row)">编辑</span> -->
            <!-- <span class="action" style="color: red;" @click="delFile(scope.row.id)">删除</span> -->
          <el-button type="danger" size="mini" @click="delFile(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Create/Edit Modal -->
    <el-dialog
      :key="modalKey"
      :title="isEdit ? '编辑文档' : '创建文档'"
      :visible.sync="dialogVisible"
      width="600px"
      @close="closeDialog"
    >
      <el-form
        ref="docForm"
        :model="docForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="文档名称" prop="name">
          <el-input v-model="docForm.name" placeholder="请输入文档名称"></el-input>
        </el-form-item>

        <el-form-item label="文档文件" prop="file">
          <TcUpload
            :key="uploadKey"
            ref="fileRef"
            :type="'listType'"
            :accept="'*/*'"
            :imageUrl="docForm.path || 'null'"
            :uploadPath="'developer/documentation/'"
            @success="uploadSuccess"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TcUpload from "@/components/TcUpload";
import { devDocFileList, devDocFileDel, devDocFileAdd, devDocFileEdit } from "@/api/developer";

const defaultForm = {
  name: "",
  path: "",
};

export default {
  name: 'DevelopmentDocumentation',
  components: { TcUpload },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    
    return {
      tableData: [],
      total: 0,
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      docForm: Object.assign({}, defaultForm),
      modalKey: 0, // Key for modal re-rendering
      uploadKey: 0, // Key for upload component re-rendering
      rules: {
        name: [{ validator: validateRequire, trigger: "blur" }],
        file: [{ validator: validateRequire, trigger: "blur" }],
      },
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        const res = await devDocFileList({type: 'DEVELOPMENT_DOCUMENTATION'});
        if (res.code == 0) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      } catch (err) {
        console.log(err);
        this.$message.error("加载数据失败");
      } finally {
        this.isLoading = false;
      }
    },

    showCreateModal() {
      this.isEdit = false;
      this.docForm = Object.assign({}, JSON.parse(JSON.stringify(defaultForm)));
      this.modalKey++; // Increment key to force modal re-render
      this.uploadKey++; // Increment key to force upload component re-render
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.docForm && this.$refs.docForm.resetFields();
      });
    },

    editFile(row) {
      this.isEdit = true;
      this.docForm = {
        id: row.id,
        name: row.name,
        path: row.path,
      };
      this.modalKey++; // Increment key to force modal re-render
      this.uploadKey++; // Increment key to force upload component re-render
      this.dialogVisible = true;
      
      this.$nextTick(() => {
        this.$refs.docForm && this.$refs.docForm.resetFields();
      });
    },

    closeDialog() {
      this.dialogVisible = false;
      this.docForm = Object.assign({}, JSON.parse(JSON.stringify(defaultForm)));
      this.$nextTick(() => {
        this.$refs.docForm && this.$refs.docForm.resetFields();
      });
    },

    uploadSuccess(files) {
      if (files.length > 0) {
        this.docForm.path = files[0].url;
      } else {
        this.docForm.path = "";
      }
    },

    submitForm() {
      this.$refs.docForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.updateFile();
          } else {
            this.createFile();
          }
        } else {
          this.$message.error("请完善必填信息");
          return false;
        }
      });
    },

    async createFile() {
      try {
        const data = {
          type: 'DEVELOPMENT_DOCUMENTATION',
          name: this.docForm.name,
          path: this.docForm.path
        };
        
        const res = await devDocFileAdd(data);
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "文档创建成功",
            type: "success",
            duration: 2000,
          });
          this.closeDialog();
          this.loadData();
        } else {
          this.$notify({
            title: "创建失败",
            message: res.message,
            type: "error",
            duration: 2000,
          });
        }
      } catch (error) {
        this.$notify({
          title: "创建失败",
          message: "网络错误",
          type: "error",
          duration: 2000,
        });
      }
    },

    async updateFile() {
      try {
        const data = {
          id: this.docForm.id,
          type: 'DEVELOPMENT_DOCUMENTATION',
          name: this.docForm.name,
          path: this.docForm.path
        };
        
        const res = await devDocFileEdit(data);
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "文档更新成功",
            type: "success",
            duration: 2000,
          });
          this.closeDialog();
          this.loadData();
        } else {
          this.$notify({
            title: "更新失败",
            message: res.message,
            type: "error",
            duration: 2000,
          });
        }
      } catch (error) {
        this.$notify({
          title: "更新失败",
          message: "网络错误",
          type: "error",
          duration: 2000,
        });
      }
    },

    async delFile(id) {
      try {
        await this.$confirm('确定要删除这个文档吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        const res = await devDocFileDel({ id });
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          this.loadData();
        } else {
          this.$notify({
            title: "删除失败",
            message: res.message,
            type: "error",
            duration: 2000,
          });
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$notify({
            title: "删除失败",
            message: "网络错误",
            type: "error",
            duration: 2000,
          });
        }
      }
    },

    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.action {
  color: #1890ff;
  font-size: 12px;
  padding: 0 5px;
  cursor: pointer;
}

.action:hover {
  font-weight: bolder;
}

.dialog-footer {
  text-align: right;
}
</style>
