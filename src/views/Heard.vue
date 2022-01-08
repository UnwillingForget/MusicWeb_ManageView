<template>
  <div class="heard">
    <div class="heard_left">
      <i class="el-icon-headset"></i>
      &nbsp
      <span slot="title">Music后台管理</span>
    </div>
    <div class="heard_right">
      <i class="el-icon-user-solid">&nbsp:</i>

      <el-dropdown class="AdminName" trigger="click" @command="Quit">
          <span class="el-dropdown-link" style="color: black">
            {{ AdminName }}
            <i class="el-icon-s-tools"></i>
          </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Heard",
  computed:{
    AdminName(){
      return localStorage.getItem('AdminName')
    }
  },
  methods:{
    Quit(command){
      if(command == "logout"){
        localStorage.removeItem("AdminName");
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.heard{
  height: 49px;
  width: auto;
  position: relative;
  line-height: 50px;
  border-bottom: 1px solid #DCDCDC;
}
.heard_right{
  height: 50px;
  width: 150px;
  float: right;
}
.heard_left{
  height: 50px;
  width: 250px;
  float: left;
  text-align: center;
}
.el-dropdown-link{
  color: #DCDCDC;
  cursor: pointer;
}

</style>
