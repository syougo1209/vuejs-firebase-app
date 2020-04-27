<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
import LogInState from "./LogInState.vue"
import LogOutState from "./LogOutState.vue"
import AddNewUser from "./AddNewUser.vue"
//import firebase from 'firebase';
export default {
    computed: {
      currentUID(){
          return this.$store.getters.currentUID
      },
    },
 data(){
        return{
            currentState:"",
        }
    },
    created(){
      if(this.currentUID===null){
          this.currentState=LogOutState; 
      }
      else{
        this.currentState=LogInState;  
      }
      this.$eventHub.$on('logOutFromParent', this.changeToLogOut)
    },
    methods:{
      changeToLogOut(){
        this.currentState=LogOutState  
      },  
    },
    components: {
       LogInState,
       LogOutState,
        AddNewUser
    }
}
</script>