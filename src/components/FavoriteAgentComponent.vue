<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>

//import firebase from 'firebase';
export default {
    computed: {
      currentUID(){
          return this.$store.getters.currentUID
      },
    },
    created(){
      if(this.currentUID===null){
          this.$router.push("/user/login") 
      }
      else{
       this.$router.push("/user/favorite") 
      }
      //this.$eventHub.$on('logOutFromParent', this.changeToLogOut)
    },
    methods:{
      changeToLogOut(){
        this.$router.push("/user/login") 
      },  
    },
   
}
</script>