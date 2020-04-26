import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUID: null,
        favoriteRecipesDB: [],
        finalRecipe:[],
    },
    getters: {
        currentUID: state=>state.currentUID,
        favoriteRecipesDB: state=>state.favoriteRecipesDB,
        finalRecipe: state=>state.finalRecipe,
    },
    mutations: {
        changeLogInState(state,uid) {
            state.currentUID=uid;
        },
        addToFavoriteRecipesDB(state,recipeInfo){
            state.favoriteRecipesDB.push(recipeInfo)
        },
        removeRecipe(state,index){
            state.favoriteRecipesDB.splice(index,1);
     },
     pushFinalRecipe(state,recipe){
         state.finalRecipe.push(recipe);
     },
     setToFinalRecipe(state,content){
         state.finalRecipe=content;
     },
     changeIsfavorite(state,{boolean,index}){
    　Vue.set(state.finalRecipe[index], "isFavorite", boolean)
    },
},
    actions: {
        changeLogInState({commit},uid) {
            commit("changeLogInState",uid);
        },
       addToFavoriteRecipesDB({commit},recipeInfo){
           commit("addToFavoriteRecipesDB",recipeInfo);
        },
        removeRecipe({commit},index){
            commit("removeRecipe",index);
   },
   pushFinalRecipe({commit},recipe){
       commit("pushFinalRecipe",recipe);
   },
   setToFinalRecipe({commit},content){
       commit("setToFinalRecipe",content)
   },
   changeIsfavorite({commit},{boolean,index}){
       
       commit("changeIsfavorite",{index: index,boolean: boolean})
   }
   
    }
    
})