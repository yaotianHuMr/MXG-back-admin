import router from "./router/index"

router.beforeEach((to,from,next)=>{
    const token = sessionStorage.getItem('token')
    if(!token){
      next('/login')
    }else{
      next()
    }
   next()
  })