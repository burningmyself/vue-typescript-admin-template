import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */


Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
        meta: { hidden: true }
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
        meta: { hidden: true }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
                meta: {
                    title: 'Dashboard',
                    icon: 'dashboard'
                }
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/tree',
        meta: {
            title: 'Example',
            icon: 'example'
        },
        children: [
            {
                path: 'tree',
                component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
                meta: {
                    title: 'Tree',
                    icon: 'tree'
                }
            },
            {
                path: 'table',
                component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
                meta: {
                    title: 'Table',
                    icon: 'table'
                }
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
                meta: {
                    title: 'Form',
                    icon: 'form'
                }
            }
        ]
    },
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
                redirect: '/nested/menu1/menu1-1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
                meta: { title: 'Menu2' }
            }
        ]
    },
    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://github.com/Armour/vue-typescript-admin-template',
                meta: {
                    title: 'External Link',
                    icon: 'link'
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true }
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
    /** when your routing map is too long, you can split it into small modules **/
    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        meta: {
            title: 'errorPages',
            icon: '404'
        },
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
                name: 'Page401',
                meta: {
                    title: 'page401',
                    noCache: true
                }
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
                name: 'Page404',
                meta: {
                    title: 'page404',
                    noCache: true
                }
            }
        ]
    },
    {
        path: '/error-log',
        component: Layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'log',
                component: () => import(/* webpackChunkName: "error-log" */ '@/views/error-log/index.vue'),
                name: 'ErrorLog',
                meta: {
                    title: 'errorLog',
                    icon: 'bug'
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true }
    }
]

const createRouter = () => new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
