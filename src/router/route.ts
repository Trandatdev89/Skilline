import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutDefault from '@/layout/layout-default/LayoutDefault.vue'
import LayoutAdmin from '@/layout/layout-admin/LayoutAdmin.vue'
import About from '@/views/About.vue'
import Pages from '@/router/pages.ts'
import Login from '@/views/login/Login.vue'
import Post from '@/views/Post.vue'
import Redirect from '@/redirect/Redirect.vue'
import AuthenticationSecurity from '@/security/AuthenticationSecurity.ts'
import { jwtDecode } from 'jwt-decode'
import pages from '@/router/pages.ts'
import Fobiden from '@/views/errorPage/Fobiden.vue'
import Course from '@/views/Course.vue'
import Lecture from '@/views/Lecture.vue'
import Order from '@/views/Order.vue'
import Cart from '@/views/Cart.vue'
import Register from '@/views/login/Register.vue'
import Test from '@/views/Test.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Test2 from '@/views/Test2.vue'
import ManageCourse from '@/views/admin/ManageCourse.vue'
import Success from '@/views/Success.vue'
import Logout from '@/views/Logout.vue'
import Category from '@/views/Category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...Pages.layoutDefault,
      component: LayoutDefault,
      children: [
        {
          ...Pages.home,
          component: HomeView,
        },
        {
          ...Pages.about,
          component: About,
        },
        {
          ...Pages.fobiden,
          component: Fobiden,
        },
        {
          ...Pages.success,
          component: Success,
        },
        {
          ...Pages.category,
          component: Category,
        },
        {
          ...Pages.logout,
          component: Logout,
          meta: {
            requireAuth: true,
            roles:["ADMIN","USER"]
          }
        },
        {
          ...Pages.login,
          component: Login
        },
        {
          ...Pages.course,
          component: Course
        },
        {
          ...Pages.lecture,
          component: Lecture
        },
        {
          ...Pages.register,
          component: Register
        },
        {
          ...Pages.order,
          component: Order
        },
        {
          ...Pages.cart,
          component: Cart
        },
        {
          ...Pages.redirect,
          component: Redirect,
          meta: {
            requireAuth: true,
            roles:["ADMIN","USER"]
          }
        },
        {
          ...Pages.post,
          component: Post
        }
      ]
    },
    {
      ...Pages.layoutAdmin,
      component: LayoutAdmin,
      meta: {
        requireAuth: true,
        roles:["ADMIN"]
      },
      children:[
        {
          ...Pages.dashboard,
          component: Dashboard
        },
        {
          ...Pages.manageCourses,
          component: ManageCourse
        }
      ]
    },
    {
      ...Pages.test,
      component: Test
    },
    {
      ...Pages.test2,
      component: Test2
    },
  ]
});

router.beforeEach((to, from, next) => {
  const accessToken = AuthenticationSecurity.getAccessToken();
  console.log(accessToken);
  // Kiểm tra route có cần authentication không
  if (to.matched.some(item => item.meta.requireAuth)) {
    // Kiểm tra accessToken trước khi decode
    if (!accessToken) {
      return next(pages.login.path)
    }

    try {
      const tokenDecode = jwtDecode<any>(accessToken)
      const role = tokenDecode?.scope
      if (!role) {
        return next(pages.login.path)
      }
      const roles = to.meta.roles as string[]
      if (roles && !roles.includes(role)) {
        return next(pages.fobiden.path)
      }
    } catch (error) {
      return next(Pages.login.path)
    }

  }
  next();
})



export default router
