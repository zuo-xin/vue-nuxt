export default function({ isHMR, app, store, route, params, error, redirect }) {
	
  	app.$axios.post("/api/index/getIndexDataNew", { type: 8 }).then(res => {
		  console.log(app.$i18n.locale)
	  if(app.$i18n.locale === "fr"){
	  }else{
		redirect(app.switchLocalePath('es'))

	  }
	  
	}).catch(err => {});
	
	
}
