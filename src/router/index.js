import Vue from 'vue'
import VueRouter from 'vue-router'
import task from '../views/mobile/task.vue'
import content from '../views/mobile/content.vue'
import target from '../views/target.vue'
// import note from '../views/note.vue'
import note from '../views/mobile/note.vue'
import question from '../views/question.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/task',
    component: task,
  },
  {
    path: '/task/:order',
    component: content
  },
  {
    path: '/target',
    component: target
  },
  {
    path: '/note',
    component: note
  },
  {
    path: '/question',
    component: question
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.push('/task');

export default router
