<template>
<div id="app">
    <el-container class="main-page">
      <el-aside class="main-aside" width="13%">
        <router-link tag="div" :to="item.path" v-for="item in list" :key="item.path" class="btn-container">
          <el-button  class="main-button" >{{ item.value}}</el-button>
        </router-link>
      </el-aside>
      <el-main>
        <keep-alive include="taskContent">  <!-- include真是太好用了 -->
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
</div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      list: [
        { path:"/task", value:"任务" },
        { path:"/target", value:"目标" },
        { path:"/note", value:"便签" },
        { path:"/question", value:"问题" },
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style>
.main-page {
  background-color: #ffffff; 
  border: 1px solid #eee; 
  box-shadow: 0 4px 24px 10px rgba(0, 0, 0, 0.1);
  height: 90vh;
  width: 90vw;
  margin: 2vh 0 0 5vh;
}
.main-aside {
  height: 100%;
  background-color: #ffffff;
  border: 0.8vh solid black; 
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-button{
  width: 90%; 
  height: 10vh;
  margin-top: 2em;
  border: 0.8vh solid black; 
  border-radius: 2vh;
}
.el-main::-webkit-scrollbar{
  width: 2px;
}
.el-main::-webkit-scrollbar-thumb{
  width: 2px;
  background-color: black;
}
</style>
