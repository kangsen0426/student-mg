<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="stulist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item, index) in scope.row.grades" :key="index">
              <el-col :span="12" class="calss_name">{{
                item.calss_name
              }}</el-col>
              <el-col :span="12">
                <el-tag :type="item.calss_grades >= 90 ? 'success' : 'warning'">
                  {{ item.calss_grades }}
                </el-tag>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学号" prop="stu_code"></el-table-column>
        <el-table-column label="姓名" prop="stu_name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="ShowEditDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGradesById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog
      title="编辑学生成绩"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
      width="50%"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="editForm"
        ref="editFormRef"
        label-width="70px"
      >
       <el-form-item :label="item.calss_name" :prop="item.calss_grades" v-for="item in editForm" :key="item.id">
          <el-input v-model="item.calss_grades"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGrades">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStuGrades, removeGrades ,editGrades} from "@/api/student";

export default {
  name: "grades",
  data() {
    return {
      editDialogVisible:false,//编辑成绩的对话框
      editForm:[],//编辑成绩的数据
      editGradesID:'',
      //学员列表
      stulist: [
        {
          create_time: 1486720211, //用户添加 / 创建的时间
          email: "2983973848@qq.com", //邮箱
          id: 500, //唯一id
          mobile: "18296701966", //电话
          stu_class: "软件2007", //班级
          stu_name: "康森", //学员姓名
          stu_code: "6020202023", //学员姓名
          grades: [
            {
              calss_name: "语文",
              calss_grades: "80",
            },
            {
              calss_name: "数学",
              calss_grades: "90",
            },
            {
              calss_name: "英语",
              calss_grades: "70",
            },
          ],
        },
        {
          create_time: 1486720211,
          email: "2983973848@qq.com",
          id: 501,
          mobile: "18564255158",
          stu_class: "软件2007",
          stu_name: "小王",
          stu_code: "6020202024",
          grades: [
            {
              calss_name: "语文",
              calss_grades: "80",
            },
            {
              calss_name: "数学",
              calss_grades: "90",
            },
            {
              calss_name: "英语",
              calss_grades: "70",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getGrades();
  },
  methods: {
    async getGrades() {
      //获取成绩列表
      const res = await getStuGrades();
    },
    removeGradesById(id) {
      //根据id 删除学生
      //删除用户
      //先提示询问
      this.$confirm("此操作将永久删除该学生成绩, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
          removeGrades(id).then((res) => {


            console.log(res);


            this.$message.success("删除学生成绩成功!");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ShowEditDialog(row){
      //展示编辑对话框
      this.editDialogVisible = true

      this.editForm = row.grades

      this.editGradesID =  row.id

     
    },
    editGrades(){
      //发送请求编辑成绩数据

      editGrades({
        id:this.editGradesID,
        grades:this.editForm
      }).then(res =>{



        //编辑成功



      })

      this.editDialogVisible = false
      
    },
     editDialogClose() {
      //编辑学员对话框关闭
      this.$refs.editFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.el-row {
  display: flex;
  height: 53px;
  border-top: 1px solid #eee;

  .el-col {
    text-align: center;
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .calss_name {
    border-left: 1px solid #eee;
  }
  .class_name_first {
    border-top: 1px solid #eee;
  }
}
</style>