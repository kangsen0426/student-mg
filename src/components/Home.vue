<template>
  <div class="home_container">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="" />
          <span>学生管理系统</span>
        </div>

        <el-button type="info" @click="logout"
          ><i class="el-icon-error overicon"></i>退出</el-button
        >
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 折叠功能 -->
          <div class="toggle_button" @click="togglebutton">|||</div>

          <el-menu
            :collapse="isCollapse"
            background-color="#606266"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>

            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    logout() {
      //清除退出信息

      //code

      this.$router.push("/login");

      this.$message.success("退出成功!");
    },
    togglebutton() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped lang='less'>
.home_container {
  width: 100%;
  height: 100%;
  .home-container {
    width: 100%;
    height: 100%;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  background-color: #606266;


  .el-button{
      padding-left: 5px;
      padding-right: 5px;
    .overicon{
        margin-right: 8px;
  
    }
  }

  div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-left: 15px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  overflow: hidden;

  .toggle_button {
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    background-color: #a1a3a8;
  }

  .el-menu {
    height: 100%;
    border-right: none;
  }
}
</style>