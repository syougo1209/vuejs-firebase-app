<template>
     <div>
    <div v-if="favoriteRecipesDB.length>0" class="alert alert-info center-block  mx-auto " role="alert">{{favoriteRecipesDB.length}}件のお気に入りがあります</div>
      <div v-else class="alert alert-info center-block  mx-auto " role="alert">気に入ったレシピをお気に入り登録しましょう</div>
      <div class="wi container mt-5">
      
     <div class="recipe row justify-content-start">
  
  <div class="item col-xs-12 col-md-4 col-lg-3" v-for="recipe in favoriteRecipesDB" :key="recipe.key">
         
         <div class="notouch">
         <div class="box">
         <div class="image">
           <img class="book-item__image img-fluid" alt="" v-bind:src="recipe.recipeInfo.recipeImage">
         </div>
         <div class="detail">
        <a class="recipeName" href="recipe.recipeInfo.recipeUrl">
           <div class="title">
          {{recipe.recipeInfo.recipeTitle}}
           </div>
          </a>
          <div class="favorite-button">
          <button @click="remove(recipe)" class="fav-b btn btn-danger">削除</button>
        </div>
         </div>
         </div>
         </div>
          
         </div>
         </div>
       </div>
        
       </div>
    
</template>
    
<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex'
export default{
    
computed: mapGetters(["currentUID","favoriteRecipesDB"]),
  
    methods: {
         setNullToUid(){
           this.$store.dispatch("changeLogInState",null)  
         },
         remove(recipe){
             console.log(recipe)
             
          console.log(this.currentUID)
          const vm=this
            firebase
            .database()
            .ref(`favorites/${vm.currentUID}/${recipe.key}`)
            .remove()
            .then(()=>{
                console.log(vm.favoriteRecipesDB)
            })
            .catch(()=>{
                console.log("fail")
            })
        },
         
    },
    
   
}
</script>

<style scoped>
         .recipeName　:hover {
    transform: scale(0.8);
    transition: .2s;
}
.alert {
      text-align:center;
      width:50%;
      margin-top:100px;
}

.recipe-items{
 margin-top:150px;
 
}

.recipe-item{
 height:300px;
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
     position: relative;
      border-radius:20px;
}


.image{
 height:180px;
 vertical-align:middle;
 border-bottom:1px solid #dcdcdc;
 text-align: center;
 
}
.detail{
 font-size:15px;
 height:120px;
}

.recipe{
 margin-right:auto;
 margin-left:auto;
 
}
.faborite{
 
 height:30px;
}
.favorite-button{
bottom: 10px;
right: 10px;
 position: absolute;
}
.fav-b{
 margin-bottom:0;
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