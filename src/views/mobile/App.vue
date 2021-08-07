<template>
<div id="app">
    <div style="display: flex;" v-if="!isRoot">
      <input
        class="pl-check-input"
        type="text"
        v-model="check">
      <button 
        class="pl-btn check"
        @click="isCheck">确定</button>
    </div>
    <el-container class="main-page" v-if="isRoot">
      <div class="pl-aside-container" :class="{ open: isOpen, content: isContent}">
        <el-aside
          class="main-aside"
          width="100%"
          :class="{ open: isOpen }"
        >
          <router-link tag="div" :to="item.path" v-for="item in list" :key="item.path" class="btn-container">
            <el-button  class="main-button" >{{ item.value}}</el-button>
          </router-link>
        </el-aside>
        <div class="sidebar-btn">
          <i class="el-icon-menu" @click="isOpen = !isOpen"></i>
        </div>
        <div :class="{ 'pl-empty': isOpen }" @click="isOpen = !isOpen"></div>
      </div>
      <el-main :class="{ 'main-content': isContent }">
        <!-- <keep-alive :include="['taskContent','task']">  include真是太好用了 -->
        <keep-alive include="task">
          <router-view @goContent="isContent = !isContent"/>
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
        // { path:"/target", value:"目标" },
        // { path:"/question", value:"问题" },
        { path:"/task", value:"任务" },
        { path:"/target", value:"2" },
        { path:"/note", value:"便签" },
        { path:"/question", value:"4" },
      ],
      isOpen: false,
      isContent: false,
      isRoot: false,
      check: ""
    }
  },
  created() {
    if(localStorage.getItem('isRoot'))
      this.isRoot = localStorage.getItem('isRoot');
  },
  methods: {
    isCheck() {
      if(this.check == "1900301125"){
        this.isRoot = true;
        localStorage.setItem('isRoot',"1900301125");
      }
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>

<style>
</style>
