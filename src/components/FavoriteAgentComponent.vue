<template>
    <component :is="currentState"
   @changeToLogIn="currentState='LogInState'"
   @changeToLogOut="currentState='LogOutState'"
   @changeToAdd="currentState='AddNewUser'"
   ></component>
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
      }  
    },
 data(){
        return{
            currentState:"",
        }
    },
    computed: {
      currentUID(){
          return this.$store.getters.currentUID
      }  
    },
    created(){
      if(this.currentUID===null){
          this.currentState=LogOutState; 
      }
      else{
        this.currentState=LogInState;  
      }
    },
    components: {
       LogInState,
       LogOutState,
        AddNewUser
    }
}
</script>