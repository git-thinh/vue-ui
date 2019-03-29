
var LOGIN_CONFIG = {
    requiresAuth: false
};

var LOGIN_COM = {
    //template: '<input type="submit" value="Login" v-on:click="login">',
    template: _apiGet('view/login/index.html'),
    mounted: function () {
        console.log('LOGIN: mounted ...');
    },
    methods: {
        login: function () {
            _DATA.userInfo.loggedIn = true;
            _ROUTER.push(this.$route.query.redirect);
        }
    }
};