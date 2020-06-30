<!-- 登入页 -->
<template>
  <div class="bg">
    <div class="content">
      <el-form :rules="rules" :model="form">
        <el-form-item size="small" label="账号" prop="username">
          <el-input autocomplete="off" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item size="small" label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login" type="success" size="small" :round="false" @click="login">登 入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { Msg } from "../../common/util";
// import { setLocalStorageToken } from "../../common/util";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.myRequest
        .get(
          `/Account/Login?userName=${this.form.username}&passWord=${this.form.password}`
        )
        .then(json => {
          debugger;
          if (!json.Success) {
            Msg.error("账号密码不正确");
            return;
          }

          //设置token
          // setLocalStorageToken(json.Obj.token);

          //跳转首页
        });
    }
  }
};
</script>

<style scoped>
.bg {
  height: 100%;
  background-image: url("../../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content {
  height: 228px;
  width: 300px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  position: relative;
  top: calc(50% - 114px);
  overflow: hidden;
  border-radius: 5px;
  border: 1px #80808094 solid;
  padding-left: 20px;
  padding-right: 20px;
}
.login {
  width: 100%;
}
/* 
.el-form-item__content {
  margin-left: 0;
} */
</style>