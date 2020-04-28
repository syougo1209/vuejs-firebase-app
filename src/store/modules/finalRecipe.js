import Vue from "vue";
const state={
    finalRecipe:[],
};

const getters={
     finalRecipe: state=>state.finalRecipe,
}
const mutations={
     pushFinalRecipe(state,recipe){
         state.finalRecipe.push(recipe);
     },
     setToFinalRecipe(state,content){
         state.finalRecipe=content;
     },
     changeIsfavorite(state,{boolean,index}){
    　Vue.set(state.finalRecipe[index], "isFavorite", boolean)
    },
};
const actions={
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

export default {
    state,
    getters,
    mutations,
    actions
}