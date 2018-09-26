import Vue from "vue";
import Vuex from "vuex";
import router from './router';

import { defaultClient as apolloClient } from "./main";
import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload;
        },
        clearUser: state => (state.user = null),
        setError : (state, payload) => {
            state.error = payload
        },
        clearError: state => (state.error = null)
    },
    actions: {
        getCurrentUser: ({ commit }) => {
            commit("setLoading", true);
            apolloClient
                .query({
                    query: GET_CURRENT_USER
                })
                .then(({ data }) => {
                    commit("setLoading", false);
                    //Add user data to state
                    commit("setUser", data.getCurrentUser);
                    console.log(data.getCurrentUser);
                })
                .catch(err => {
                    commit("setLoading", false);
                    console.error(err);
                });
        },
        getPosts: ({commit}) => {
            // use ApolloClient to fire getPosts query
            commit('setLoading', true);
            apolloClient
                .query({
                    query: GET_POSTS
                })
                .then(({data}) => {
                    commit('setPosts', data.getPosts);
                    commit('setLoading', false);
                })
                .catch(err => {
                    commit('setLoading', false);
                    console.error(err);
                });
        },
        signinUser: ({ commit }, payload) => {
            commit('clearError');
            // clear token
            localStorage.setItem("token", "");
            apolloClient
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(({data})=>{
                    localStorage.setItem("token", data.signinUser.token);
                    //console.log(data.signinUser);
                    // to make sure created method is run in mai.js (we run getCurrentUser)
                    router.go();
                })
                .catch(err => {
                    commit('setError', err);
                    console.log(err);
                })
        },
        signoutUser: async ({ commit }) => {
            // clear user in state
            commit('clearUser');
            // remove token in localStorage
            await localStorage.setItem('token', '');
            // end session
            apolloClient.resetStore();
            router.push('/');
        }
    },
    getters:{
        posts: state => state.posts,
        user: state => state.user,
        loading: state => state.loading,
        error: state => state.error
    }
});