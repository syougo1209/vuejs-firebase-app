<template>
    <div>
   <h1>Firebase Test</h1>
    <form>
      MAIL：<input v-model="email" type="email" id="user-mail"><br>
      PASS：<input v-model="password" type="password" id="user-pass"><br>
      <button  @click="logIn" type="button" id="login-button" class="btn btn-primary">ログイン</button>
     

    </form>
    <button id="my-button" type="button" @click="toAddUser" >新規ユーザー登録</button><br>
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
                })
                .catch((error) => {
                    // ログインに失敗したときの処理
                    console.error('ログインエラー', error);
                    
                });

        },
         toAddUser(){
             this.$emit('changeToAdd')
        },
       
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('状態：ログイン中');
        this.$store.dispatch("changeLogInState",user.uid)
        console.log(this.currentUID);
        
    }
    else {
        console.log('状態：ログアウト');
        this.$store.dispatch("changeLogInState",null)
        
    }
});
    },
    data() {
        return {
            email: "",
            password: "",
        }

    }
}
</script>