<template>
  <v-container v-if="getPosts">
    <v-flex xs12>
      <v-carousel v-bind="{'cycle': true}" interval="3000">
        <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
          <h1>{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>

</template>

<script>
    import { gql } from "apollo-boost";

    export default {
        name: "home",
        apollo:{
            getPosts: {
                query: gql`
                  query{
                    getPosts{
                      _id
                      title
                      imageUrl
                      description
                      likes
                    }
                  }
                `
            }
        }
    };
</script>
