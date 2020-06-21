<!-- 宠物分类视图页 -->
<template>
  <div id="test">
    <el-button type="default" class="tableButton" @click="addCategory">添 加</el-button>
    <el-button type="default" class="tableButton" @click="importCategory">导 入</el-button>
    <el-button type="default" class="tableButton" @click="delsCategory">批量删除</el-button>

    <pager-table
      ref="pagertable"
      v-loading="loading"
      :tableInfo="tableInfo"
      v-on:selection-change="selectchange"
      v-on:delCategory="delCategory"
      v-on:editCategory="editCategory"
      v-on:init="initData"
      :pageSizes="[4,8,12]"
    ></pager-table>

    <!-- 抽屉 -->
    <drawer :drawer="drawer" @onclose="onclose" @handleclose="handleClose" @onopened="onopened">
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
    </drawer>
  </div>
</template>

<script>
import { Msg } from "../../common/util";

import { axiosConfig, appConfig } from "../../common/const";
import fileUploader from "../../components/content/fileuploader/fileUpload";
import pagertable from "../../components/content/table/table/pager-table";
import drawer from "../../components/content/drawer/drawer";

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
      },
      // 表单初始化数据
      currentrowdata: null,
      submitType: "add",
      rows: []
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
              minWidth: 120
            },
            {
              label: "更新人",
              value: "Modifiedby",
              minWidth: 120
            },
            {
              label: "更新时间",
              value: "Modifiedon",
              minWidth: 120
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
    onclose() {
      this.$refs.categoryForm.resetFields();
      this.$refs.upload.clearFiles();
    },
    onopened() {
      debugger;
      if (!!this.currentrowdata) {
        this.categoryForm.typename = this.currentrowdata.TypeName;
        this.$refs.upload.fileList.push({
          url: this.currentrowdata.imgUrl,
          name: this.currentrowdata.imgObj.FileName,
          response: {
            Obj: {
              fileId: this.currentrowdata.imgObj.FileId
            }
          }
        });
      }
    },
    submitForm() {
      debugger;
      let $this = this;
      if (
        !this.$refs.upload.fileList ||
        this.$refs.upload.fileList.length < 1
      ) {
        Msg.warn("请选择图片");
        return;
      }

      this.btnObj.btnName = "正在提交...";
      this.btnObj.isDisabled = true;

      var fileId = this.$refs.upload.fileList[0].response.Obj.fileId;

      let url =
        this.submitType == "add"
          ? "/PetCategory/AddCategory"
          : "/PetCategory/UpdateCategory";
      let postdata =
        this.submitType == "add"
          ? `TypeName=${this.categoryForm.typename}&fileId= ${fileId}`
          : `TypeName=${this.categoryForm.typename}&fileId= ${fileId}&CategoryId=${this.currentrowdata.CategoryId}`;

      this.myRequest.postUrlencode(url, postdata).then(res => {
        if (!res.Success) {
          Msg.error(res.Msg);
          return;
        }

        this.btnObj.btnName = "提 交";
        this.btnObj.isDisabled = false;
        this.drawer = false;
        //刷新table
        $this.$refs.pagertable.reload();
      });
    },
    importCategory() {
      Msg.info("添加分类...");
    },
    delsCategory() {
      if (!this.rows || this.rows.length < 1) {
        Msg.warn("请选择要删除的数据");
        return;
      }

      this.$confirm("是否确认删除？", {
        type: "warning"
      })
        .then(res => {
          let $this = this;
          let url = "/PetCategory/DeleteCategorys";
          let categoryIds = this.rows;
          this.myRequest.post(url,categoryIds).then(res => {
            if (!res.Success) {
              Msg.error(res.Msg);
              return;
            }
            //刷新table
            $this.$refs.pagertable.reload();
          });
        })
        .catch(err => {});
    },
    delCategory(row) {
      debugger;
      let $this = this;
      let url = "/PetCategory/DeleteCategory";
      let postdata = `categoryId=${row.CategoryId}`;

      this.myRequest.postUrlencode(url, postdata).then(res => {
        if (!res.Success) {
          Msg.error(res.Msg);
          return;
        }
        //刷新table
        $this.$refs.pagertable.reload();
      });
    },
    addCategory() {
      this.drawer = true;
      this.submitType = "add";
      this.currentrowdata = null;
    },
    editCategory(row) {
      this.submitType = "edit";
      this.currentrowdata = row;
      this.drawer = true;
    },
    selectchange(selection) {
      this.rows = selection.map((v, i) => {
        return v.CategoryId;
      });
    },
    tableRowClick() {}
  },
  components: {
    fileUploader,
    "pager-table": pagertable,
    drawer
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