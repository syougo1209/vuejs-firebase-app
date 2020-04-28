const state={
     currentUID: null,
};

const getters={
     currentUID: state=>state.currentUID,
}
const mutations={
     changeLogInState(state,uid) {
            state.currentUID=uid;
        },
};
const actions={
    changeLogInState({commit},uid) {
            commit("changeLogInState",uid);
        },
      
}

export default {
    state,
    getters,
    mutations,
    actions
}