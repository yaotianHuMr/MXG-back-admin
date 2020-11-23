<template>
  <div class="login_wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>梦学古会员管理系统</h1>
      </div>
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tologin('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";
// import {Prompt} from "../../utils/prompt"
// const message = new Prompt();
import { login } from "../../api/login";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      form: {
        username: "admin",
        password: "admin"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //节流
    tologin: _.throttle(function(formName) {
      this.onLogin(formName);
    }, 5000),
    //登录
    onLogin(formName) {
      this.$refs[formName].validate(async valid => {
        //如果验证通过,则调用登录接口,进行登录,否在,给用户一个提示信息
        if (valid) {
          //获取登录接口的数据
          const res = await login(this.form.username,this.form.password);
          //如果登录成功,跳转到首页
          console.log(res);
          if(res.data.flag){
            this.$router.push('/')
            sessionStorage.setItem('token',res.data.code)
            console.log(res.data.code)
          }else{
            this.$message("登录失败")
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script> 
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.login_wrap {
  width: 100%;
  height: 100%;
  background: url("http://mengxuegu.com:9999/img/login.b665435f.jpg");
  background-size: 100% 100%;
  position: absolute;
}
.input {
  margin-right: 30px;
  box-sizing: border-box;
  margin-bottom: 40px;
}
.box-card {
  margin: 0px auto;
  margin-top: 180px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
  margin: 150px auto;
  padding: 30px 50px 30px 30px;
}
</style>
