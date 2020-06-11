<!--  -->
<template>
  <div>
    <h2>111</h2>
    <el-button @click="login">登入</el-button>
    <el-button @click="getDataWithJson">Json Post</el-button>
    <el-button @click="getDataWithUrlcode">Json Urlencode</el-button>
  </div>
</template>

<script>
import { setLocalStorageToken } from "../../common/util";
import { Loading } from "element-ui";

export default {
  name: "test",
  data() {
    return {};
  },
  methods: {
    login() {
      const load = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
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
  }
};
</script>

<style scoped>
</style>