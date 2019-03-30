var TOOLBAR_CONFIG = {
    requiresAuth: false
};

var TOOLBAR_COM = Vue.component('toolbar', {
    mixins: [_MIXIN_COMS, _MIXIN_GLOBAL],
    data: function () {
        var data = {
            _name: 'toolbar',
            alogin: 1
        };
        return data;
    },
    template: '<h1>toolbar</h1>',
    //template: _apiGet('view/toolbar/index.html'),
    mounted: function () {
        console.log('toolbar: mounted ...', this.objUserInfo);
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