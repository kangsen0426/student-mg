<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>班级数据</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-tabs v-model="activeName" @tab-click="tableClick">
        <el-tab-pane label="人数统计" name="first">
          <el-cascader
            v-model="value1"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange1"
          ></el-cascader>
          <el-empty v-if="showempty1" description="暂无数据"></el-empty>
          <div class="chartBox" id="chartBox1"></div>
        </el-tab-pane>

        <el-tab-pane label="成绩状态" name="second">
          <el-cascader
            v-model="value2"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange2"
          ></el-cascader>
          <el-empty v-if="showempty2" description="暂无数据"></el-empty>
          <div class="chartBox" id="chartBox2"></div>
        </el-tab-pane>
        <el-tab-pane label="活动安排" name="third">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{  data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split("-").slice(1).join("-") }}
                {{ data.isSelected ? "✔️" : "" }}
              </p>
            </template>
          </el-calendar>
          <el-empty v-if="showempty3" description="暂无数据"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Classdata",
  data() {
    return {
      showempty1: true,
      showempty2: true,
      showempty3: true,
      activeName: "first", //默认选中的tabs
      myChart1: {}, //图表
      myChart2: {}, //图表
      value1: [],
      value2: [],
      options: [
        {
          value: "软件学院",
          label: "软件学院",
          children: [
            {
              value: "2007",
              label: "软件2007班",
            },
            {
              value: "2008",
              label: "软件2008班",
            },
            {
              value: "2009",
              label: "软件2009班",
            },
            {
              value: "2010",
              label: "软件2010班",
            },
          ],
        },
        {
          value: "经管学院",
          label: "经管学院",
          children: [
            {
              value: "2007",
              label: "经管2007班",
            },
            {
              value: "2008",
              label: "经管2008班",
            },
            {
              value: "2009",
              label: "经管2009班",
            },
            {
              value: "2010",
              label: "经管2010班",
            },
          ],
        },
      ],
      option1: {
        //饼图数据
        title: {
          text: "人数分布",
          subtext: "2007 2008切换测试",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "人数",
            type: "pie",
            radius: "50%",
            data: [
              { value: 15, name: "女" },
              { value: 35, name: "男" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart1 = echarts.init(document.getElementById("chartBox1"));
    this.myChart2 = echarts.init(document.getElementById("chartBox2"));
  },
  methods: {
    tableClick(tab, event) {
      //选项卡点击
      console.log(tab, event);

      if(tab.index == 2){
        this.showempty3 = false
      }
    },
    handleChange1(value) {
      //级联选择器点击
      console.log(value);

      this.showempty1 = false;

      if (value[1] == 2008) {
        this.option1.series[0].data[0].value = 35;
        this.option1.series[0].data[1].value = 15;
      }

      //请求数据

      //绘制
      // 使用刚指定的配置项和数据显示图表。
      this.myChart1.setOption(this.option1);
    },
    handleChange2(value) {
      //级联选择器点击
      console.log(value);

      this.showempty2 = false;

      if (value[1] == 2008) {
        // this.option2.series[0].data[0].value = 35
        // this.option2.series[0].data[1].value = 15
      }

      //请求数据

      //绘制
      // 使用刚指定的配置项和数据显示图表。
      this.myChart2.setOption(this.option2);
    },
  },
};
</script>

<style scoped lang='less'>
.el-card {
  min-height: 587px;
}
.el-empty {
  height: 450px;
}
.chartBox {
  width: 750px;
  height: 450px;
}
</style>