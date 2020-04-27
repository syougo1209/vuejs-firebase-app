<template>
    <div>
       <!-- ナビゲーションバー -->
     <nav class="navigation-round navbar navbar-expand-md fixed-top navbar-light bg-light " v-if="scrollY<300">
      <div class="container-fluid">

        <!-- ホームリンク -->
        <a href="#" class="navbar-brand" @click="currentComponent='TopPage'" aria-label="ホーム">
         <i class="far fa-lemon"></i>
        </a>

        <!-- 画面幅が狭い時に表示されるハンバーガーメニュー -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- メニュー -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" >
              <router-link class="nav-link" to="/">Top</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/type">文字で入力</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/voice">音声入力</router-link>
</li>



          <template v-if="logInState">
            <li class="nav-item dropdown">
             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ユーザー
               </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
           <router-link class="nav-link" to="/user/favorite">お気に入り</router-link>
            <a class="nav-link"  @click="logOut">ログアウト</a>
          </div>
         </li>
      </template>
<li v-else class="nav-item">
  <router-link class="nav-link" to="/user/login">ログイン</router-link>
</li>
      
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container-fluid -->
    </nav>
  
        <router-view></router-view>
        </div>
</template>

<script>
   import firebase from 'firebase';
    export default{
         data() {
                return {
                    currentComponent: "TopPage",
                    scrollY:0,
                }
            },
            computed: {
      currentUID(){
          return this.$store.getters.currentUID
      },
     logInState(){
       return  this.currentUID!==null
     },
    },
            mounted() {
                window.addEventListener('scroll', this.handleScroll);
            },
            methods: {
                handleScroll() {
                    this.scrollY = window.scrollY
                },
                   logOut() {
             
            firebase
                .auth()
                .signOut() // ログアウト実行
                .then(() => {
                    // ログアウトに成功したときの処理
                    console.log('ログアウトしました');
                   // this.$emit("changeToLogOut");
                //    this.$eventHub.$emit('logOutFromParent');
                  this.$router.push("user/login")
                    this.$store.dispatch("changeLogInState",null)
                    this.$store.dispatch("initaializeFinalRecipe")
                })
                .catch((error) => {
                    // ログアウトに失敗したときの処理
                    console.error('ログアウトエラー', error);
                });
                
                

        }
            },
      
    }
   
</script>


