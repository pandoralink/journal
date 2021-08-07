<template>
  <div style="height: 100%; padding: 5px 0 0 5px; overflow: hidden; ">
    <div>
      <input style="margin: 0 0 0 0; width: auto" placeholder="标题" v-model="content.head">
      <hr class="task-hr">
    </div>
    <div style="height: 100%; position: relative">
      <textarea  class="pl-textarea" ref="input" placeholder="输入内容" v-model="content.data"></textarea>
      <button class="pl-btn content-button"  style="right: 80px;" @click="up">Save</button>
      <button class="pl-btn content-button" @click="back">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'taskContent',
  data() {
    return {
      content: {
        head: '',
        data: '',
        time: '',
        state: false,
        id: undefined
      },
      index: -1
    }
  },
  methods: {
    up: function() {
      var content = this.content;
      content.time = new Date().toLocaleString();
      let insertData = {
        head: content.head,
        data: content.data,
        time: content.time,
        state: content.state
      };
      if(content.id != undefined) {
        insertData.id = content.id;
      }
      axios.post('http://116.63.152.202:3000/task/content', insertData)
      .then(res => {
        console.log(this.content.id);
        this.content.id = parseInt(res.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    back() { 
      this.$router.go(-1);
      this.$emit('goContent');
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.content.head = vm.$route.params.data.head;
      vm.content.data = vm.$route.params.data.data;
      vm.content.state = vm.$route.params.data.state;
      vm.content.time = vm.$route.params.data.time;
      if(vm.$route.params.data.id != undefined) vm.content.id = vm.$route.params.data.id;
      vm.index = vm.$route.params.data.index;
    });
  },
  beforeRouteLeave(to,from,next) {
    to.params.data = this.content;
    to.params.data.index = this.index;
    next();
  }
}
</script>

<style>
.task-hr{
    border: 2px solid black;
    border-radius: 10px;
    background-color: black;
    width: 100%;
}
input {
  border: 0;
  outline: none;
  font-size: 24px;
}
textarea {
  border: 0;
  outline: none;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  height: 80%;
}

</style>
