var _MAIN_VUE, _MAIN_ROUTER,
    _MAIN_DATA = {
        userInfo: {
            loggedIn: false
        }
    };

/**********************************************************************************/

function f_viewLoad(viewName, callback) {
    console.log('VIEW_LOAD ...');

    var file = 'view/' + viewName + '/css.css';
    var head = document.getElementsByTagName("head")[0];

    var notExist = document.querySelectorAll('#view_js_' + viewName + ', #view_css_' + viewName).length == 0;
    if (notExist == false) {
        console.error('VIEW [' + viewName + '] RESOURCE EXIST ...');
        return;
    }

    var link = document.createElement('link');
    link.setAttribute('id', 'view_css_' + viewName);
    link.setAttribute('rel', 'stylesheet');
    link.href = file;
    head.appendChild(link);

    file = 'view/' + viewName + '/js.js';
    var script = document.createElement('script');
    script.setAttribute('id', 'view_js_' + viewName);
    script.src = file;
    script.type = 'text/javascript';

    //real browsers
    script.onload = function () {
        _MAIN_ROUTER.addRoutes([{ path: '/' + viewName.toLocaleLowerCase(), component: window['COM_'.toLocaleUpperCase()] }]);
        setTimeout(function () {
            callback();
        }, 10);
    };

    ////////Internet explorer
    //////script.onreadystatechange = function () {
    //////    if (this.readyState == 'complete') {
    //////        callback();
    //////    }
    //////};
    head.appendChild(script);
}

/**********************************************************************************/

function f_mainInit() {
    console.log('MAIN_INIT ...');

    var router = new VueRouter();
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth) && !_MAIN_DATA.userInfo.loggedIn) {
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    });
    router.onReady(function () {
        console.log('_MAIN_ROUTER: ready ...');
    });
    var app = new Vue({ el: '#app', router });

    _MAIN_ROUTER = router;
    _MAIN_VUE = app;
    
    //Load component login
    f_viewLoad('login', function () {
        console.log('LOAD_VIEW: login -> done');
        f_mainSetup();
    });
}

function f_mainSetup() {
    console.log('MAIN_SETUP ...');

}
/**********************************************************************************/
$(document).ready(function () {
    f_mainInit();
});

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