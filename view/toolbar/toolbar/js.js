var TOOLBAR_CONFIG = {
    requiresAuth: false,
    noRouter: true,
    path: '/toolbar/toolbar'
};

Vue.component('toolbar', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            toolbarId: '_' + new Date().getTime(),
            _name: 'toolbar',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/toolbar/toolbar/index.html'),
    mounted: function () {
        var _self = this;
        console.log('toolbar: mounted ...', this.objUserInfo);         
    },
    methods: {
        btnLoginClick: function () {
            var _self = this;
        }
    }
});