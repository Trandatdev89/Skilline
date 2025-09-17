
import AuthenticationSecurity from '@/security/AuthenticationSecurity.ts'
import { jwtDecode } from 'jwt-decode'
import pages from '@/router/pages.ts'
import router from "../router/route.ts";

const newRouter = router;

newRouter.beforeEach((to, from, next) => {
  const accessToken = AuthenticationSecurity.getAccessToken()
  const tokenDecode = jwtDecode<any>(accessToken);
  let role = tokenDecode?.scope
  if (to.matched.some(item => !item.meta.isPublic)) {
    if (!accessToken || !role) {
      return next(pages.login.path)
    }
    const roles = to.meta.roles as string[]

    if (!roles.includes(role)) {
      return next("/")
    }
  }
  next()
})