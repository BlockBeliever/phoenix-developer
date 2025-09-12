<template>
  <div class="container">
    <!-- Header with download button -->
    <div class="header">
      <el-button type="primary" @click="downloadDocumentation">下载</el-button>
    </div>

    <!-- Documentation content -->
    <div class="documentation-content" v-html="documentationHtml"></div>
  </div>
</template>

<script>
export default {
  name: 'DevelopmentDocumentation',
  components: {},
  data() {
    return {
      documentationHtml: ''
    };
  },
  async mounted() {
    await this.loadDocumentation();
  },
  methods: {
    async loadDocumentation() {
      try {
        // Use the correct path from public directory
        const response = await fetch('/docs/DAPP_DOCUMENT.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.documentationHtml = await response.text();
        console.log('Documentation loaded successfully');
      } catch (error) {
        console.error('Failed to load documentation:', error);
        this.$message.error('Failed to load documentation');
      }
    },
    downloadDocumentation() {
      if (!this.documentationHtml) {
        this.$message.warning('No content to download');
        return;
      }
      
      // Create a blob with the HTML content
      const blob = new Blob([this.documentationHtml], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DAPP_DOCUMENT.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.documentation-content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  // Style the HTML content
  :deep(h1) {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  :deep(h2) {
    color: #34495e;
    margin-top: 30px;
    margin-bottom: 15px;
  }
  
  :deep(h3) {
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  
  :deep(h4) {
    color: #7f8c8d;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  
  :deep(p) {
    line-height: 1.6;
    margin-bottom: 12px;
    color: #555;
  }
  
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
  }
  
  :deep(pre) {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 16px;
    overflow-x: auto;
    margin: 15px 0;
    
    code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
    }
  }
  
  :deep(code) {
    background-color: #f1f3f4;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
  }
  
  :deep(ul, ol) {
    margin: 15px 0;
    padding-left: 30px;
    
    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}
</style>
