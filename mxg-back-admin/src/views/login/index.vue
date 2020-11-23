<template>
<<<<<<< HEAD
  <div>
    login
=======
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
>>>>>>> a93065c8946ab87b68927085416a44283193af79
  </div>
</template>

<script>
import _ from "lodash";
// import {Prompt} from "../../utils/prompt"
// const message = new Prompt();
import { login } from "../../API/login";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
<<<<<<< HEAD
    return {};
=======
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
>>>>>>> a93065c8946ab87b68927085416a44283193af79
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
<<<<<<< HEAD
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped></style>
=======
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
>>>>>>> a93065c8946ab87b68927085416a44283193af79
