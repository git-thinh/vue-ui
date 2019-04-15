var TOOLBAR_LEFT_CONFIG = {
    requiresAuth: false,
    noRouter: true,
    path: '/sidebar/toolbar-left'
};

Vue.component('toolbar-left', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            toolbarId: '_' + new Date().getTime(),
            _name: 'toolbar-left',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/sidebar/toolbar-left/index.html'),
    mounted: function () {
        var _self = this;
        console.log('toolbar-left: mounted ...', this.objUserInfo);


    },
    methods: {
    }
});