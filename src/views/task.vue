<template>
<div>
    <el-main class="task-main">
        <div class="col" style=" flex-direction: row-reverse; ">
            <el-button class="delete" v-if="flag" @click="DeleteData">确认删除</el-button>
            <el-button class="add" v-on:click="add">增添</el-button>
            <el-button class="delete" v-on:click="flag = flag?false:true">{{ flag?'取消删除':'删除'}}</el-button>
        </div>
        <hr class="task-hr">
        <div class="task-col" v-for=" i in data" :key="i.order">
            <el-checkbox v-if="flag" style="margin-right: 2%" v-model="select[i.order]"></el-checkbox>
            <div style="width: 100%; height: 100%">
                <div class="task-col" style="flex-wrap: nowrap">
                    <div style="display: flex; flex-direction: column;">
                        <!--<router-link :to="{ name: 'content'}" tag="div" append><h1 class="task-content">标题</h1></router-link>-->
                        <h1 @click="jump(i.order)" style="margin: 0 0 0 0" >{{ i.head }}</h1>
                        <hr class="task-hr" style="width: 100%">
                        <h2 style="margin: 0 0 0 0;">{{ i.time }}</h2>
                    </div>
                    <button class="done-block" v-on:click=" i.state = i.state?false:true ">{{ i.state?'已完成':'未完成' }}</button>
                </div>
            <hr class="task-hr">
            </div>
        </div>
    </el-main> 
</div>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'task',
    data() {
        return {
            message: true,
            data: [],
            select: [],
            flag: false,
            nextNum: -1
        }
    },
    created() {
        this.getData(); //获取数据
    },
    methods: {
        getData(){
            axios.get('http://localhost:3000/task')
            .then((res) => {
                console.log(res.data);
                if(res.data) { 
                    this.data = res.data;
                    this.data.reverse();
                    this.select = new Array(this.data.length).fill(false);
                    }
                else this.data = [];  //这里以后可以加个提示，如果为0，就说没有数据
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        jump: function(ord) {
            this.nextNum = this.data.length - ord - 1;
            ord = 'content' + ord;
            this.$router.push({ path: `/task/${ord}` }).catch(err => {console.log(err)});
        },
        add() {
            let data = { head: '标题', data: '', time: '不告诉你', state: false, order: 0 };
            if(this.data.length) {
                data.order = this.data.length;
                this.select.push(false);
            }
            else {
                data.order = 0;
                this.select.push(false);
            }
            this.data.unshift(data);
        },
        DeleteData() {
            let list = this.select;
            let num = 0;
            axios.post('http://localhost:3000/task/delete',list).catch(err => { console.log(err); });
            for(let i = 0; i < this.select.length; i++)
                if(this.select[i] === true) {
                    for(let j = 0; j < list.length - i - 1; j++) this.data[j].order--;
                    this.data.splice(list.length - i -1,1);
                    num ++ ;
                }
            this.select.splice(-1,num);
            this.select = new Array(this.data.length).fill(false); //splice()老是少删除一个，这不傻逼？
            this.flag = false;
        }
    },
    computed: {
        head() { return this.$store.state.content.head?this.$store.state.content.head:'标题' },
        changeTime() { return this.$store.state.content.time?this.$store.state.content.time:'时间' },
    },
    beforeRouteLeave(to,from,next) {
        to.params.data = this.data[this.nextNum];
        next();
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