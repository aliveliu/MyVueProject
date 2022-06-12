<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <span>管理系统</span>
            <el-button type="info" @click="loginOut">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边 -->
            <el-aside :width="isCollspace ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollspace">|||</div>
                <!-- 菜单栏 -->
                <el-menu
                    background-color="##e8f4f5"
                    text-color="#545c64"
                    active-text-color="#f56c6c"
                    :collapse="isCollspace"
                    :collapse-transition="false"
                    router
                    :default-active="activePath"
                    unique-opened
                >
                    <!-- 一级菜单 -->
                    <el-submenu
                        :index="item.id+''"
                        v-for="item in menuList"
                        :key="item.id"
                    >
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <i :class="iconObj[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            :index="'/'+subItem.path"
                            @click="saveRoutePath('/' + subItem.path)"
                        >
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                   
                      
       
        
                </el-menu>
            
            </el-aside>
            <!-- 主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name:'Home',
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('acitvePath')

    },
    data() {
        return {
            menuList:[],
            isCollspace:false,
            iconObj:{
                125:'iconfont icon-user',
                103:'iconfont icon-tijikongjian',
                101: 'iconfont icon-shangpin',
                102: 'iconfont icon-danju',
                145: 'iconfont icon-baobiao',
            },
            activePath:'',
        }
    },
    methods: {
        loginOut(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        toggleCollspace(){
            this.isCollspace = !this.isCollspace
        },
        async getMenuList() {
            const { data: res } = await this.$http.get('menus')
            // 如果请求不成功，提示错误信息——服务器的信息反馈在data.meta的msg中
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            // 否则请求成功则将获取到的菜单数据给到组件data中定义的数组
            this.menuList = res.data
            console.log(this.menuList);
        },

        saveRoutePath(activePath) {
            window.sessionStorage.setItem('acitvePath', activePath)
            // !!!
            this.activePath=activePath
        }
    },
}
</script>

<style scoped>
    .home-container {
        height: 100%;
    }
    .el-header {
        background-color: rgba(219, 238, 240, 0.651);
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        font-size: 20px;
    }

    .el-aside {
        background-color: rgba(219, 238, 240, 0.651);
    }

    .el-menu {
        border-right: null;
    }

    .el-main {
        background-color: rgb(170, 226, 230);
    }
    .iconfont {
        margin-right: 10px;
    }
    .toggle-button {
        background-color: rgb(210, 241, 243);
        font-size: 10px;
        line-height: 24px;
        text-align: center;
        color: rgb(168, 149, 162);
        cursor: pointer;
        letter-spacing: 0.2em;
    }
</style>