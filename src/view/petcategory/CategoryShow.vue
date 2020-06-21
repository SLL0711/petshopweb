<!-- 宠物分类视图页 -->
<template>
  <div id="test">
    <el-button type="default" class="tableButton" @click="addCategory">添 加</el-button>
    <el-button type="default" class="tableButton" @click="importCategory">导 入</el-button>
    <el-button type="default" class="tableButton" @click="delsCategory">批量删除</el-button>

    <pager-table
      v-loading="loading"
      :tableInfo="tableInfo"
      v-on:delCategory="delCategory"
      v-on:editCategory="editCategory"
      v-on:init="initData"
      :pageSizes="[4,8,12]"
    ></pager-table>

    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :show-close="false"
      :size="'33%'"
      :destroy-on-close="true"
      @open="onopen"
    >
      <el-form
        :model="categoryForm"
        ref="categoryForm"
        label-width="100px"
        class="demo-ruleForm"
        style="padding:0px 20px;"
      >
        <el-form-item label="类别名称" prop="typename" :rules="categoryForm.rules">
          <el-input type="typename" v-model="categoryForm.typename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <file-uploader ref="upload" :action="url" :limit="1" :showModal="false"></file-uploader>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('categoryForm')"
            :disabled="btnObj.isDisabled"
          >{{btnObj.btnName}}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { Msg } from "../../common/util";

import { axiosConfig, appConfig } from "../../common/const";
import fileUploader from "../../components/content/fileuploader/fileUpload";
import pagertable from "../../components/content/table/table/pager-table";

export default {
  name: "category",
  data() {
    return {
      loading: false,
      tableInfo: {
        data: [],
        fieldList: [],
        btn: {
          colname: "",
          btns: []
        },
        dataTotal: 0
      },
      url: axiosConfig.baseUrl + "/FileUpload/UploadCategoryPic",
      drawer: false,
      direction: "rtl",
      categoryForm: {
        typename: "",
        rules: [
          { required: true, message: "类别名称不能为空" },
          { max: 50, message: "类别名称不能超过50位" }
        ]
      },
      btnObj: {
        btnName: "提 交",
        isDisabled: false
      }
    };
  },
  methods: {
    // 获取初始数据
    initData(pageindex, pagesize) {
      this.loading = true;
      this.myRequest
        .postUrlencode(
          "/PetCategory/GetCategoryList",
          `pageIndex=${pageindex}&pageSize=${pagesize}`
        )
        .then(res => {
          this.loading = false;
          if (!res.Success) {
            Msg.error(res.Msg);
            return;
          }

          // table组件列展示
          let fieldList = [
            {
              type: "selection"
            },
            {
              label: "类别名",
              value: "TypeName",
              minWidth: 120,
              sortable: 1,
              fixed: 1
            },
            {
              label: "创建人",
              value: "Createdby",
              minWidth: 120
            },
            {
              label: "创建时间",
              value: "Createdon",
              minWidth: 220
            },
            {
              label: "图片",
              value: "imgUrl",
              minWidth: 100,
              cellType: "img"
            }
            // {
            //   label: "超链接",
            //   value: "address",
            //   minWidth: 100,
            //   cellType: "link",
            //   hreflabel: "TypeName"
            // }
          ];

          res.Rows.map((v, i) => {
            v.imgUrl =
              v.imgObj == null
                ? ""
                : `${appConfig.docBaseUrl}/${v.imgObj.FilePath}`;

            // v.address = `http://www.baidu.com?v=${i}`;
          });

          this.tableInfo = {
            data: res.Rows,
            fieldList: fieldList,
            btn: {
              btns: [
                {
                  label: "编辑",
                  clickFn: "editCategory"
                },
                {
                  label: "删除",
                  clickFn: "delCategory"
                }
              ]
            },
            dataTotal: res.Obj.Total
          };
        });
    },
    handleClose(done) {
      // debugger
      this.drawer = false;
    },
    onopen() {
      this.$refs.categoryForm && this.$refs.categoryForm.resetFields();
      // if (this.$refs.upload.resObj) {
      //   this.$refs.upload.resObj = null;
      // }
    },
    addCategory() {
      this.drawer = true;
    },
    submitForm() {
      debugger;
      if (!this.$refs.upload.resObj) {
        Msg.warn("请选择图片");
        return;
      }

      this.btnName = "正在提交...";

      var fileId = JSON.parse(this.$refs.upload.resObj).Obj.fileId;
      this.myRequest
        .postUrlencode(
          "/PetCategory/AddCategory",
          "TypeName=" + this.categoryForm.typename + "&fileId=" + fileId
        )
        .then(res => {});
    },
    importCategory() {
      Msg.info("添加分类...");
    },
    delsCategory() {
      Msg.warn("添加分类...");
    },
    delCategory() {
      Msg.error("添加分类...");
    },
    editCategory() {
      Msg.error("编辑分类...");
    },
    tableRowClick() {}
  },
  components: {
    fileUploader,
    "pager-table": pagertable
  },
  created() {}
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>