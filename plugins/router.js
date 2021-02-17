export default ({ app, store,redirect }) => {
  app.router.beforeEach((to, from, next) => {
    setTimeout(()=>{
		// console.log("beforeEach");
		// redirect({ path: '/cn/'+to.path })
		// next();
	},1000)
  });
};
