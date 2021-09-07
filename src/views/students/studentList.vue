<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="40">
        <el-col :span="16">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="getStuList"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStuList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogClick">添加学员</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="studentlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="stu_id" label="学号"></el-table-column>
        <el-table-column prop="stu_name" label="姓名"></el-table-column>
        <el-table-column prop="stu_classNo" label="班级"></el-table-column>
        <el-table-column prop="stu_email" label="邮箱"></el-table-column>
        <el-table-column prop="stu_phone" label="电话"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="ShowEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeStuById(scope.row.stu_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加学员对话框 -->

    <el-dialog
      title="添加学员"
      :visible.sync="addDialogVisible"
      @close="addDialogClose"
      width="50%"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="stuname">
          <el-input v-model="addForm.stuname"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="addForm.stucode"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="stuclass">
          <el-input v-model="addForm.stuclass"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStu">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑学员对话框 -->

    <el-dialog
      title="编辑学员"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
      width="50%"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="stuname">
          <el-input v-model="addForm.stuname"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="stuclass">
          <el-input v-model="addForm.stuclass"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStuClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStuList, addStu, editStu, removeStu } from "@/api/student";

export default {
  name: "studentList",
  data() {
    //验证邮箱的规则
    let checkEmail = (rules, value, callback) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        //合法的邮箱
        return callback();
      }

      callback(new Error("请输入合法的邮箱！"));
    };
    //验证手机号的规则
    let checkMobile = (rules, value, callback) => {
      const regMoblie =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

      if (regMoblie.test(value)) {
        //合法
        return callback();
      }

      callback(new Error("请输入合法的手机号！"));
    };

    return {
      //学员列表
      studentlist: [],

      //编辑学员临时的信息
      tempInfo: {},

      queryInfo: {
        query: "", //查询的参数
        pagenum: 1, //页码数量
        pagesize: 2, //一页有几条
        method: "getAll",
      },
      total: 0, //总共有几条数据

      addDialogVisible: false, //是否展示添加学员的弹出框
      editDialogVisible: false, //是否展示编辑对话框

      //添加用户的表单数据
      addForm: {
        stuname: "",
        stuclass: "",
        stucode: "",
        email: "",
        mobile: "",
      },

      editStuID: "", //被编辑或删除的学员id

      //添加表单验证的规则对象
      addFormRules: {
        stuname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "姓名的长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        stuclass: [
          { required: true, message: "请输入班级", trigger: "blur" },
          // {
          //   min: 1,
          //   max: 10,
          //   message: "班级的长度在 1 到 10 个字符",
          //   trigger: "blur",
          // },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getStuList();
  },
  methods: {
    async getStuList() {
      //发送请求获取学员列表数据
      const res = await getStuList(this.queryInfo);

      //判断状态码
      if (res.data.meta.status === 200) {
        this.$message.success("获取学生列表成功！");
        //读取数据
        console.log(res.data.data.Info);
        this.studentlist = res.data.data.Info;
      } else {
        this.$message.error("获取学生列表失败！");
      }
    },
    removeStuById(id) {
      //根据id 删除学生
      //删除用户
      //先提示询问
      this.$confirm("此操作将永久删除该学员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);

          let params = {
            method: "delete",
            id: id,
          };

          removeStu(params).then((res) => {
            console.log(res);

            this.getStuList();

            this.$message.success("删除学员信息成功!");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ShowEditDialog(row) {
      this.editDialogVisible = true;
      //展示学员信息
      this.addForm.stuname = row.stu_name;
      this.addForm.stuclass = row.stu_classNo;
      this.addForm.email = row.stu_email;
      this.addForm.mobile = row.stu_phone;
      this.editStuID = row.stu_id;

      this.tempInfo = row;
    },
    addDialogClick() {
      this.addDialogVisible = true;

      setTimeout(() => {
        this.$refs.addFormRef.resetFields();
      }, 200);
    },
    handleSizeChange(newSize) {
      //监听pagesize改变事件  改变一页有几条
      this.queryInfo.pagesize = newSize;

      //调用函数更新数据
      this.getStuList();
    },
    handleCurrentChange(newPage) {
      //监听 页码数值改变事件
      this.queryInfo.pagenum = newPage;
      this.getStuList();
    },
    addStu() {
      //发送请求添加学生
      //提交前先校验
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        //无错误发起网络请求

        let params = {
          method:'add',
          stu_phone: this.addForm.mobile,
          stu_classNo: this.addForm.stuclass,
          stu_gender: 1,
          stu_age: 20,
          stu_address: "test",
          stu_birth: new Date,
          stu_gradeId: 8,
          stu_email: this.addForm.email,
          // stu_id: this.addForm.stucode,
          stu_name: this.addForm.stuname,
        };


        addStu(params).then((res) => {

          console.log(res);
          
          // if(){
          // }else{
          // }

          //隐藏对话框
          this.addDialogVisible = false;
          console.log('ok');
          //更新用户列表
          this.getStuList();
          this.$message.success("添加学员成功！");



        });
      });

      this.$refs.addFormRef.resetFields();
    },
    addDialogClose() {
      //添加学员对话框关闭
      this.$refs.addFormRef.resetFields();
    },
    editStuClick() {
      //验证数据发送请求
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          alert("表单验证出错！");
        }

        //无错误发起网络请求
        let stuData = {
          method: "update",
          stu_id: this.editStuID,
          stu_email: this.addForm.email,
          stu_phone: this.addForm.mobile,
          stu_classNo: this.addForm.stuclass,
          stu_name: this.addForm.stuname,
          stu_address: this.tempInfo.stu_address,
          stu_gender: this.tempInfo.stu_gender,
          stu_age: this.tempInfo.stu_age,
          stu_gradeId: this.tempInfo.stu_gradeId,
        };

        console.log(stuData);

        editStu(stuData).then((res) => {
          console.log(res);

          if (res.data.meta.status == 200) {
            this.$message.success("编辑学员成功！");
          } else {
            this.$message.error("编辑学员失败！");
          }

          //更新学员列表
          this.getStuList();
        });
      });

      this.editDialogVisible = false;
    },
    editDialogClose() {
      //编辑学员对话框关闭

      this.$refs.editFormRef.resetFields();
      this.editStuID = "";
    },
  },
};
</script>

<style>
</style>