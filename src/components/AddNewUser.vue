<template>
    <div>
   <h1>アカウント作成</h1>
   <form class="create-form mt-4 col-sm-12 col-lg-10">
      MAIL：<input v-model="email" type="email" id="user-mail"><br>
      PASS：<input v-model="password" type="password" id="user-pass"><br>
      <button  @click="addAcount" type="button" id="create-button" class="btn btn-success mt-4">{{message}}</button>
    </form>
   
    </div>
</template>

<script>
import firebase from 'firebase';
export default{
     data(){
    return{   email:"",
              password:"", 
              message:"作成",
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
    this.message="作成"
  })
  .catch((error) => {
    console.error('ユーザ作成に失敗:', error);
  });

        }
    }
}
</script>

<style scoped>
    h1{
   text-align:center;
   margin-top:150px;
}
    .create-form{
        margin: 150px auto;
        text-align:center;
    }
    #create-button{
        text-align:center;
    }
</style>