<template>
     <div>
    <div class="alert alert-info center-block  mx-auto " role="alert">音声入力開始を押すと音声入力が始まります。<br>検索の結果は下の材料に表示されます</div>  
    
   <section class="voice-input col-xs-8 col-lg-5">
       <div  class="voice-result ">
           <p>入力中の材料: {{text}}</p>
           <p>材料: {{expressInputmaterial}}</p>
       </div>
    <button @click="voiceCapture" class="btn btn-primary mr-2">{{recognitionText}}</button>
    <button @click="serchFirebase" class="btn btn-primary">レシピを表示</button>
    </section>
    <RecipeShow ></RecipeShow>
    
    </div>
     
</template>

<script>
import RecipeShow from "./RecipeShow.vue";
import firebase from 'firebase';
import { mapGetters } from 'vuex'

export default {
    data() {
            return {
                     text: '',
                     items: [],
                     recognitionText: '音声入力開始',
                     recognition: new webkitSpeechRecognition(),
                     input_material: [],
                     interimTranscript: "",
            }

        },
        computed:{ ...mapGetters(["currentUID","favoriteRecipesDB","finalRecipe"]),
              expressInputmaterial(){
                  return this.input_material.join(" ")
              },
            
        },
          mounted()　{  
           　 this.recognition.continuous = true;
           　this.recognition.lang = 'ja-JP';
             this.recognition.interimResults = true;

              this.recognition.onstart = () => {
                  console.log("音声start")
        this.recognitionText = '音声入力中...'
      }
      this.recognition.onend = () => {
        this.recognitionText = '音声入力開始'
      }
      
      this.recognition.onresult = (event) => {
          console.log("start")
           for (let i = event.resultIndex; i < event.results.length; i++){
         let transcript = event.results[i][0].transcript;
         
        if(event.results[i].isFinal){
        
            this.input_material.push(transcript)
            console.log(transcript)
        }else {
            this.text = transcript;
        }
           }
      }
        },
         methods: {
              voiceCapture(){
                      this.input_material=[];
            　   　  　this.items=[];
            　   　  this.$store.dispatch("setToFinalRecipe",[])
            　   　   this.recognition.start();
                },
            serchFirebase() {
                this.recognition.stop();
                
                const vm=this;
        
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
                            console.log(vm.finalRecipe);
                        }
                        
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
    components:{
        RecipeShow,
    }
 
}
</script>

<style scoped>
    
  .voice-input{
      text-align:center;
      border-radius: 10px;
      background-color:white;
      height:150px;
      margin: 100px auto;
  }  
  .voice-result{
      height:70%;
  }
   .alert {
      text-align:center;
      width:50%;
      margin-top:100px;
}
</style>