var LEFT_SIDEBAR_CONFIG = {
    requiresAuth: false,
    noRouter: true
};

Vue.component('left-sidebar', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            toolbarId: '_' + new Date().getTime(),
            _name: 'left-sidebar',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/left-sidebar/index.html'),
    mounted: function () {
        var _self = this;
        console.log('LEFT_SIDEBAR: mounted ...', this.objUserInfo);


    },
    methods: {
    }
});