import Vue from 'vue';
import Router from 'vue-router';

const AddNewUser = () => 
import(/* webpackChunkName: "AddNewUser" */ './components/AddNewUser.vue')
const FavoriteAgentComponent = () => 
import(/* webpackChunkName: "FavoriteAgent" */ './components/FavoriteAgentComponent.vue')
const LogInState = () => 
import(/* webpackChunkName: "LogInState" */ './components/LogInState.vue')
const LogOutState = () => 
import(/* webpackChunkName: "LogOutState" */ './components/LogOutState.vue')
const ParentComponent = () => 
import(/* webpackChunkName: "ParentComponent" */ './components/ParentComponent.vue')
const RecipeShow = () => 
import(/* webpackChunkName: "RecipeShow" */ './components/RecipeShow.vue')
const TopPage = () => 
import(/* webpackChunkName: "TopPage" */ './components/TopPage.vue')
const TypeInputComponent = () => 
import(/* webpackChunkName: "TypeInputComponent" */ './components/TypeInputComponent.vue')
const VoiceCaptureComponent = () => 
import(/* webpackChunkName: "VoiceCaptureComponent" */ './components/VoiceCaptureComponent.vue')

Vue.use(Router);

export default new Router({
    mode: "history",
    routes:[{path: "/",
    component: TopPage},
    {path: "/type",
     component:TypeInputComponent   
    },{
      path: "/voice",
     component:VoiceCaptureComponent    
    },
    {
      path: "/user",
      component:FavoriteAgentComponent,
      children:[
          {path: "favorite",component: LogInState},
          {path: "login",component: LogOutState},
          {path: "new",component:AddNewUser}
          ]
    }
    ]
})