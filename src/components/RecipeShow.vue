<template>
     <div>
     
      <div v-show="finalRecipe.length>0" class="alert alert-info center-block  mx-auto" role="alert">{{finalRecipe.length}}件の新着情報があります</div>
   
   
    
      <div class="wi container mt-5">
      
     <div class="recipe row justify-content-start">
  
  <div class="item col-xs-12 col-md-4 col-lg-3" v-for="data in finalRecipe" :key="data.recipeUrl">
         
         <div class="notouch">
         <div class="box">
         <div class="image">
           <img class="book-item__image img-fluid" alt="" v-bind:src="data.foodImageUrl">
         </div>
         <div class="detail">
        <a class="recipeName" href="data.recipeUrl">
           <div class="title">
          {{data.recipeTitle}}
           </div> 
          </a>
          <div v-show="currentUID!==null" class="favorite-button mb-0">
           <button v-if="data.isFavorite" class="fav-b btn btn-success">お気に入り</button>
           
           <button v-else  class="fav-b btn btn-primary"　@click="addFavorite(data)">登録</button>
           </div>
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
    computed: mapGetters(["currentUID","finalRecipe"]),
   
     methods:{
        addFavorite(data){
        
            const favoriteRecipe={
                recipeUrl: data.recipeUrl,
                recipeImage: data.foodImageUrl,
                recipeTitle: data.recipeTitle,
               
            };
            firebase
            .database()
            .ref(`favorites/${this.currentUID}`)
            .push(favoriteRecipe)
            .then(()=>{
                console.log("success");
               
            })
            .catch(()=>{
                console.log("fail")
            })
        },
        
    }
       
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
      margin-top:60px;
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