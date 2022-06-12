<template>
  <div class="login_container">
      <div class="login_box">
        <h2>Login</h2>
        <!-- 表单区 -->
        <!-- <el-form label-width="100px">
            <el-form-item label="用户名：">
                <el-input ></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input ></el-input>
            </el-form-item>
           
        </el-form> -->

        <!-- /////////// -->
        <el-form label-width="80px" label-position="top" 
          ref="loginFormRef" 
          :model="loginForm"
          :rules="loginFormRules"
        >
            <div class="myInput">
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
            </div>
           
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLogin">重置</el-button>
            </el-form-item>
        </el-form>

      </div>
  </div>
</template>

<script>

export default {
    name:'Login',
    data() {
        return {
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                username:[
                    {required:true,message:'请输入登录名',trigger:'blur'},
                    {min:3,max:10,message:'长度在3-10位',trigger:'blur'}
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在6~15之间', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        login(){
            this.$refs.loginFormRef.validate(async (valid,obj)=>{
                if(!valid) return
                const {data:res} = await this.$http.post('login',this.loginForm)
                if(res.meta.status !== 200)
                    return this.$message({
                        message:'用户名或者密码错误，登录失败',
                        type:'error'
                    })
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
            })
        },
        resetLogin(){
            // this.loginForm.username=''
            // this.loginForm.password=''
            // this.$refs.loginFormRef.resetFields()
            this.$refs.loginFormRef.resetFields()
        }
    },
}
</script>

<style scoped>
    .login_container{
        height: 100vh;
        background: url(../assets/bg.jpg);
        /* background-color: pink; */
        background-size: cover;
        display: flex;
        /* 让子盒子居中显示 */
        justify-content: center;
        align-items: center;
    }
    
    .login_box{
        width: 350px;
        height: 350px;
        border: 1px solid rgba(255,255,255,0.5);
        background: rgba(50,50,50,0.2);
        display: flex;
        backdrop-filter: blur(10px);
        /* 让子盒子按列排序 */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }

    .login_box > h2 {
        color: rgba(255,255,255,0.9);
        margin-bottom: 30px;
    }

    
  
    

</style>