<template>
     <div>
    <h2>音声</h2>

    {{input_material}}
    <button @click="voiceCapture" class="btn btn-primary">{{recognitionText}}</button>
    <p>{{text}}</p>
    <button @click="serchFirebase" class="btn btn-primary">レシピを表示</button>
    <RecipeShow :recipes="finalRecipe"></RecipeShow>
    
    </div>
     
</template>

<script>
import RecipeShow from "./RecipeShow.vue";
import firebase from 'firebase';

export default {
    data() {
            return {
                     text: '',
                     items: [],
                     recognitionText: '音声入力開始',
                     recognition: new webkitSpeechRecognition(),
                     input_material: [],
                     finalRecipe: [],
                     interimTranscript: "",
                     favoriteRecipe:[],
            }

        },
        computed: {
      currentUID(){
          return this.$store.getters.currentUID
      }  
    },
        /*
      created(){  
             const recipe = firebase
            .database()
            .ref(`favorites/${this.currentUID}`)
            
             recipe.off('child_added');
              
  //追加されたとき 
  recipe.once('child_added', (recipeSnapshot) => {
      console.log("childaded")
      this.favoriteRecipe.push({key: recipeSnapshot.key,
                            recipeInfo: recipeSnapshot.val()})
  })
  
  //お気に入り一覧からメニューが削除されたとき
  recipe.on('child_removed',(recipeSnapshot)=>{
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
     
     console.log(this.favoriteRecipe);
}, */
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
            　   　   this.finalRecipe=[];
            　   　   
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
                            vm.finalRecipe=vm.items
                            
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