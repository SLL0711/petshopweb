<!--  -->
<template>
  <div>
    <h2>111</h2>
    <el-button @click="login">登入</el-button>
    <el-button @click="getDataWithJson">Json Post</el-button>
    <el-button @click="getDataWithUrlcode">Json Urlencode</el-button>

    <h3 v-on:click="c">----------------------------ElementUI上传组件----------------------------</h3>
    <file-uploader :action="url" :limit="1" :showModal="false"></file-uploader>

    <template>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        :fit="true"
        highlight-current-row
        height="400"
        size="small"
        empty-text="暂无数据"
      >
        <el-table-column key="1" fixed="left" prop="date" label="日期" min-width="150"></el-table-column>
        <el-table-column key="2" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column key="3" prop="province" label="省份" width="120"></el-table-column>
        <el-table-column key="4" prop="city" label="市区" width="120"></el-table-column>
        <el-table-column key="5" prop="address" label="地址" width="300"></el-table-column>
        <el-table-column key="6" prop="zip" label="邮编" min-width="1020"></el-table-column>
      </el-table>
    </template>

    <h3>----------------------------自定义 pager-table ----------------------------</h3>
    <pager-table :tableInfo="tableInfo1" :pageSizes="[1,2,3]" v-on:init="initData"></pager-table>
  </div>
</template>

<script>
import { setLocalStorageToken } from "../../common/util";
import { Loading } from "element-ui";
import fileuploader from "../../components/content/fileuploader/fileUpload";
import pagertable from "../../components/content/table/table/pager-table";

export default {
  name: "test",
  data() {
    return {
      url: "http://localhost:5000/api/FileUpload/Upload",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      tableInfo1: {
        data: [],
        fieldList: [
          {
            type: "index",
            fixed: 1
          },
          {
            label: "类别名1",
            value: "TypeName1",
            minWidth: 120,
            sortable: 1,
            fixed: 1
          },
          {
            label: "类别名2",
            value: "TypeName2",
            minWidth: 120,
            sortable: 1
          },
          {
            label: "类别名3",
            value: "TypeName3",
            minWidth: 120,
            sortable: 1
          }
        ],
        btn: {
          btns: []
        },
        dataTotal: 2
      }
    };
  },
  methods: {
    initData(pageindex, pagesize) {
      let dataAll = [
        {
          TypeName1: "1",
          TypeName2: "2",
          TypeName3: "3"
        },
        {
          TypeName1: "4",
          TypeName2: "5",
          TypeName3: "6"
        },
        {
          TypeName1: "1",
          TypeName2: "2",
          TypeName3: "3"
        },
        {
          TypeName1: "4",
          TypeName2: "5",
          TypeName3: "6"
        },
        {
          TypeName1: "1",
          TypeName2: "2",
          TypeName3: "3"
        },
        {
          TypeName1: "4",
          TypeName2: "5",
          TypeName3: "6"
        },
        {
          TypeName1: "1",
          TypeName2: "2",
          TypeName3: "3"
        },
        {
          TypeName1: "4",
          TypeName2: "5",
          TypeName3: "6"
        },
        {
          TypeName1: "1",
          TypeName2: "2",
          TypeName3: "3"
        },
        {
          TypeName1: "4",
          TypeName2: "5",
          TypeName3: "6"
        }
      ];

      if (pageindex % 2 == 0) {
        this.tableInfo1.data = dataAll;
      } else {
        this.tableInfo1.data = [
          {
            TypeName1: "4",
            TypeName2: "5",
            TypeName3: "6"
          }
        ];
      }
    },
    c() {
      debugger;
      console.log(this);
    },
    login() {
      const load = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let url =
        "/api/Account/GetToken?userName=sll&passWord=123456&email=837316150@qq.com";
      this.myRequest.get(url).then(res => {
        load.close();
        setLocalStorageToken(res.Obj.token);
        console.log(res);
      });
    },
    getDataWithJson() {
      let obj = {
        className: "高一一班",
        childModel: {
          name: "sll",
          age: 18
        }
      };
      this.myRequest
        .post("/api/Account/PostMethodWithJson", obj, {
          timeout: 30 * 1000
        })
        .then(res => {
          console.log(res);
        });
    },
    getDataWithUrlcode() {
      let obj = "name=sll&age=18";
      this.myRequest
        .postUrlencode("/api/Account/PostMethodWithUrlcode", obj, {
          timeout: 30 * 1000
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  components: {
    "file-uploader": fileuploader,
    "pager-table": pagertable
  },
  props: {
    tableInfo: {
      type: Object,
      default() {
        return {
          data: [],
          fieldList: [],
          btn: {
            colname: "123"
          }
        };
      }
    }
  }
};
</script>

<style scoped>
</style>