<template>
  <div class="header">
    <el-menu theme="dark" :default-active="this.$route.path"
             class="el-menu-demo" background-color="#409EF4" text-color="#FFFFFF" mode="horizontal" @
             select="handleSelect" router>
      <el-menu-item index="oneTimeLoad">一次加载版</el-menu-item>
      <el-menu-item index="PageLoad">分页版</el-menu-item>
      <el-menu-item index="tonghuashun">同花顺APP下载数量</el-menu-item>
      <!--    <el-submenu index="3">-->
      <!--      <template slot="title">Projects</template>-->
      <!--      <el-menu-item index="3-1">Shiny</el-menu-item>-->
      <!--      <el-menu-item index="3-2">LearnVue</el-menu-item>-->
      <!--      <el-menu-item index="3-3">OtherProject</el-menu-item>-->
      <!--    </el-submenu>-->
      <!--    <el-menu-item index="4">Login</el-menu-item>-->
      <!--    <el-menu-item index="5">Resume</el-menu-item>-->
      <el-menu-item index="about">About</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.header {
  /*min-width: 100%;*/
  /*top: 0;*/
  /*position: fixed;*/
}
</style>
