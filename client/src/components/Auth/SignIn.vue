<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Welcome Back!</h1>
            </v-flex>
        </v-layout>

        <!-- Error -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <!-- Signin Form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSigninUser">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :disabled="!isFormValid" :loading="loading" color="accent" type="submit">Signin</v-btn>
                                    <h3>Don't have an account?
                                        <router-link to="/signup">Signup</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "SignIn",
        data(){
            return{
                username: '',
                password: '',
                isFormValid: true,
                usernameRules: [
                    username => !!username || "Username is required",
                    username => username.length < 10 || "Username must be less than 10 characters"
                ],
                passwordRules: [
                    password => !!password || "Password is required",
                    password => password.length >= 7 || "Password must be at least 7 characters"
                ]
            }
        },
        computed: {
            ...mapGetters(['loading', 'error', 'user'])
        },
        watch: {
          user(value){
              if(value){
                  this.$router.push('/');
              }
          }
        },
        methods: {
            handleSigninUser(){
                this.$store.dispatch('signinUser', {
                    username: this.username,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>