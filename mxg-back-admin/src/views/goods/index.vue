<template>
  <div>
    <p class="left">
      <el-input v-model="input" placeholder="商品名称"></el-input>
      <el-input v-model="input" placeholder="商品编号"></el-input>
      <el-input v-model="input" placeholder="选择供应商" @focus="User" ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">新增</el-button>
      <el-button>重置</el-button>
    </p>

    <!-- 表格 -->
    <el-table :data="tableData" height="400" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="code" label="商品编码" width="80"></el-table-column>
      <el-table-column prop="spec" label="商品规格" width="150"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价" width="150"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价" width="150"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量" width="180"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="edIt(scope.row)">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="open(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 编辑 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-input v-model="form.spec" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="零售价" :label-width="formLabelWidth">
          <el-input v-model="form.retailPrice" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="进货价" :label-width="formLabelWidth">
          <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="库存数量" :label-width="formLabelWidth">
          <el-input v-model="form.storageNum" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-input v-model="form.supplierName" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoods,
  removeGoods,
  editGoods,
  AddeditGoods,
  searchGoods
} from "../../API/goods/goods";
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
      limit: 1,
      size: 10,
      data: {
        code: "",
        name: "",
        supplierName: ""
      },
      tableData: [],
      input: "",
      currentPage4: 0,
      total: "",
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      editId: 0
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //获取数据
    changeLimit() {
      getGoods(this.data, this.size, this.limit).then(res => {
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.changeLimit();
    },
    handleCurrentChange(val) {
      this.limit = val;
      this.changeLimit();
    },
    //删除
    open(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await removeGoods(data.id);
          console.log(res);
          if (res.data.code == 2000) {
            this.changeLimit();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改
    async edIt(data) {
      this.dialogFormVisible = true;
      let res = await editGoods(data.id);
      this.editId = data.id;
      this.form = res.data.data;
      console.log(res.data.data);
    },
    //确认修改
    async AddEdit() {
      let res = await AddeditGoods(this.form, this.editId);
      if (res.data.code == 2000) {
        this.changeLimit();
        this.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        this.$message({
          type: "info",
          message: "修改失败"
        });
      }
      console.log(res);
    },
    //组件复用-供应商
    User(){
      console.log('2')
    },

  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.changeLimit();
  },
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
<style scoped>
.el-input {
  width: 200px;
  margin: 0 10px;
}
.left {
  text-align: left;
}
.el-table {
  margin-top: 20px;
}
.el-dialog {
  width: 400px;
}
</style>
