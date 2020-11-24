<template>
  <div>
    <el-container>
      <el-header>
        <p class="home_p">
          <img
            class="img1"
            src="http://mengxuegu.com:9999/img/logo.7156be27.png"
            width="30px"
            alt
          />
          <span>积云后台管理系统</span>
        </p>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="2">
            <template slot="title">admin</template>
            <el-menu-item index="2-1">修改密码</el-menu-item>
            <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            :router="true"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member">
              <i class="el-icon-user-solid"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff">
              <i class="el-icon-user"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <applink v-if="$route.path != '/home'"></applink>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { logout } from "../../API/login";
import applink from "../applink/applink";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {
    applink,
  },
  // 组件状态值
  data() {
    return {
      // name:"",
    };
  },
  created() {},
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async logout() {
      const res = await logout();
      console.log(res);
      if (res.status == 200) {
        this.$message.success("退出成功");
        this.$router.push("/login");
      }
    },
  },
};
</script> 
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #2d3a4b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // text-align: center;
  line-height: 60px;
  > .home_p {
    display: flex;
    align-items: center;
    > .img1 {
      margin-right: 12px;
    }
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  height: 100%;
  position: absolute;
  top: 60px;
  left: 0px;
  bottom: 0;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0;
  height: 100%;
}

body>.el-container {
  position: relative;
  margin-bottom: 40px;
  height: 100%;
}
> .el-dropdown-link {
  color: #fff;
}
.el-icon-arrow-down {
  color: #fff;
}
</style>
