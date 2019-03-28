var mainApp, mainRouter,
    mainData = {
        userInfo: {
            loggedIn: false
        }
    };
/**********************************************************************************/
// mainRouter = new VueRouter({ routerItems });
mainRouter = new VueRouter();
mainRouter.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !mainData.userInfo.loggedIn) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});
mainApp = new Vue({ el: '#app', mainRouter });
mainRouter.onReady(function () {
    console.log('ROUTER: done ...');
});
/**********************************************************************************/

//var About = { template: '<h1>About</div>' };
//var Dashboard = { template: '<h1>Dashboard</h1>' };
//var Dynamic = { template: '<h1>Dynamic</h1>' };

//var Auth = {
//    loggedIn: false,
//    login: function () { this.loggedIn = true },
//    logout: function () { this.loggedIn = false }
//};

//var Login = {
//    template: '<input type="submit" value="Login" v-on:click="login">',
//    methods: {
//        login: function () {
//            Auth.login();
//            router.push(this.$route.query.redirect);
//        }
//    }
//};

//var routerItems = [
//  { path: '/about', component: About },
//  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
//  { path: '/login', component: Login }
//];

//router.addRoutes(routerItems);
//router.addRoutes([{ path: '/dynamic', component: Dynamic }]);