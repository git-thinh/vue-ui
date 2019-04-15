var LOGIN_CONFIG = {
    requiresAuth: false,
    path: '/user/login'
};

var LOGIN_COM = Vue.component('login', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'login',
            alogin: 1
        };
        return data;
    },
    //template: '<input type="button" value="Login" v-on:click="btnLoginClick">',
    template: _apiGet('view/user/login/index.html'),
    mounted: function () {
        console.log('LOGIN: mounted ...', this.objUserInfo); 
    },
    methods: {
        btnLoginClick: function () {
            var _self = this;

            //console.log('????????????? ', this.objUserInfo.loggedIn);
            this.objUserInfo.loggedIn = true;

            if (this.$route.query && this.$route.query.redirect)
                _ROUTER.push(this.$route.query.redirect);
            else {
                alert('OK');
                _ROUTER.push('/dashboard');
            }
        }
    }
});