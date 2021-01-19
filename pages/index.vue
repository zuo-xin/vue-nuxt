<template>
	<div class="container">
		<div>
			<Logo />
      <NuxtLink to="/list" >to list</NuxtLink>
			<h1 class="title">
				Networking
			</h1>
			<div class="links">
				<a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
					Documentation
				</a>
				<a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey">
					GitHub
				</a>
			</div>
		</div>

		<h2>Users</h2>
		<ul class="users">
			<li v-for="user in users" :key="user.id">
				<NuxtLink :to="{name:'users-id',params: { id: user.id }}">
					{{ user.name }}
				</NuxtLink>
			</li>
		</ul>

    <button type="button" @click.stop="click" class="login">click to login</button>
	</div>
</template>

<script>


import axios from 'axios'

export default {
	layout: 'BasicLayout',
	async asyncData () {
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
		return { users: data }
  },
  mounted(){
    console.log(process)
    console.log(process.client)
  },
  methods:{
    click(){
      let routeData = this.$router.resolve({name: 'account-login'});
      window.open(routeData.href, '_blank');
    }
  }
}
</script>

<style lang="scss">
.title {
	color: $btnBgColor1;
}
.login{
  color: blue;
  cursor: pointer;
}
</style>
