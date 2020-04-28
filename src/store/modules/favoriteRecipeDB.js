const state={
    favoriteRecipesDB: [],
};
const getters={
     favoriteRecipesDB: state=>state.favoriteRecipesDB,
};
const mutations={
     addToFavoriteRecipesDB(state,recipeInfo){
            state.favoriteRecipesDB.push(recipeInfo)
        },
        removeRecipe(state,index){
            state.favoriteRecipesDB.splice(index,1);
     },
     initaializeFinalRecipe(state){
         state.favoriteRecipesDB=[]
     },
};

const actions={
     addToFavoriteRecipesDB({commit},recipeInfo){
           commit("addToFavoriteRecipesDB",recipeInfo);
        },
        removeRecipe({commit},index){
            commit("removeRecipe",index);
   },
    initaializeFinalRecipe({commit}){
    
        commit("initaializeFinalRecipe")
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}