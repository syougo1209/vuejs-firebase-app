<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>


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
     
    },
    methods:{
      changeToLogOut(){
        this.$router.push("/user/login") 
      },  
    },
  
}
</script>