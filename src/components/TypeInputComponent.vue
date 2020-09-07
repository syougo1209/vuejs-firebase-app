<template>
     <div>
         
     <div class="alert alert-info center-block  mx-auto " role="alert">材料名を複数検索したい場合は半角スペースを間に入れてください.(例:　じゃがいも にんじん)<br>材料の一致順にレシピが表示されます</div>  
     
   <div class="type-input input-group mt-4">
  <input v-model="beforeInputMaterial"  type="text" class="form-control"　placeholder="材料名">
  <div class="input-group-append">
    <button @click="serchFirebase" type="button" class="btn btn-outline-secondary btn-primary">レシピを検索</button>
  </div>
</div>

    <router-view></router-view>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import RecipeShow from "./RecipeShow.vue";
    import { mapGetters } from 'vuex'
    import { input } from "@/input"

    export default {
        mixins: [input],
        data() {
            return {
                beforeInputMaterial: "",
            }

        },
        computed: mapGetters(["currentUID", "favoriteRecipesDB", "finalRecipe"]),
        
        methods: {
            serchFirebase() {
                this.items = []
                this.$store.dispatch("setToFinalRecipe", [])
                this.input_material = []
                const vm = this;
                this.input_material = this.beforeInputMaterial.split(" ");
                this.beforeInputMaterial="";
                firebase.firestore().collection('recipe')
                    .where("recipeMaterial", "array-contains-any", vm.input_material)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            console.log("nai");
                            vm.items = [];
                            vm.input_material = [];
                            this.$store.dispatch("setToFinalRecipe", 1);
                        }
                        else {
                            this.$store.dispatch("setToFinalRecipe", []);
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
                            this.$store.dispatch("setToFinalRecipe", vm.items)
                            //おきにいりにあるものとくらべてボタンと送信を切り替え
                            for (let i = 0; i < vm.finalRecipe.length; i++) {
                                for (let j = 0; j < vm.favoriteRecipesDB.length; j++) {
                                    //お気に入りと被った時
                                    if (vm.favoriteRecipesDB[j].recipeInfo.recipeUrl === vm.finalRecipe[i].recipeUrl) {

                                        this.$store.dispatch("changeIsfavorite", { boolean: true, index: i })
                                        break;
                                    }
                                    if (j === vm.favoriteRecipesDB.length - 1) {
                                        this.$store.dispatch("changeIsfavorite", { boolean: false, index: i })
                                        break;
                                    }

                                } //j
                            }
                            console.log("finalrecipe", vm.finalRecipe)
                        } //else
                    })
            },

        },

    }
</script>

<style scoped>
    .title {
        text-align: center;
        margin-top: 100px;
    }

    .type-input {
        text-align: center;
        margin: 30px auto;
        width: 50%;
    }

    .alert {
        text-align: center;
        width: 50%;
        margin-top: 100px;
    }
</style>