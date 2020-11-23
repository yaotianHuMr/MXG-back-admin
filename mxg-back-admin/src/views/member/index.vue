<template>
  <div class="mine">
    <!-- 面包屑 -->
    <div class="member_bread">
      <p>会员管理</p>
    </div>

    <!-- 搜索栏 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="vipCard" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="vipname" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="OnSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="OnPush">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>


    <div>
      <el-table :data="list" height="380" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="cardNum" type="cardNum" label="会员卡号"></el-table-column>
        <el-table-column prop="name" type="name" label="会员姓名"></el-table-column>
        <el-table-column prop="birthday" type="birthday" label="会员生日"></el-table-column>
        <el-table-column
          type="phone"
          label="手机号码"
          width="110"
          prop="phone"
        ></el-table-column>
        <el-table-column prop="integral" type="integral" label="可用积分"></el-table-column>
        <el-table-column prop="money" type="money" label="开卡金额"></el-table-column>
        <el-table-column prop="payType" type="payType" label="支付类型"></el-table-column>
        <el-table-column
          type="address"
          label="会员地址"
          width="180"
          prop="address"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出对话框 -->
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认删除这条记录吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="OnClick">确 定</el-button>
  </span>
</el-dialog>
 <!-- 弹出对话框 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import {getList} from "../../API/member";
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
      dialogVisible: false,//控制弹出层隐藏显示
      list: [],
      formInline:[],//数据列表
      vipCard:'',//会员卡号
      vipname:'',//会员名称
      pid:'',
      page:1,
      pages:5
    };
    return {};
  },

  methods: {
   async fetchData() {
      let data = await getList()
      // console.log(data)
    },
    handleEdit(id) {
      console.log("编辑");
    },
    handleSizeChange(val){
      this.pages = val
    },
    handleCurrentChange(val){
      this.page = val
    },
    //删除
    del(row){
      this.dialogVisible = true;
      console.log(row);
      this.pid = row
    },
    OnClick(){
      this.dialogVisible = false;
      // axios.DELETE('http://mengxuegu.com:9999/pro-api/member/10',{this.pid}).then(res=>{
      //   console.log(res);
      // })
       const myConfig = {
            method: "DELETE",
            url: 'http://mengxuegu.com:9999/pro-api/member/10',
            data: {
                id:this.pid.id
            }
          };      
          axios(           
            myConfig
          ).then(res => {
           console.log(res);
           if(res.data.code === 2000){
              this.axio()
           }
          }).catch(error => {
          console.log('删除失败');
          });
    },
    //请求数据
    axio(){
  this.fetchData();
    getList().then(res=>{
      console.log(res.data.data.rows);
      this.list = res.data.data.rows
      this.lists = res.data.data.rows
    })
    },
    //查询
    OnSearch(){
      // // console.log(this.lists[0].cardNum);
      // this.lists.forEach(e=>{
      //   // console.log(this.vipCard);
      //   if(this.vipname){
      //     if(e.name.includes(this.vipname)){
      //       this.list.push(e)
      //       console.log(e);
      //     }
      //   }
      // })
    },
    //新增
    OnPush(){

    },
    //重置
    onSubmit(){
      this.vipCard = '',
      this.vipname = ''
    },
  },

  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  // methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    
  },
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    this.axio()
  },
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
  destroyed() {},
};
</script> 
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.member_bread > p {
  /* display: inline-block; */
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
</style>
<style scoped></style>
