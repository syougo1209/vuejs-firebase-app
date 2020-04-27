<template>
     <div>
        
   <h2 class="title">材料を検索してください</h2>
   
   <section id="type-input" >
    <input v-model="beforeInputMaterial" type="text">
    <button @click="serchFirebase" class="btn btn-primary ml-4">検索</button>
    </section>
    
    <RecipeShow ></RecipeShow>
    <ul id="example">
  <li
    v-for="item in items"
    v-bind:key="item.recipeUrl"
  >
    {{ item.recipeTitle}}
  </li>
</ul>
<p> {{input_material}}</p>
    </div>
</template>

<script>
import firebase from 'firebase';
import RecipeShow from "./RecipeShow.vue";
import { mapGetters } from 'vuex'
export default {
    data() {
            return {
                items:[],
                input_material: [],
                beforeInputMaterial:"",
            }

        },
   computed: mapGetters(["currentUID","favoriteRecipesDB","finalRecipe"]),
         methods: {
          
            serchFirebase() {
                this.items=[]
                this.$store.dispatch("setToFinalRecipe",[])
                this.input_material=[]
                const vm=this;
                 this.input_material=this.beforeInputMaterial.split("、");
                 console.log(this.input_material);　
                 console.log(vm.input_material);
                 firebase.firestore().collection('recipe')
                    .where("recipeMaterial", "array-contains-any", vm.input_material)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            console.log("nai");
                            vm.items = [];
                            vm.input_material = [];
                        }
                        else {
                            console.log(snapshot);
                            vm.items.push(snapshot.docs.map(doc => doc.data()));


                            console.log(vm.items[0]); //items[0]で個々の検索結果にアクセス
                            console.log("success");


                            let cleanlist = vm.items[0].filter(function(v1, i1, a1) {

                                return (a1.findIndex(function(v2) {
                                    return (v1.recipeUrl === v2.recipeUrl)
                                }) === i1);

                            });
                            vm.items = cleanlist;
                            console.log(vm.items);
                            cleanlist = [];
                            vm.getHitCount()
                            console.log(vm.items)
                            vm.items.sort(function(a, b) {
                                return b.hitcount - a.hitcount
                            })
                            console.log(vm.items)
                             this.$store.dispatch("setToFinalRecipe",vm.items)
                            //おきにいりにあるものとくらべてボタンと送信を切り替え
                            for(let i = 0; i < vm.finalRecipe.length; i++){
                                for(let j=0; j<vm.favoriteRecipesDB.length; j++){
                                    //お気に入りと被った時
                                    if(vm.favoriteRecipesDB[j].recipeInfo.recipeUrl===vm.finalRecipe[i].recipeUrl){
                                    
                                         this.$store.dispatch("changeIsfavorite",{boolean: true,index: i})
                                        break;
                                    }
                                    if(j===vm.favoriteRecipesDB.length-1){
                                    this.$store.dispatch("changeIsfavorite",{boolean: false,index: i})
                                        break;
                                    }
                                    
                                }//j
                            }
                            console.log("お気に入り",vm.finalRecipe)
                        }//else
                    })
                },

                getHitCount() {
                        let count = 0

            for (let i = 0; i < this.items.length; i++) {
                for (let k = 0; k < this.items[i].recipeMaterial.length; k++) {


                    for (let j = 0; j < this.input_material.length; j++) {

                        if (this.input_material[j] === this.items[i].recipeMaterial[k]) { //ここ条件をゆるくしたい
                            count++;
                        }
                    } //ここまでj
                    if (k === this.items[i].recipeMaterial.length - 1) {
                        this.items[i].hitcount = count;
                        count = 0
                    }
                }
            } //ここまでi
        },
         },
        /*
        changeIsFavorite(url){
         console.log("発火成功",url)
         
         for(let i=0; i<this.finalRecipe.length; i++){
          if(this.finalRecipe[i].recipeUrl===url){
              console.log("あったよ",this.finalRecipe[i])
           this.finalRecipe[i].isFavorite=false;
           console.log("変更",this.finalRecipe[i])
           break;
      }
      
      }   
        },*/
        
    /*
   created(){
       
       this.$eventHub.$on("changeIsFavorite", this.changeIsFavorite)
   },
  */
    components:{
        RecipeShow,
    }
 
}
</script>

<style scoped>
    .title{
        text-align:center;
        margin-top:70px;
    }
    #type-input{
    margin-top:30px;
    text-align : center ;
    }
    
    
    
</style>