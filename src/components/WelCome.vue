<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item>WelCome</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-alert
        :closable="false"
        show-icon
        type="success"
        center
        title="欢迎使用学生后台管理系统!"
      ></el-alert>

      <div class="userInfoBox">
        <div class="avatar">
          <div>
            <img src="../assets/avatar.jpg" />
          </div>
        </div>
        <div class="info">
          <el-descriptions
            title="账号信息"
            direction="vertical"
            :column="3"
            border
          >
            <el-descriptions-item label="用户名">admin</el-descriptions-item>
            <el-descriptions-item label="手机号"
              >18100000000</el-descriptions-item
            >
            <el-descriptions-item label="居住地" :span="2"
              >苏州市</el-descriptions-item
            >
            <el-descriptions-item label="身份">
              <el-tag size="small">学生</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址"
              >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
            >
            <el-descriptions-item label="权限">
              <el-tag size="small">管理员</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "WelCome",
};
</script>

<style scoped lang='less'>
.userInfoBox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 500px;
  margin-top: 20px;

  .avatar {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    div {
      width: 130px;
      height: 130px;
      overflow: hidden;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
  }

  .info {
    width: 100%;
    height: 350px;
    margin-top: 20px;
  }
}
</style>