var LOGIN_COM = {
    mixins: [_MIXIN_COMS, _MIXIN_GLOBAL],
    data: function () {
        var data = {
            requiresAuth: false
        };
        return data;
    },
    //template: '<input type="submit" value="Login" v-on:click="login">',
    template: _apiGet('view/login/index.html'),
    mounted: function () {
        console.log('LOGIN: mounted ...');
    },
    methods: {
        login: function () {
            _DATA.objUserInfo.loggedIn = true;
            _ROUTER.push(this.$route.query.redirect);
        }
    }
};