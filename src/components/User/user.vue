<template>
    <div>
        <!-- 导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input 
                        v-model="queryInfo.query" 
                        placeholder="请输入内容" 
                        clearable
                        @clear="getUserList"
                    >
                         <el-button 
                            slot="append"
                            icon="el-icon-search"
                            @click="getUserList"
                        >
                        </el-button>
                    </el-input>
                   
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">
                        添加用户
                    </el-button>
                </el-col>
                
            </el-row>
       
            <!-- 表格区 -->
            <el-table
              :data="userList"
              style="width: 100%"
              border
              >
              <el-table-column
                type="index"
                label="序号"
                >
              </el-table-column>
              <el-table-column
                prop="username"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="role_name"
                label="角色">
              </el-table-column>
              <el-table-column
                prop="email"
                label="状态"
                width="90">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#bac3c4"
                        >
                    </el-switch>
                    </template>
              </el-table-column>
              <el-table-column prop=""  label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" size="mini">
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">
                    </el-button>
                    <el-tooltip
                      effect="dark"
                      content="分配角色"
                      placement="right"
                      :enterable="false"
                    >
                        <el-button type="info" icon="el-icon-setting" size="mini">
                        </el-button>

                    </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="queryInfo.pagesize"
              :page-sizes="[1,3,5,10]"
              :current-page="queryInfo.pagenum"
              layout="total,sizes,prev, pager, next,jumper"
              :total="total">
            </el-pagination>
        </el-card>
        <!-- 用户添加对话框 -->
        <el-dialog 
            title="添加用户" 
            :visible.sync="addDialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @close="addDialogClosed"
        >
            <el-form 
                label-width="auto"
                :model="addFormData"
                :rules="addFormRules"
                ref="addFormRef"
                class="demo-ruleForm"  
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addFormData.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addFormData.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="wmail">
                <el-input v-model="addFormData.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="addFormData.mobile"></el-input>
              </el-form-item>
             
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible=false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>

    
</template>

<script>
export default {
    name:'User',
    data(){
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            userList:[],
            total:0,
            addDialogVisible:false,
            addFormData:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            addFormRules:{
                username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                  {
                    min: 3,
                    max: 10,
                    message: '用户名的长度在3到10之间',
                    trigger: 'blur',
                  },
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  {
                    min: 6,
                    max: 15,
                    message: '密码的长度在3到10之间',
                    trigger: 'blur',
                  },
                ],
            },
        }
    },
    created(){
        this.getUserList()
    },
    methods: {
        async getUserList(){
            const {data:res} = await this.$http.get('users',{
                params:this.queryInfo,
            })
            console.log(res);
            if(res.meta.status !== 200) return this,message.error(res.meta.msg)
            this.userList = res.data.users
            this.pagenum = res.data.pagenum
            this.total = res.data.total
            console.log(this.userList);
        },
        handleSizeChange(newPageSize){
            this.queryInfo.pagesize = newPageSize
            this.getUserList()
        },
        handleCurrentChange(newPageNum){
            this.queryInfo.pagenum = newPageNum
            this.getUserList()
        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        addUser(){
            this.$refs.addFormRef.validate(async (valid)=>{
                if(!valid) return
                const {data:res} = await this.$http.post('users',this.addFormData)
                if(res.meta.status!==200) return this.$message.error('添加用户失败')
                this.$message.success('添加用户成功')
            })
            console.log('添加成功');
            this.addDialogVisible=false
            this.getUserList()
        }
    },
}
</script>

<style>

</style>