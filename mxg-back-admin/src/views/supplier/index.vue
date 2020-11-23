<template>
  <div>
    <!-- 面包屑 -->
    <div class="supplier_bread">
      <p>供应商管理</p>
    </div>

    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Supplier_add">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 供应商列表 -->
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="EditAdd(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delSupplier(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageChange"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加供应商" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.linkman" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 編輯 -->
    <el-dialog title="編輯供应商" :visible.sync="edit">
      <el-form :model="editFrom">
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="editFrom.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="editFrom.linkman" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="editFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editFrom.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="AddEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  info,
  removeSupplier,
  addSupplier,
  updataSupplier,
  AddupdataSupplier,
} from "../../API/supplier_api";
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
      formInline: "",
      formInline: {
        user: "",
      },

      // 供应商表格
      tableData: [],
      size: 10,
      page: 1,
      // 分页
      total: 0,
      pageChange: 1,
      dialogFormVisible: false,
      form: {
        linkman: "",
        mobile: "",
        name: "",
        remark: "",
      },
      formLabelWidth: "90px",
      edit: false,
      editFrom: {},
      id: 0,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onSubmit() {},
    async getSupplierList() {
      const res = await info(this.size, this.page);
      console.log(res);
      this.tableData = res.data.data.rows;
      this.total = res.data.data.total;
    },
    // 分页器
    handleSizeChange(size) {
      this.size = size;
      this.getSupplierList();
    },
    handleCurrentChange(page) {
      this.pageChange = page;
      this.page = (page - 1) * this.size;
      this.getSupplierList();
    },
    // getSupplierList(){
    //   supplier.getSupplier().then(response =>{
    //     this.tableData=response.data.data
    //   })
    // }

    // this.getSupplierList()
    // 删除
    delSupplier(id) {
      this.$confirm("此条信息将会删除, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await removeSupplier(id);
          if (res.data.flag) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          console.log(res);
          this.getSupplierList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 增加
    Supplier_add() {
      this.dialogFormVisible = true;
    },
    async AddUser() {
      let data = await addSupplier(this.form);
      if (data.data.code == 2000) {
        this.dialogFormVisible = false;
        this.form = {};
        this.getSupplierList();
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      } else {
        this.$message({
          type: "info",
          message: "添加失败",
        });
      }
      console.log(data);
    },
    //修改
    async EditAdd(res) {
      this.edit = true;
      let data = await updataSupplier(res.id);
      this.id = res.id;
      this.editFrom = data.data.data;
      console.log(this.editFrom);
    },
    //確認修改
    async AddEdit() {
      let data = await AddupdataSupplier(this.id, this.editFrom);
      if (data.data.code == 2000) {
        this.edit = false;
        this.getSupplierList();
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      } else {
        this.$message({
          type: "info",
          message: "修改失敗",
        });
      }
      console.log(data);
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
    this.getSupplierList();
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
  destroyed() {},
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
/* .supplier_box{
  width: 100%;
  height: 100%;
} */
.supplier_bread > p {
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
