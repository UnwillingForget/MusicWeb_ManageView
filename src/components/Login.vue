<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="login">
      <div class="login-inp">
        <el-form :model="ruleForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username"
                      placeholder="请输入账号"
                      style="width: 300px;
                      margin-top: 20px"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password"
                      placeholder="请输入密码"
                      style="width: 300px"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin" @keyup.enter="submitLogin" style="width: 100px">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>


  </div>
</template>

<script>
import {getLogin} from "../request/api";

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Administrator login',
      ruleForm:{
        username:"",
        password:""
      },
      rules:{
        username:[{required:true,message:"请输入用户名",trigger:"blur"}],
        password:[{required:true,message:"请输入密码",trigger:"blur"}]
      }
    }
  },
  methods:{
    submitLogin(){
      // this.$router.push("/HomePage");
      //收集表单数据查询后端，进行判断
      let params = new URLSearchParams();
      params.append("name",this.ruleForm.username);
      params.append("password",this.ruleForm.password);
      getLogin(params).then((res) => {
        if(res.code == 1){
          localStorage.setItem('AdminName',this.ruleForm.username);
          this.$router.push("/HomePage");
          this.$message({message: 'Successful login!', type: 'success'});
        }else {
          this.$message.error('Account or password error!');
        }
      })

      // this.$refs.loginForm.validate((valid) => {
      //   //判断当前页面表单是否填有字段
      //   if (valid ==false) {
      //     //this.$message({message: '恭喜你，这是一条成功消息', type: 'success'});
      //     this.$message.error('Please enter your account number or password!');
      //   }
      // });
    },
    // 点击回车键登录
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13) {
        this.submitLogin(); // 定义的登录方法
      }
    },
  },
  mounted() {
    // 绑定监听事件
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown, false);
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.hello{
  text-align: center;
  margin-top: 10%;
}
.login{
  height: 200px;
  width: 500px;
  /*设置元素的位置为绝对位置*/
  position: absolute;
  left: 50%;
  top: 45%;
  margin: -100px  -250px;
  /*给box添加圆角样式*/
  border-radius: 10px;
  /*设置box边框阴影*/
  box-shadow: 0 0 10px #DCDCDC;
}
.login-inp{
  height: 250px;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 57%;
  margin: -100px  -150px;
}
</style>
