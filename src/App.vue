<template>
  <div>
    <md-toolbar class="md-medium">
      <md-button class="md-icon-button"  @click.native="toggleSideNav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">GitHub</h2>
      <md-input-container style="flex: 1">
        <md-input placeholder="Search username"
          v-model="username"
        ></md-input>
      </md-input-container>
    </md-toolbar>
    <md-sidenav class="md-left" ref="sideNav">
      <md-toolbar class="md-medium">
        <md-button class="md-icon-button" @click.native="toggleSideNav">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title">GitHub</h2>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link :to="{ name: 'respositories' }">Repositories</router-link>
        </md-list-item>
        <md-list-item>
          <router-link :to="{ name: 'user' }">User</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <div class="main-content">
      <md-layout>
        <router-view></router-view>
      </md-layout>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { router } from './bootstrap'

export default {
  name: 'GithubApplication',
  router,
  data () {
    return {
      user: null,
      username: null,
      repositories: []
    }
  },
  watch: {
    username (value) {
      this.setUsername(value)
    }
  },
  methods: {
    fetchUser (username) {
      this.$http.get(`/users/${username}`)
        .then(({ data }) => { this.user = data })
        .catch(error => console.log(error))
    },
    fetchRepositories (username) {
      this.$http.get(`users/${username}/repos`)
        .then(({ data }) => this.repositories = data)
        .catch(error => console.log(error))
    },
    toggleSideNav () {
      this.$refs.sideNav.toggle()
    },
    closeSidenav () {
      this.$refs.sideNav.close()
    },
    setUsername: _.debounce(function (username) {
      if (username) {
        this.fetchUser(username)
        this.fetchRepositories(username)
      }
      if (!username) {
        this.user = null
        this.repositories = []
      }
    }, 500)
  },
  mounted () {
    this.fetchUser('gustavocd')
  }
}
</script>

<style>

</style>
