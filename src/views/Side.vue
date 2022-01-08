<template>
  <div class="side">
    <el-row>
      <el-col style="width: 240px">
        <el-menu
          default-active="HomePage"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="height: calc(100vh - 50px);"
          router>
          <el-menu-item index="HomePage">
            <i class="el-icon-menu"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="UserManage">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="SingerManage">
            <i class="el-icon-menu"></i>
            <span slot="title">歌手管理</span>
          </el-menu-item>
          <el-menu-item index="SongListManage">
            <i class="el-icon-menu"></i>
            <span slot="title">歌单管理</span>
          </el-menu-item>

        </el-menu>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: "Side",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.side{
  text-align: center;
}

</style>
