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
      :file-list="fileList"
      list-type="picture"
      :multiple="isMultiple"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :modal-append-to-body="false"
      :resObj ="resObj"
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
      default: 2
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dislogUrl: "",
      dislogShow: false,
      fileList: [],
      resObj:''
    };
  },
  methods: {
    handlePreview(file) {
      this.dislogUrl = file.url;
      this.dislogShow = true;
    },
    handleRemove() {},
    handleExceed() {
      Msg.warn("超出最大文件限制");
    },
    uploadSuccess(response, file, fileList) {
      if(response)
      {
        this.resObj = JSON.stringify(response);
      }
    },
    handleErr(err, file, fileList) {
      Msg.error("文件上传失败，请刷新重试");
    },
    beforeUpload(file) {}
  }
};
</script>

<style scoped>
</style>