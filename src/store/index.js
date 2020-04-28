import Vue from "vue";
import Vuex from 'vuex';
import favoriteRecipesDB from"./modules/favoriteRecipeDB"
import finalRecipe from"./modules/finalRecipe"
import currentUID from"./modules/currentUID"

Vue.use(Vuex);

export default new Vuex.Store({
 modules:{
     favoriteRecipesDB,
     finalRecipe,
     currentUID
 }
    
})