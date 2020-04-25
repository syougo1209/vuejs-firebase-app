import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUID: null,
        favoriteRecipesDB: [],
    },
    getters: {
        currentUID: state=>state.currentUID,
        favoriteRecipesDB: state=>state.favoriteRecipesDB
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
     }
        
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
   }
    }
    
})