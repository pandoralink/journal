<template>
<div>
    <div class="NoteHead">
        <button class="pl-btn" v-if="!DeleteFlag" @click="NoteDelete">确认删除</button>
        <button class="pl-btn" @click="NoteAdd">增添</button>
        <button class="pl-btn" @click="DeleteFlag = !DeleteFlag">{{ DeleteFlag?'删除':'取消删除'}}</button>
    </div>
    <div class="NoteContain" v-for="i of NoteData" :key="i.num">
        <el-checkbox v-if="!DeleteFlag" style="margin-right: 10px" v-model="NoteDeleteList[i.num]"></el-checkbox>
        <div class="NoteCol">
            <h1 @click="DialogShow(i)">{{ i.head?i.head:'空标签'}}</h1>
            <h1>{{ i.NoteTime?i.NoteTime:'标签时间'}}</h1>
        </div>
    </div>
    <el-dialog
            title="便签内容"
            :visible.sync="DialogFlag"
            width="80%">
            <input type="text" v-model="NoteObject.head" placeholder="标签头">
            <textarea ref="input" placeholder="输入内容" v-model="NoteObject.data"></textarea>
            <el-button slot="footer" @click="DialogFlag = !DialogFlag">关闭</el-button>
            <el-button slot="footer" @click="NoteInsert(NoteObject)">确认</el-button>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'note',
    data() {
        return {
            DeleteFlag: true,
            DialogFlag: false,
            NoteData: [],
            NoteDeleteList: [],
            NoteObject: {}
        }
    },
    mounted() {
        if(localStorage.getItem('NoteData')) {
            this.NoteData = JSON.parse(localStorage.getItem('NoteData')).list;
            console.log(localStorage.getItem('NoteData'));
            this.NoteData = this.NoteData.reverse();
            this.NoteDeleteList = new Array(this.NoteData.length).fill(false);
        }
    },
    methods: {
        NoteAdd() {
            let notedata = {
                head: '',
                NoteTime: '',
                data: '',
                num: this.NoteData[0] ? this.NoteData[0].num + 1 : 0,
            };
            this.NoteData.unshift(notedata);
            this.NoteDeleteList.push(false);
        },
        NoteInsert(InsertData) {
            InsertData.NoteTime = new Date().toLocaleString();
            if(localStorage.getItem('NoteData'))
                if(JSON.parse(localStorage.getItem('NoteData')).list.length == 0) {
                    console.log(1);
                    let note = { list:[] };
                    note.list.push(InsertData);
                    localStorage.setItem('NoteData',JSON.stringify(note));
                }
                else {
                    let note = { list: this.NoteData.reverse() };
                    localStorage.setItem('NoteData',JSON.stringify(note));
                    this.NoteData.reverse();
                }
            else {
                let note = { list:[] };
                note.list.push(InsertData);
                localStorage.setItem('NoteData',JSON.stringify(note));
            }
            this.DialogFlag = false;
        },
        DialogShow(NoteItem) {
            this.NoteObject = NoteItem;
            this.DialogFlag = true;
        },
        NoteDelete() {
            for(let i = 0; i < this.NoteDeleteList.length; i++)
                if(this.NoteDeleteList[i] === true){
                    this.NoteData.splice(this.NoteDeleteList.length - i -1,1);
                }
            for(let i = 0; i < this.NoteData.length; i++){
                if(this.NoteData.length-i-1 == this.NoteData[i].num) continue;
                else this.NoteData[i].num = this.NoteData.length-i-1;
            }
            this.NoteDeleteList = new Array(this.NoteData.length).fill(false);
            let note = { list: this.NoteData.reverse() };
            localStorage.setItem('NoteData',JSON.stringify(note));
            this.NoteData.reverse();
            this.DeleteFlag = !this.DeleteFlag;
        }
    }
}
</script>

<style>
.NoteHead {
    display: flex; 
    flex-direction: row-reverse
}
.NoteButton {
    margin-right: 1vh;
    border: 0.5vh solid black; 
    border-radius: 2vh;
}
.NoteContain {
    display: flex; 
    align-items: center;
}
.NoteCol {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%;
}
</style>