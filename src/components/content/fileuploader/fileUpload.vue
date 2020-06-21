<!-- 文件上传插件 -->
<template>
  <div>
    <el-upload
      ref="upload"
      class
      :action="action"
      :limit="limit"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-error="handleErr"
      :file-list.sync="fileList"
      list-type="picture"
      :multiple="isMultiple"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :modal-append-to-body="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-dialog :visible.sync="dislogShow" :modal="showModal">
      <img width="100%" :src="dislogUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { Msg } from "../../../common/util";
export default {
  name: "fileUpload",
  props: {
    action: String,
    limit: {
      type: Number,
      default: 1
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    // 显示遮罩层
    showModal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dislogUrl: "",
      dislogShow: false,
      data: [],
      fileList: []
    };
  },
  methods: {
    handlePreview(file) {
      this.dislogUrl = file.url;
      this.dislogShow = true;
    },
    handleRemove(file, fileList) {
      debugger;
      this.fileList = fileList;
      // this.data = this.data.filter((v, i) => {
      //   v.uid !== file.response.uid;
      // });
    },
    handleExceed() {
      Msg.warn("超出最大文件限制");
    },
    // 存储文件上传返回数据 例如fileID
    uploadSuccess(response, file, fileList) {
      debugger;
      this.fileList = fileList;
      // let obj = {
      //   uid: file.uid,
      //   response
      // };
      // if (response) {
      //   this.data.push(obj);
      // }
    },
    handleErr(err, file, fileList) {
      Msg.error("文件上传失败，请刷新重试");
    },
    beforeUpload(file) {},
    // 清空图片列表
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.fileList = [];
    }
  }
};
</script>

<style scoped>
</style>