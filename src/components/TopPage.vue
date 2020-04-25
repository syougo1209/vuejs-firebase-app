<template>
      <div>
    <div class="img_area ">
        背景画像
        <div class="caption_area">
            <h1>ロゴ</h1>
        </div>
    </div>

    <div id="intro mt-3 ">
        <h1 class="search-theme mt-5">Search</h1>

        <div class="view container-fluid">
            <div class="row justify-content-center no-gutters">


                <div class="col-4 mt-5">

                    <div class="pic_frame" @mouseover="shrinking" @mouseleave="enlarging">
                        <div class="no-touch">
                            <div class="pic-wrapper">
                                <img src="../assets/kitten1.jpg" class="img-fluid">
                            </div>
                            <div class="pic-detail">
                                <div class="pic-theme"></div>
                                <div class="pic-description">
                                    <p>音声</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4 mt-5">

                    <div class="pic_frame" @mouseover="shrinking" @mouseleave="enlarging" @click="toTyping">
                        <div class="no-touch">
                            <div class="pic-wrapper">
                                <img src="../assets/kitten1.jpg" class="img-fluid">
                            </div>
                            <div class="pic-detail">
                                <div class="pic-theme"></div>
                                <div class="pic-description">
                                    <p>画像</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="col-4 mt-5">

                    <div class="pic_frame" @mouseover="shrinking" @mouseleave="enlarging" @click="toTyping">
                        <div class="no-touch">
                            <div class="pic-wrapper">
                                <img src="../assets/kitten1.jpg" class="img-fluid">
                            </div>
                            <div class="pic-detail">
                                <div class="pic-theme"></div>
                                <div class="pic-description">
                                    <p>タイピング</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

</div>
</div>
</div>

           




    <div class="to_favorite_recipes">
        <button type="button" class="btn btn-outline-success rounded-pill mx-auto d-block mt-5" style="width:300px;height:70px">ブロックレベル</button>
</div>
</div>
</template>

<script>
import firebase from 'firebase';
import {mapGetters} from 'vuex';

export default {
    computed: mapGetters(["currentUID","favoriteRecipesDB"]),
    created(){
        firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('状態：ログイン中');
        this.$store.dispatch("changeLogInState",user.uid)
        console.log("loginornot",this.currentUID);
        this.currentState='LogInState'
        
    }
    else {
        console.log('状態：ログアウト');
        this.$store.dispatch("changeLogInState",null)
        
    }
        
        })
    },
   
     methods:{
        toPicture(){
            this.$emit('toPicture')
        },
        toVoice(){
            this.$emit('toVoice')
        },
        toTyping(){
            this.$emit('toTyping')
        },
           shrinking:function(e){
            let scale=1
      
            const interval=setInterval(()=>{
               
               e.target.style.transform=`scale(${scale})`
                
                scale-=0.01;
                if(scale<0.9){
                    clearInterval(interval);
                }
            },20)
            const int=setInterval(()=>{
               
              
               e.target.querySelector('img').style.transform=`scale(${scale})`
                scale-=0.01;
                if(scale<0.9){
                    clearInterval(int);
                }
            },40)
        },
        enlarging: function(e){
            let scale=0.9
           
            const interval=setInterval(()=>{
                
                e.target.style.transform=`scale(${scale})`
                scale+=0.01;
                if(scale>1){
                    clearInterval(interval);
                }
            },20)
             const int=setInterval(()=>{
               
               
                e.target.querySelector('img').style.transform=`scale(${scale})`
                scale+=0.01;
                if(scale>1){
                    clearInterval(int);
                }
            },40)
        },
        
    }
 
}
</script>

<style scoped>
   .img_area{
    position:  relative;        /* 子要素の起点を指定 */
    
     height:400px;
   /* background-image: url("https://ds-b.jp/media/files/libs/15596/201901091544376843.jpg?1583378494");/* 高さ指定 */ 
   background-color: red;
    background-size: cover;
    text-align: center;
}
.caption_area{
    position:  absolute;        /* 要素の配置方法を指定 */
    
    color:  #fff;               /* 文字色指定 */
    width:  200px;    
   
    padding-top:5px;
    height: 70px;               /* 高さ指定 */
    text-align:  center;        /* 文字を中央揃えに */
    font-size: 50px;            /* フォントサイズ指定 */
    top:   200px;                    /* 上からの位置指定 */
    bottom:  0;                 /* 下からの位置指定 */
    left:  0;                   /* 左からの位置指定 */
    right:  0;                  /* 右からの位置指定 */
    margin:  auto;              /* 位置調整と組み合わせて上下中央に */
}
.search-theme{
 font-size: 70px;
 text-align: center
}
.intro-text{
 padding: 20px;
 color:#777;
}

 .pic_frame {
      height:300px;
      text-align: center;
      background-color: white;
      border-radius:20px;
      width:80%;
      margin:0 auto;
    }
    
    .pic-wrapper{
     height: 150px
    }
   .pic-wrapper img{
    border-radius:20px 20px 0px 0px;
     width:100%;
    height: 150px;
 　　　object-fit: contain;
   }

   .to_favorite_recipes{
   margin: 0 auto;
   }
   
 .pic_frame:hover{
    transform: scale(0.95);
    transition: .5s;
}
    .no-touch{
 pointer-events:none;
}
a:link { color:#a9a9a9 ; }
a:visited { color: #000080; }
a:hover { color: #ff0000; }
a:active { color: #ff8000; }
    
</style>