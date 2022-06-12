<template>
  <div>
    <el-switch v-model="fateValue"
     active-text="睡觉去喏" 
     inactive-text="继续学习" 
     :disabled="onceSelect">
    </el-switch>
    <Report></Report>
  </div>
</template>

<script>
import Report from '../components/report/Report'
export default {
    name:'Welcome',
    components:{
        Report
    },
    data() {
        return {
            fateValue:false,
        }
    },
    computed: {
        onceSelect(){
            if(this.fateValue){
                this.$message({
                    showClose:true,
                    message:'卷个gb,睡觉去啦',
                    type:'success'
                })
                return this.fateValue
            }
            
        }
    },
}
</script>
    
<style>

</style>