<template>
  <div>
    <div style="margin: 10px 10px">
      <el-button type="primary" @click="add">添加歌手</el-button>
    </div>
    <div style="margin: 10px 10px">
      <el-input v-model="search_word"
                placeholder="请输入歌手名"
                style="width: 20%">
      </el-input>
      <el-button type="primary" @click="search" @keyup.ne.enter="search">搜索</el-button>
    </div>
<!--    表单信息-->
    <div style="margin: 0 10px">
      <el-table
        :data="tableData"
        border
        stripe
        max-height="550px"
        style="width: 95%">
        <el-table-column
          prop="id"
          label="编号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="photo"
          label="头像"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="60">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
            &nbsp
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="Prompt(scope.row.id)">
              <template>
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div style="margin: 10px 10px">
<!--      分页-->
      <div style="margin: 0 10px;width: 80%">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

<!--      添加歌手对话框-->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">

        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="歌手名">
            <el-input v-model="form.name" style="width: 40%"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.sex" style="width: 80%">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
              <el-radio :label="2">组合</el-radio>
              <el-radio :label="3">乐队</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.introduction" style="width: 80%"></el-input>
          </el-form-item>

          <el-form-item label="歌手头像">
            <el-input v-model="form.photo" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="success">确 定</el-button>
        </span>
      </el-dialog>

<!--      编辑歌手对话框-->
      <el-dialog title="提示" :visible.sync="editVisible" width="50%" >

        <el-form ref="form" :model="editForm" label-width="120px">
          <el-form-item label="歌手名">
            <el-input v-model="editForm.name" style="width: 40%"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex" style="width: 80%">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
              <el-radio :label="2">组合</el-radio>
              <el-radio :label="3">乐队</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="简介">
            <el-input type="textarea" v-model="editForm.introduction" style="width: 80%"></el-input>
          </el-form-item>

          <el-form-item label="歌手头像">
            <el-input v-model="editForm.photo" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSuccess">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>

</template>

<script>
import {AddSinger} from "../request/api";
import {getAllSinger} from "../request/api";
import {getSingerByName} from "../request/api";
import {changeSinger} from "../request/api";
import {deleteById} from "../request/api";
export default {
  name: "SingerManage",
  data(){
    return{
      //添加歌手对话框默认关闭
      dialogVisible:false,
      //添加歌手的信息
      form:{
        photo: '',
        name: '',
        sex:'',
        introduction: ''},
      //编辑歌手对话框默认关闭
      editVisible:false,
      //编辑歌手的信息
      editForm:{
        id:'',
        photo: '',
        name: '',
        sex:'',
        introduction: ''},
      //性别类型

      //表单信息
      tableData: [],
      //搜索框文字
      search_word:'',
      //分页
      currentPage1: 5,
    }
  },
  // //调用查询所有歌手方法
  created(){
    this.getAllSinger();
  },
  methods:{
    //查询所有歌手
    getAllSinger(){
      this.tableData = [];
      getAllSinger().then(res =>{
        this.tableData = res;
      })
    },
    //根据歌手名搜索
    search(){
      this.tableData = [];
      let params = new URLSearchParams();
      params.append('name',this.search_word);
      getSingerByName(params).then(res =>{

        this.tableData.push(res);
      })
    },
    // 点击回车键登录
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13) {
        this.search(); // 定义的登录方法
      }
    },
  mounted() {
    // 绑定监听事件
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown, false);
  },
    //添加方法
    add(){
      this.dialogVisible = true
      this.form = {}
    },
    //添加成功后的方法
    success(){
      let params = new URLSearchParams();
      params.append('name',this.form.name);
      params.append('sex',this.form.sex);
      params.append('photo',this.form.photo);
      params.append('introduction',this.form.introduction);
      //根据返回值判断
      AddSinger(params).then(res =>{
        if(res.code ==1){
          this.getAllSinger();
          this.$message({message: '添加成功!', type: 'success'});
        }else {
          this.$message.error('添加失败!');
        }
      }).catch(error =>{
        console.log(error);
      });

      this.dialogVisible = false;

    },
    //编辑方法
    handleClick(row){
      this.editVisible = true;
      this.editForm = {
        id:row.id,
        name: row.name,
        sex: row.sex,
        introduction: row.introduction
      }
    },
    //编辑成功后的方法
    editSuccess(){
      let params = new URLSearchParams();
      params.append('id',this.editForm.id)
      params.append('name',this.editForm.name);
      params.append('sex',this.editForm.sex);
      params.append('photo',this.editForm.photo);
      params.append('introduction',this.editForm.introduction);
      //根据返回值判断
      changeSinger(params).then(res =>{
        if(res.code ==1){
          this.getAllSinger();
          this.$message({message: '修改成功!', type: 'success'});
        }else {
          this.$message.error('修改失败!');
        }
      }).catch(error =>{
        console.log(error);
      });
      this.editVisible = false;
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //删除提示方法
    Prompt(id){

      deleteById(id).then(res =>{
        if(res.code == 1 ){
          this.getAllSinger();
          this.$message({message: '已删除!', type: 'success'});
        }else {
          this.$message.error('删除失败!');
        }
      }).catch(error =>{
        console.log(error);
      });

    }
  }

}
</script>

<style scoped>

</style>
