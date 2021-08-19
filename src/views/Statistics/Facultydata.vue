<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>院系数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="人数统计" name="first"
          >
          <el-empty description="暂无数据"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="专业分布" name="second"
          >
          <el-empty description="暂无数据"></el-empty>
        </el-tab-pane>
      
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Facultydata",
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
</style>