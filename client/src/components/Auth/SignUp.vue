<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Get started here</h1>
            </v-flex>
        </v-layout>

        <!-- Error -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <!-- Signup Form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="accent" dark>
                    <v-container>
                        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignupUser">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="emailRules" v-model="email" prepend-icon="email" type="email" label="Email" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="gavel" label="Confirm Password" type="password"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :disabled="!isFormValid" :loading="loading" color="info" type="submit">Signin</v-btn>
                                    <h3>Already have an account?
                                        <router-link to="/signin">Signin</router-link>
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
        name: "SignUp",
        data(){
            return{
                isFormValid: true,
                username: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                usernameRules: [
                    username => !!username || 'Username is required',
                    username => username.length < 10 || "Username cannot be more than 10 characters"
                ],
                emailRules: [
                    email => !!email || 'Email is required',
                    email => /.@+./.test(email) || 'Email must be valid'
                ],
                passwordRules: [
                    password => !!password || 'Password is required',
                    password => password.length >= 4 || 'Password must be at least 4 characters',
                    confirmation => confirmation === this.password || 'Passwords must match'
                ]
            }
        },
        computed:{
            ...mapGetters(['loading', 'error'])
        },
        methods: {
            handleSignupUser(){

            }
        }
    }
</script>

<style scoped>

</style>