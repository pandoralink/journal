<template>
<div>
    <div style="margin-bottom: 10px">
        <el-button class="btn">预计目标</el-button>
        <el-button class="btn">想要目标</el-button>
    </div>
    <div style="display: flex; flex-direction: row-reverse">
        <el-button class="btn" v-if="!DeleteFlag" @click="TargetDelete">确认删除</el-button>
        <el-button class="btn" @click="DialogAddFlag = !DialogAddFlag">增添</el-button>
        <el-button class="btn" @click="DeleteFlag = !DeleteFlag">{{ DeleteFlag?'删除':'取消删除'}}</el-button>
        <el-dialog
            title="目标内容"
            :visible.sync="DialogAddFlag"
            width="80%">
            <input type="text" v-model="DialogData.head" placeholder="目标默认内容">
            <input type="text" v-model.number="DialogData.FullState" placeholder="满状态">
            <el-button slot="footer" @click="DialogAddFlag = !DialogAddFlag">关闭</el-button>
            <el-button slot="footer" @click="AddTarget">确认增添</el-button>
        </el-dialog>
    </div>
    <!-- 事件处理部分 -->
    <div style="display: flex; align-items: center;" v-for="i of DialogList" :key="i.order">
        <el-checkbox v-if="!DeleteFlag" style="margin-right: 10px" v-model="TargetDeleteList[i.order]"></el-checkbox>
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <h1 @click="i.DialogFlag = !i.DialogFlag">{{ i.head?i.head:'目标'}}</h1>
            <el-progress :percentage="TargetPercent(percent[i.order],i.FullState)" color="#000000" style="width: 20%"></el-progress>
        </div>
        <el-dialog
            title="目标内容"
            :visible.sync="i.DialogFlag"
            width="80%">
            <input type="text" v-model="i.head" placeholder="目标默认内容">
            <input type="text" v-model.number="i.state" placeholder="目标默认状态">
            <p>{{ i.time }}</p>
            <el-button slot="footer" @click="i.DialogFlag = !i.DialogFlag">关闭</el-button>
            <el-button slot="footer" @click="TargetPost(i)">上传</el-button>
        </el-dialog>
    </div>
</div>    
</template>

<script>
import axios from 'axios'

export default {
    name: 'target',
    data() {
        return {
            DeleteFlag: true,
            DialogFlag: false,
            DialogList: [],
            TargetDeleteList: [],
            percent: [], //由于表单元素总是会将Number型转换成String型，所以只好另开一个属性给percentage
            DialogAddFlag: false,
            DialogData: {
                head: '',
                FullState: -1
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get("http://localhost:3000/target")
            .then(res => {
                console.log(res);
                this.DialogList = res.data;
                for(let i = 0; i < this.DialogList.length; i++){
                    this.$set(this.DialogList[i],'DialogFlag',false);
                    this.percent.push(parseInt(this.DialogList[i].state));
                }
                this.DialogList.reverse();
                this.TargetDeleteList = new Array(this.DialogList.length).fill(false);
            })
            .catch(err => {
                console.log(err);
            })
        },
        TargetPost(target) {
            target.time = new Date().toLocaleString();
            this.$delete(target,'DialogFlag')
            axios.post("http://localhost:3000/target",target)
            .catch(err => { console.log(err); });
            this.$set(target,'DialogFlag',false);
            this.percent[target.order] = parseInt(target.state);  //妈的真麻烦
        },
        AddTarget() {
            this.DialogList.unshift({
                head: this.DialogData.head ? this.DialogData.head : '',
                state: 0,
                FullState: this.DialogData.FullState ? this.DialogData.FullState : 0,
                time: '',
                order: this.DialogList[0] ? this.DialogList[0].order + 1 : 0,
                DialogFlag: false 
            });
            this.TargetDeleteList.push(false);
            this.percent.push(0);
            this.DialogAddFlag = !this.DialogAddFlag;
        },
        TargetDelete() {
            let TargetDeleteList = this.TargetDeleteList;
            axios.post('http://localhost:3000/target/delete',TargetDeleteList).catch(err => { console.log(err); });
            for(let i = 0; i < this.TargetDeleteList.length; i++)
                if(this.TargetDeleteList[i] === true){
                    this.DialogList.splice(this.TargetDeleteList.length - i -1,1);
                }
            this.percent = this.percent.filter((item,index) =>
                TargetDeleteList[index] == false )
            for(let i = 0; i < this.DialogList.length; i++){
                if(this.DialogList.length-i-1 == this.DialogList[i].order) continue;
                else this.DialogList[i].order = this.DialogList.length-i-1;
            }
            this.TargetDeleteList = new Array(this.DialogList.length).fill(false);
            this.DeleteFlag = !this.DeleteFlag;
        },
        TargetPercent(DoneState,FullState) {
            return parseInt(DoneState*100/FullState);
        }
    }
    
}
</script>

<style>
.btn {
    margin-right: 1vh;
    border: 0.5vh solid black; 
    border-radius: 2vh;
}
</style>