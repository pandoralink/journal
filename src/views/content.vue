<template>
  <div style="height: 100%; overflow: hidden">
    <div>
      <input style="margin: 0 0 0 0; width: auto" placeholder="标题" v-model="content.head">
      <hr class="task-hr">
    </div>
    <div style="height: 100%">
      <textarea ref="input" placeholder="输入内容" v-model="content.data"></textarea>
      <button class="content-button" @click="up">Save</button>
      <button class="content-button" style="margin-left: 10px" @click="back">Back</button>
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
        order: -1,
      }
    }
  },
  methods: {
    up: function() {
      var content = this.content;
      content.time = new Date().toLocaleString();
      this.$store.commit('change',content);
      axios.post('http://localhost:3000/task/content', {
        head: content.head,
        data: content.data,
        time: content.time,
        state: content.state,
        order: content.order
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    back() { this.$router.go(-1); }
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
      vm.content.order = vm.$route.params.data.order;
    });
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
.content-button {
  border: 0.5vh solid black; 
  border-radius: 1vh;
  margin-left: calc(100% - 150px);
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  font-size: 0.625em;
  background-color: #ffffff;
  cursor: pointer;
  background: #FFF;
  text-align: center;
  outline: 0;
}
.content-button:hover {
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
}
.content-button:active {
    border-color: #C5C6C6;
    color: #C5C6C6;
    outline: 0
}
</style>
