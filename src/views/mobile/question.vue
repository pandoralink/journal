<template>
<div>
    <div>
        <div style="display: flex; flex-direction: row-reverse;">
            <button class="pl-btn" v-if="!DeleteFlag" @click="DeleteQuestion">确认删除</button>
            <button class="pl-btn" @click="questionAdd">增添</button>
            <button class="pl-btn" @click="DeleteFlag = !DeleteFlag">{{ DeleteFlag?'删除':'取消删除'}}</button>
        </div>
        <hr class="question-hr">
    </div>
    <div class="question-content">
        <div class="question-block" v-for="(item,index) in questionList" :key="index">
            <el-checkbox v-if="!DeleteFlag" style="margin-right: 2%" v-model="questionDeleteList[index]"></el-checkbox>
            <div class="question-block-content" >
                <div style="display: flex; flex-direction: column;">
                    <div style="flex: 100%">
                        <h1 style="margin: 0" @click="DialogShow(item)">{{item.head}}</h1>
                        <hr class="question-hr">
                    </div>
                    <h1 style="margin: 0;">{{item.questionTime}}</h1>
                </div>
                <div style="flex: 100%">
                    <hr class="question-hr" style="width: 50%; margin-left: 0; flex: 100%">
                </div>
                <h1 style="margin: 0" >{{item.questionData}}</h1>
            </div>
        </div>
    </div>
    <el-dialog
        title="问题内容"
        :visible.sync="DialogFlag"
        width="60%">
        <input type="text" v-model="Item.head" placeholder="问的啥？">
        <textarea ref="input" v-model="Item.questionData" placeholder="输入内容"></textarea>
        <el-button slot="footer" @click="DialogFlag = !DialogFlag">关闭</el-button>
        <el-button slot="footer" @click="questionPost(Item)">确认</el-button>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'question',
    data() {
        return {
            DeleteFlag: true,
            DialogFlag: false,
            questionList: [],
            questionDeleteList: [],
            Item: {}
        }
    },
    mounted() {
        if(localStorage.getItem('QuestionData')) {
            this.questionList = JSON.parse(localStorage.getItem('QuestionData')).list;
            this.questionList = this.questionList.reverse();
            this.questionDeleteList = new Array(this.questionList.length).fill(false);
        }
    },
    methods: {
        questionAdd() {
            let questionData = {
                head: '问题?',
                questionTime: '不知道',
                questionData: '不知道'
            };
            this.questionList.unshift(questionData);
            this.questionDeleteList.push(false);
        },
        DeleteQuestion() {
            this.questionList = this.questionList.filter((item,index) => {
                if(this.questionDeleteList[index] === false)
                    return item;
            })
            console.log(this.questionList);
            this.questionDeleteList = new Array(this.questionList.length).fill(false);
            let note = { list: this.questionList.reverse() };
            localStorage.setItem('QuestionData',JSON.stringify(note));
            this.questionList.reverse();
            this.DeleteFlag = !this.DeleteFlag;
        },
        questionPost(InsertData) {
            InsertData.questionTime = new Date().toLocaleString();
            if(localStorage.getItem('QuestionData'))
                if(JSON.parse(localStorage.getItem('QuestionData')).list.length == 0) {
                    let note = { list:[] };
                    note.list.push(InsertData);
                    localStorage.setItem('QuestionData',JSON.stringify(note));
                }
                else {
                    let note = { list: this.questionList.reverse() };
                    localStorage.setItem('QuestionData',JSON.stringify(note));
                    this.questionList.reverse();
                }
            else {
                let note = { list:[] };
                note.list.push(InsertData);
                localStorage.setItem('QuestionData',JSON.stringify(note));
            }
            this.DialogFlag = false;
        },
        DialogShow(Item) {
            this.Item = Item;
            this.DialogFlag = true;
        },
    }

}
</script>

<style>
textarea {
    font-family:'Avenir', Helvetica, Arial, sans-serif;
}
.question-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.question-hr {
    border: 2px solid black;
    border-radius: 10px;
    background-color: black;
    width: 100%;
}
</style>