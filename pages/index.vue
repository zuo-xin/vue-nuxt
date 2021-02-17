<template>
	<div class="container">
		<div>
			<Logo />
			{{$t('homepage.subtitle')}}
			<NuxtLink :to="{name:'list'}">to list</NuxtLink>
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

		
		<nuxt-link :to="localePath({ name: 'list' })">
		list
		</nuxt-link>

		<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
		<nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>


		<h2>Users</h2>
		<ul class="users">
			<li v-for="user in users" :key="user.id">
				<NuxtLink :to="{name:'users-id',params: { id: user.id }}">
					{{ user.name }}
				</NuxtLink>
			</li>
		</ul>

		

		<!-- <a @click="$router.push(`/strA-${'参数id'}.html`)"></a>
        <a @click="$router.push(`/strB/${'参数id'}.html`)">去到页面B</a> -->

		<!-- <NuxtLink :to="{name:'pageA',params: { id: 111 }}">
			去到页面A
		</NuxtLink>
		<NuxtLink :to="{name:'pageB',params: { id: 222 }}">
			去到页面B
		</NuxtLink> -->

		<div>{{list}}</div>

		<button type="button" @click.stop="click" class="login">click to login</button>
	</div>
</template>

<script>
export default {
	layout: 'BasicLayout',
	data () {
		return {
			list:"",
			users: [],
		}
	},
	asyncData ({ app, $axios,redirect }) {
		// console.log(app.switchLocalePath('fr')+'/')
		// 	setTimeout(()=>{
		// 		redirect(app.switchLocalePath('fr'))
		// 	},1000)
  		// console.log(app)
		// app.$cookies.set('token', 'hello-world')

		// return $axios.post("/api/index/getIndexDataNew", { type: 8 }).then(res => {
		// 	//redirect(app.switchLocalePath('fr'))
		// 	return { list: res.data[0].image_app }
		// }).catch((err) => {
		// })
	},
	mounted () {
		// console.log(this)
		// console.log(process)
		// console.log(process.client)
		//console.log("mounted")
		//console.log(this.$t('homepage.subtitle'))
		this.$axios.post("/api/index/getIndexDataNew", { type: 8 }).then(res => {
			// console.log(res.data[0].title)
			// this.showSpringFestival();
			this.list = res.data[0].image_app
		}).catch((err) => {
			// this.show_data  = this.show_data + 1
			// this.showSpringFestival();
		})
	},
	methods: {
		click () {
			let routeData = this.$router.resolve({ name: 'account-login' });
			window.open(routeData.href, '_blank');
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	color: $btnBgColor1;
	font-size: 14px;
}

.login {
	color: blue;
	cursor: pointer;
}
</style>
