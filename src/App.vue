<template>
  <div id="app">
    <router-view v-if="isAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data () {
    return{
      isAlive: true
    }
  },
  methods: {
    reload(){
      this.isAlive = false;
      this.$nextTick(()=>this.isAlive = true);
    }
  }
}
</script>

<style>
#app {
  font-family: 'STXinwei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-tabs--top{
  height: 100%
}
.el-tabs__header{
  margin: 0;
}
.el-tabs__header.istop{
  height: 10%;
}
.el-tabs__content{
  margin: 0;
  height: 90%
}
</style>
