<template>
      <div>
          
    <div class="img_area d-none d-sm-block">
        背景画像
        <div class="caption_area">
            <h1>あなたの冷蔵庫の残りから最高のレシピを提供します</h1>
        </div>
    </div>
    
    

    <div id="intro mt-3 ">
        <h1 class="search-theme mt-5">Search</h1>

        <div class="view container-fluid">
            <div class="row justify-content-center no-gutters">
                <div class="col-lg-6 mt-5">

                    <div class="pic_frame" @mouseover="shrinking" @mouseleave="enlarging" @click="toTyping">
                        <div class="no-touch">
                            <div class="pic-wrapper">
                                <img src="../assets/Laptop 4.jpeg" class="img-fluid">
                            </div>
                            <div class="pic-detail">
                                <div class="pic-theme"></div>
                                <div class="pic-description mt-3">
                                    <h3>文字入力</h3>
                                    <p>レシピを材料から検索できます</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="col-lg-6 mt-5">

                    <div class="pic_frame" @mouseover="shrinking" @mouseleave="enlarging" @click="toVoice">
                        <div class="no-touch">
                            <div class="pic-wrapper">
                                <img src="../assets/image_processing20190811-20624-1mhglkn.png" class="img-fluid">
                            </div>
                            <div class="pic-detail">
                                <div class="pic-theme"></div>
                                <div class="pic-description mt-3">
                                    <h3>音声入力</h3>
                                    <p>音声でレシピを材料から検索できます(chromeのみ可能です)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

</div>
</div>
</div>
    <div class="to_favorite_recipes">
        <button type="button" @click="toFavorite" class="btn btn-outline-success rounded-pill mx-auto d-block mt-5" style="width:300px;height:70px">お気に入り</button>
</div>
</div>
</template>

<script>
    import firebase from 'firebase';
    import { mapGetters } from 'vuex';

    export default {
        computed: mapGetters(["currentUID","favoriteRecipesDB","finalRecipe"]),
         created() {
            
            let vm = this
            firebase.auth().onAuthStateChanged((user) => {
                   this.$store.dispatch("changeLogInState",null)
                    this.$store.dispatch("initaializeFinalRecipe")
                    this.$store.dispatch("setToFinalRecipe",[])
                if (user) {
                    console.log('状態：ログイン中');
                    this.$store.dispatch("changeLogInState", user.uid)
                    console.log("loginornot", vm.currentUID);
                
　                   console.log("mounted", vm.currentUID);
                    const recipes = firebase
                        .database()
                        .ref(`favorites/${vm.currentUID}`)

                    recipes.off('child_added');
                    recipes.off("child_removed")
                    //追加されたとき
                    recipes.on('child_added', (recipeSnapshot) => {
                        console.log("favorite is added!")
                        console.log(recipeSnapshot)
                        let info = {
                            key: recipeSnapshot.key,
                            recipeInfo: recipeSnapshot.val()
                        }
                        this.$store.dispatch("addToFavoriteRecipesDB", info)

                        let url = recipeSnapshot.val().recipeUrl
                      console.log("finalRecipe",vm.finalRecipe);
                      
                        if (vm.finalRecipe.length !== 0) {
                            console.log("成功") //ここに入ってるつまりvm.finalRecipeがあることに
                            let index = vm.getIndex(url, vm.finalRecipe, "recipeUrl")
                            
                            vm.$store.dispatch("changeIsfavorite", { boolean: true, index: index })
                            console.log("changeis Isfavorite", vm.finalRecipe)
                        }

                    });//chils_added


                    recipes.on('child_removed', (recipeSnapshot) => {
                        console.log("削除")
                        console.log(recipeSnapshot.val().recipeUrl)

                        console.log(vm.finalRecipe)
                        let url = recipeSnapshot.val().recipeUrl　　　　　　　　
                        if (vm.finalRecipe.length !== 0) {
                            let index = vm.getIndex(url, vm.finalRecipe, "recipeUrl")
                            console.log("changeis favoir", vm.finalRecipe)
                            this.$store.dispatch("setToFinalRecipe",[])
                        }

                        let index = vm.getIndex(recipeSnapshot.key, vm.favoriteRecipesDB, "key")
                        console.log("消えた配列の番号", index);

                        this.$store.dispatch("removeRecipe", index)
                    }) //削除

                }
                else {
                    console.log('状態：ログアウト');
                    this.$store.dispatch("changeLogInState", null)
                }

            })
        },
        methods: {

            toVoice() {
                this.$router.push("/voice")
            },
            toTyping() {
                this.$router.push("/type")
            },
            toFavorite() {
                this.$router.push("/user/favorite")
            },
            getIndex(value, arr, prop) {
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i][prop] === value) {
                                    return i;
                                }
                            }
                            return; //値が存在しなかったとき
                        },

            shrinking: function(e) {
                let scale = 1

                const interval = setInterval(() => {

                    e.target.style.transform = `scale(${scale})`

                    scale -= 0.01;
                    if (scale < 0.9) {
                        clearInterval(interval);
                    }
                }, 20)
                const int = setInterval(() => {


                    e.target.querySelector('img').style.transform = `scale(${scale})`
                    scale -= 0.01;
                    if (scale < 0.9) {
                        clearInterval(int);
                    }
                }, 40)
            },
            enlarging: function(e) {
                let scale = 0.9

                const interval = setInterval(() => {

                    e.target.style.transform = `scale(${scale})`
                    scale += 0.01;
                    if (scale > 1) {
                        clearInterval(interval);
                    }
                }, 20)
                const int = setInterval(() => {


                    e.target.querySelector('img').style.transform = `scale(${scale})`
                    scale += 0.01;
                    if (scale > 1) {
                        clearInterval(int);
                    }
                }, 40)
            },

        }

    }
</script>

<style scoped>
    .img_area {
        position: relative;
        /* 子要素の起点を指定 */
        height: 600px;
         background-image: url("../assets/https___imgix-proxy.n8s.jp_content_pic_20170522_96958A9F889DE3E4E0EAE4E2E2E2E3E0E2E7E0E2E3E5E2E2E2E2E2E2-DSXZZO1628609012052017000000-PB1-12.jpg");
        background-color: black;
        background-size: contain;
        background-size: cover;
        text-align: center;
    }

    .caption_area {
        position: absolute;
        /* 要素の配置方法を指定 */
        color: #fff;
        /* 文字色指定 */
        width: 500px;

        padding-top: 5px;
        height: 70px;
        /* 高さ指定 */
        text-align: center;
        /* 文字を中央揃えに */
        font-size: 50px;
        /* フォントサイズ指定 */
        top: 300px;
        /* 上からの位置指定 */
        bottom: 0;
        /* 下からの位置指定 */
        left: 0;
        /* 左からの位置指定 */
        right: 0;
        /* 右からの位置指定 */
        margin: auto;
        /* 位置調整と組み合わせて上下中央に */
    }

    .search-theme {
        font-size: 70px;
        text-align: center
    }

    .intro-text {
        padding: 20px;
        color: #777;
    }

    .pic_frame {
        height: 350px;
        text-align: center;
        background-color: white;
        border-radius: 20px;
        width: 60%;
        margin: 0 auto;
    }

    .pic-wrapper {

        height: 200px
    }

    .pic-wrapper img {
        border-radius: 20px 20px 0px 0px;
        width: 100%;
        height: 200px;
        object-fit: contain;
    }

    .to_favorite_recipes {
        margin: 0 auto;
    }

    .pic_frame:hover {
        transform: scale(0.95);
        transition: .5s;
    }

    .no-touch {
        pointer-events: none;
    }

    a:link {
        color: #a9a9a9;
    }

    a:visited {
        color: #000080;
    }

    a:hover {
        color: #ff0000;
    }

    a:active {
        color: #ff8000;
    }
    .hidden-xs, .hidden-sm{
    
    display:none;    
    }
</style>