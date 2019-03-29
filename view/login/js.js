var LOGIN_CONFIG = {
    requiresAuth: false
};

var LOGIN_COM = Vue.component('login', {
    mixins: [_MIXIN_COMS, _MIXIN_GLOBAL],
    data: function () {
        var data = {
            _name: 'login',
            alogin: 1
        };
        return data;
    },
    template: '<input type="button" value="Login" v-on:click="btnLoginClick">',
    //template: _apiGet('view/login/index.html'),
    mounted: function () {
        console.log('LOGIN: mounted ...', this.objUserInfo); 
    },
    methods: {
        btnLoginClick: function () {
            var _self = this;

            //console.log('????????????? ', this.objUserInfo.loggedIn);
            this.objUserInfo.loggedIn = true;
            _ROUTER.push(this.$route.query.redirect);
        }
    }
});