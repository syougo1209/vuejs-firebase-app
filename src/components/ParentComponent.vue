<template>
    <div>
       <!-- ナビゲーションバー -->
     <nav class="navigation-round navbar navbar-expand-md fixed-top navbar-light bg-light " v-if="scrollY<300">
      <div class="container-fluid">

        <!-- ホームリンク -->
        <a href="#" class="navbar-brand" v-on:click='toTop()' aria-label="ホーム">
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
              <a class="nav-link"  href="#top" @click="currentComponent='TopPage'">Top</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#puppies" @click="currentComponent='TypeInputComponent'">文字で入力</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#kittens" @click="currentComponent='VoiceCaptureComponent'">音声で入力</a>
            </li>
            <template v-if="logInState">
            <li class="nav-item">
              <a class="nav-link" href="#gallery" @click="currentComponent='FavoriteAgentComponent'">お気に入り</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#gallery" @click="logOut">ログアウト</a>
            </li>
            </template>
            <li v-else class="nav-item">
              <a  class="nav-link" href="#gallery" @click="currentComponent='FavoriteAgentComponent'">ログイン</a>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container-fluid -->
    </nav>
   
        
      <keep-alive>
        <component :is="currentComponent" id="action-items"
        @toVoice="currentComponent='VoiceCaptureComponent'"
        @toTyping="currentComponent='TypeInputComponent'"
        @toFavorite="currentComponent='FavoriteAgentComponent'"
        ></component>
        </keep-alive>
        </div>
</template>

<script>
    import TopPage from "./TopPage.vue";
    import firebase from 'firebase';
    import VoiceCaptureComponent from "./VoiceCaptureComponent.vue";
    import  TypeInputComponent from "./TypeInputComponent.vue";
    import FavoriteAgentComponent from "./FavoriteAgentComponent.vue";
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
                    this.$emit("changeToLogOut")
                    this.setNullToUid
                    this.$store.dispatch("initaializeFinalRecipe")
                })
                .catch((error) => {
                    // ログアウトに失敗したときの処理
                    console.error('ログアウトエラー', error);
                });
                
                

        }
            },
       components:{
            TopPage,
            VoiceCaptureComponent,
            TypeInputComponent,
            FavoriteAgentComponent
        }  
    }
   
</script>


