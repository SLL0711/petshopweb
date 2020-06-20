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
      @select-all="selectAll"
      v-on:init="initData"
      :pageSizes="[4,8,12]"
    ></pager-table>

    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :show-close="false"
      :size="'40%'"
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
          <el-button type="primary" @click="submitForm('categoryForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { Msg } from "../../common/util";
import { axiosConfig } from "../../common/const";
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
              minWidth: 520,
              cellType: "img",
              // src:
              //   "http://localhost:5000/StaticFiles/Imgs/20200614/1592120726673.jpg"
              src:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAAAgCAYAAAA14BsbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQxNTc2QkJGRUNGMTFFOTg1M0VFQkI0MjQyRTlBMjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQxNTc2QkFGRUNGMTFFOTg1M0VFQkI0MjQyRTlBMjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMTBDNDBERTg4NDExRTc4OEU5RDY2OUREOTk5MDc5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIzMTBDNDBFRTg4NDExRTc4OEU5RDY2OUREOTk5MDc5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5V5DQwAABZFJREFUeNrsW2tsFUUUnkppsVBvqUiwIPKI1KJIwAbCK0BQEBMgGBA1vhKjRIEEAsYG/WMgAQIJKlAhRmkChUTUhJCQ8DAa4QeIAiby+KEoIo9CC6Ut0ELh+n3uuXG52e3dme7t3bV7ki+HLnceZ883M2fOzGbF43F1Puv+uPImp4vU5T7KBzmnCl+H2ujx5x+j3fm2sgVQHwBdBfcABaLvAzoCnYFc4F4pFnOpuwloBBqAG8AVoBaoAf4WnAaOAafQj9sqzSL2DQCKgf5AD6C76G5AJ7GTtuWkqK5RbKwHmoGr8m/a2/BgvGZmtgqn8CUt9KmuXEHMw2+b4CCS4TtgKwjxsw8O7wA1HJgAjACeFIf7JZ0ErvaFlQSZEpJlqGAhHLgbeg7I8JuB84dBzQaeE1JnTP7vJODUVyfT3y3bcy4V+bYp1VQmAgfh0Ekgwk8enf8o1EfApKC8pLCS4Cbwo6zVfwnOAFVANXARTqn16JQ8qH5AiUzF44FhGn0pBL5BPcVo80aKtt6C+kRmFFNhzHIQOM4YRWKXy6Lt8UqWLWZiHx8SO4lHJLYILwnwss/JOupHXdehfhVsE2e9CLVZAk0vwhf8MvBZCwRgILvEsJsk9ufSv8Poc7y1dqM/D0A9pjSMbFeCl7wVapNmsbEtvPA3DAnAUT8P6I0+lTEQ9YMAYuMl4PuIBC3LLs3f57kQgFPvGoP29wMD4ai1qZaZKDBMn+gOkBMuz1cZBJ8/AJNlqQqcoe1Jntb8faXDLDAEaqpmPQzyZrUVASISuK/hzAO8pFFkFZx23OH52wbNL0ddF6ItYuacz23VK8BqZaWevcinQJlDXRxg0zS7wC3exra2O7udOz1btnfcKo0BZgJ9PRbnaF2EUVvp8v/MO+imf4+gvuqgk6AIL+6oT20X+ujMZ6AWKysD6GZnl6RIvotBwMbt2QEZrZtTRO2PG5hyLBODQZcEnCIHB3BQ95CRnC5hhq4c2KkxUosM2qkNAwnaqzA7yf3+DMw6+6D3gAypZsSYQTv1EQmCLVy+pgi4BJ2UbeF6l9nhmkEbt8NAgrPAaJ/angGs9KMiOKECqsIhVuBZfb5DkVyJCRhD9FTWBY5SZZ3pew3meBrIVHAZ2lkKvSIppXvRwJRYGEjQDEP/9CmYS3sULLeA3NbZqkREnrStIxHeVd6TRTyWXgb0Aubanp8y6HKfTJAgShbdTZo7ANd73hN4Vd19ByGVzAGJJtj+ZsxwR7MLpREJgkUIniIu1Sz2pq18vWwndaQXiFQakSBYUt7KkbzdoM3FEQmCNRtUSzDsVbol/f2Fsm776sh0zAbPRyQIiMhZQmeNIk0OJFpn0HQF2n42IkEwZJTSuwl8xOHZh8q6A6kjTGfv4NYT6BiRIHOzAJNDGzSLbXNYUhggTlfWhy26vnkf+AV9eUG2rxEJbA7qkOb6ORXzCvlAjWLMC2xxiS0OK+tySYNBd3gayTuPZ9CvlcBTckPa1LYC4AlgCvAOn4U1bfwtDVHWce554JKybuReEM1sXeL6+b/fHrjd1EE9zBwmrpyPVNb3AMWa/WE+4bWWThXxf3vR1hghSolRnKrUIkEz6iLpToqdNUnxCAd3VwcwO5qcQS0P89lBwrASjyOAKd26pMf8PCu3lf3g6OZ1sP0edhtH5dbSe8ACZZ4mpt8GCKKYQEOy5KXb0RoCMCX9JTAYzt2pse1sBBgsPqys6+SHMv1iolNEPeHUy7sFe4Gv5SMY0xwEl6m1BGYHHlrxrGKcsr6CGtSWvgkrCZYDXynrFDCBfAHX+DxBTDRHfI5yvklUL5H7dYkfromuEvwB/A6cgOPOpsMY1MsYplLApStH/fe5WD+JB7ieFzrMZvkusxSXqVqxp0F0nYB/X5GYSf0jwABiY3I+fafOMQAAAABJRU5ErkJggg=="
            },
            {
              label: "跳转地址",
              cellType: "link",
              href: {
                value: "http://www.baidu.com/",
                label: "点我"
              }
            }
          ];

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
      this.drawer = false;
    },
    addCategory() {
      this.drawer = true;
    },
    submitForm() {
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
    tableRowClick() {},
    selectAll(s) {
      console.log(s);
    }
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