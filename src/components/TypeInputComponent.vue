<template>
     <div>
        
   <h2 class="title">材料を検索してください</h2>
   
   <section id="type-input" >
    <input v-model="beforeInputMaterial" type="text">
    <button @click="serchFirebase" class="btn btn-primary ml-4">検索</button>
    </section>
    
    <RecipeShow :recipes=" finalRecipe"></RecipeShow>
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
export default {
    data() {
            return {
                items:[],
                input_material: [],
                beforeInputMaterial:"",
                finalRecipe:[],
                favoriteRecipe: [],
            }

        },
         computed: {
      currentUID(){
          return this.$store.getters.currentUID
      }  
    },
         methods: {
            serchFirebase() {
                this.items=[]
                this.finalRecipe=[]
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
                            vm.finalRecipe=vm.items
                            //おきにいりにあるものとくらべてボタンと送信を切り替え
                            for(let i = 0; i < vm.finalRecipe.length; i++){
                                for(let j=0; j<vm.favoriteRecipe.length; j++){
                                    if(vm.favoriteRecipe[j].recipeInfo.recipeUrl===vm.finalRecipe[i].recipeUrl){
                                        vm.finalRecipe[i].class="btn btn-success"
                                        vm.finalRecipe[i].buttonWord="登録済み"
                                        vm.finalRecipe[i].styleType="pointer-events: none"
                                        break;
                                    }
                                    if(j===vm.favoriteRecipe.length-1){
                                        vm.finalRecipe[i].class="btn btn-primary"
                                        vm.finalRecipe[i].buttonWord="登録"
                                        vm.finalRecipe[i].styleType=""
                                        break;
                                    }
                                    
                                }//j
                            }
                            console.log(vm.finalRecipe);
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
    created(){
      console.log("created")
       const recipes = firebase
            .database()
            .ref(`favorites/${this.currentUID}`)
            
             recipes.off('child_added');
              
  //追加されたとき
  recipes.once('child_added', (recipeSnapshot) => {
      this.favoriteRecipe.push({key: recipeSnapshot.key,
                            recipeInfo: recipeSnapshot.val()})
     
     console.log(this.favoriteRecipe);
  });  
  /* これをするとお気に入りページのchild?removedが動かない
  recipes.on('child_removed',(recipeSnapshot)=>{
      console.log("removedがvoiceに反映された")
      for(let i=0; i<this.finalRecipe.length; i++){
      if(this.finalRecipe[i].recipeUrl===recipeSnapshot.recipeUrl){
           this.finalRecipe[i].class = "btn btn-primary"
           this.finalRecipe[i].buttonWord = "登録"
           this.finalRecipe[i].styleType = ""
           break;
      }
      
      }
  });
    },*/
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