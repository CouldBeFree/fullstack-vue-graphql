import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import AddPost from './components/Posts/AddPost'
import Posts from './components/Posts/Posts'

import Profile from './components/Auth/Profile'
import Signin from './components/Auth/SignIn'
import Signup from './components/Auth/SignUp'

Vue.use(Router);

export default new Router({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/posts',
            name: 'Posts',
            component: Posts
        },
        {
            path: '/post/add',
            name: 'AddPost',
            component: AddPost
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/Signup',
            name: 'Signup',
            component: Signup
        }
    ]
})