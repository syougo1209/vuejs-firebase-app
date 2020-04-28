<template>
    <div>
   <h1 >ログイン</h1>
   <div v-show="failMessage!==''" class="alert alert-danger center-block  mx-auto" role="alert">{{failMessage}}</div>
    <form class="login-form mt-4 col-sm-12 col-lg-10">
      MAIL：<input v-model="email" type="email" id="user-mail"><br>
      PASS：<input v-model="password" type="password" id="user-pass"><br>
      <button  @click="logIn" type="button" id="login-button" class="btn btn-success mt-4 mr-4">ログイン</button>
      <button id="my-button" type="button" @click="toAddUser" class="btn btn-success mt-4">新規ユーザー登録</button>
    </form>
    </div>
</template>

<script>
import firebase from 'firebase';
export default{
    computed: {
      currentUID(){
          return this.$store.getters.currentUID
      }  
    },
     methods: {
        logIn() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    // ログインに成功したときの処理
                    console.log('ログインしました', user);
                    this.$emit("changeToLogIn")
                    this.$router.push("/user/favorite")
                })
                .catch((error) => {
                    // ログインに失敗したときの処理
                    console.error('ログインエラー', error);
                    this.failMessage="メールアドレスまたはパスワードが違います"
                });

        },
         toAddUser(){
           this.$router.push("/user/new")
        },
       
    },

    data() {
        return {
            email: "",
            password: "",
            failMessage: "",
        }

    }
}
</script>

<style scoped>
h1{
   text-align:center;
   margin-top:150px;
}
    .login-form{
        margin: 150px auto;
        text-align:center;
    }
     .alert {
      text-align:center;
      width:50%;
      margin-top:60px;
}
    
    
</style>