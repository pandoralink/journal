<template>
<div>
    <el-main class="task-main">
        <div class="col" style=" flex-direction: row-reverse; ">
            <el-button class="delete" v-if="flag" @click="DeleteData">确认删除</el-button>
            <el-button class="add" v-on:click="add">增添</el-button>
            <el-button class="delete" v-on:click="flag = flag?false:true">{{ flag?'取消删除':'删除'}}</el-button>
        </div>
        <hr class="task-hr">
        <pl-loder :isget="isGet" :ismsg="isError"></pl-loder>
        <div v-if="isGet" style="width: 100%">
            <div class="task-col" v-for="(i,index) in data" :key="index">
                <el-checkbox v-if="flag" style="margin-right: 2%" v-model="select[index]"></el-checkbox>
                <div style="width: 100%; height: 100%">
                    <div class="task-col" style="flex-wrap: nowrap">
                        <div style="display: flex; flex-direction: column;">
                            <h1 @click="jump(index)" style="margin: 0 0 0 0" >{{ i.head?i.head:'标题' }}</h1>
                            <hr class="task-hr" style="width: 100%">
                            <h2 style="margin: 0 0 0 0;">{{ i.time }}</h2>
                        </div>
                        <button class="done-block" v-on:click=" i.state = i.state?false:true ">{{ i.state?'已完成':'未完成' }}</button>
                    </div>
                    <hr class="task-hr">
                </div>
            </div>
        </div>
    </el-main> 
</div>
    
</template>

<script>
import axios from 'axios'
import plLoder from '../loder/index.vue'

export default {
    name: 'task',
    components: {
        plLoder
    },
    data() {
        return {
            message: true,
            data: [],
            select: [],
            flag: false,
            nextNum: -1,
            isGet: false,
            isError: false
        }
    },
    created() {
        this.getData(); //获取数据
    },
    methods: {
        getData(){
            axios.get('http://116.63.152.202:3000/task')
            .then((res) => {
                this.isGet = true;
                this.data = res.data.reverse();
                this.select = new Array(this.data.length).fill(false);
            })
            .catch((error) => {
                this.isError = true;
                console.log(error);
            });
        },
        jump: function(ord) {
            this.nextNum = ord;
            ord = 'content' + ord;
            this.$router.push({ path: `/task/${ord}` }).catch(err => {console.log(err)});
            this.$emit('goContent');
        },
        add() {
            let data = { head: '', data: '', time: '不告诉你', state: false };
            this.select.unshift(false);
            this.data.unshift(data);
        },
        DeleteData() {
            let list = this.data.filter((item,index) => {
                if(this.select[index] == true && item.id != undefined) return item.id;
            })
            axios.post('http://116.63.152.202:3000/task/delete',list).catch(err => { console.log(err); });
            this.data = this.data.filter((item,index) => {
                if(this.select[index] == false) return item; 
            })
            this.select = new Array(this.data.length).fill(false);
            this.flag = false;
        }
    },
    computed: {
        head() { return this.$store.state.content.head?this.$store.state.content.head:'标题' },
        changeTime() { return this.$store.state.content.time?this.$store.state.content.time:'时间' },
    },
    beforeRouteLeave(to,from,next) {
        to.params.data = this.data[this.nextNum];
        if(/content([0-9])/.test(to.path)) to.params.data.index = this.nextNum;
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        console.log(/content([0-9])/.test(from.path));
        if(/content([0-9])/.test(from.path)) {
            next(vm => {
                let content = vm.$route.params.data;
                if(vm.data[content.index]) {
                    vm.data[content.index].time = vm.$route.params.data.time;
                    vm.data[content.index].head = vm.$route.params.data.head;
                    vm.data[content.index].data = vm.$route.params.data.data;
                    vm.data[content.index].id = vm.$route.params.data.id;
                }
            });
        }
        else next();
    }
}
</script>

<style>
.task-main{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.col{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.delete,.add{
    margin-right: 1vh;
    border: 0.5vh solid black; 
    border-radius: 2vh;
}
.task-hr{
    border: 2px solid black;
    border-radius: 10px;
    background-color: black;
    width: 100%;
}
.task-col{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.done-block{
    font-size: 20px;
    background-color: #ffffff;
    border: 0.5vh solid black;
    border-radius: 1vh;
    outline: 0
}
.done-block:hover {
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
}
.done-block:active {
    border-color: #C5C6C6;
    color: #C5C6C6;
    outline: 0
}
</style>