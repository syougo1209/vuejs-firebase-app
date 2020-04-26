<template>
     <div>
    
      <div class="wi container mt-5">
      
     <div class="recipe row justify-content-start">
  
  <div class="item col-sm-4 col-md-3" v-for="data in favoriteRecipesDB" :key="data.key">
         
         <div class="notouch">
         <div class="box">
         <div class="image">
           <img class="book-item__image img-fluid" alt="" v-bind:src="data.recipeInfo.recipeImage">
         </div>
         <div class="detail">
        <a class="recipeName" href="data.recipeInfo.recipeUrl">
           <div class="title">
          {{data.recipeInfo.recipeTitle}}
           </div>
          </a>
          <button @click="remove(data)" class="btn btn-danger">削除</button>
         </div>
         </div>
         </div>
          
         </div>
         </div>
       </div>
        <button   @click="logOut" class="btn btn-primary mt-5" type="button" id="logout-button" >ログアウト</button>
       </div>
    
</template>
    
<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex'
export default{
    
computed: mapGetters(["currentUID","favoriteRecipesDB","finalRecipe"]),
  
    methods: {
         setNullToUid(){
           this.$store.dispatch("changeLogInState",null)  
         },
         remove(data){
             console.log(data)
          console.log("remove")
            firebase
            .database()
            .ref(`favorites/${this.currentUID}/${data.key}`)
            .remove()
            .then(()=>{
                console.log(this.favoriteRecipesDB)
                
            
              
            })
            .catch(()=>{
                console.log("fail")
            })
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
                })
                .catch((error) => {
                    // ログアウトに失敗したときの処理
                    console.error('ログアウトエラー', error);
                });
                
                

        }
    },
    
   
}
</script>

<style scoped>
    .recipeName　:hover {
    transform: scale(0.8);
    transition: .2s;
}

.recipe-items{
 margin-top:150px;
 
}

.recipe-item{
 height:270px;
 text-align:center;
  margin: 0 auto;
  justify-content:space-between;
}

.item{
     
     padding:20px;
   
}

.box{
      border:1px solid #dcdcdc;
      background-color:#f5f5f5;
     
      border-radius:20px;
}


.image{
 height:200px;
 vertical-align:middle;
 border-bottom:1px solid #dcdcdc;
 text-align: center;
 
}
.detail{
 height:70px;
 font-size: 14px;
}

.recipe{
 margin-right:auto;
 margin-left:auto;
 
}
.faborite{
 
 height:30px;
}

.book-item__image{
    margin-top:15px; 
    width:85%;
    height:85%;
}
.detail{
 padding:10px;
 
}
    
</style>