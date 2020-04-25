<template>
    <div>
   <h1>create acount</h1>
    <form>
      MAIL：<input v-model="email" type="email" id="user-mail"><br>
      PASS：<input v-model="password" type="password" id="user-pass"><br>
      <button  @click="addAcount" type="button" id="login-button">{{message}}</button>
    </form>
   
    </div>
</template>

<script>
import firebase from 'firebase';
export default{
     data(){
    return{   email:"",
              password:"", 
              message:"ログイン",
    }
    },
    methods:{
        addAcount(){
            this.message="ログイン処理中"
            firebase
  .auth()
  .createUserWithEmailAndPassword(this.email, this.password)
  .then((user) => {
    console.log('ユーザ作成に成功',user);
    this.$emit("changeToLogIn")
    this.message="ログイン"
  })
  .catch((error) => {
    console.error('ユーザ作成に失敗:', error);
  });

        }
    }
}
</script>