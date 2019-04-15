var LEFT_SIDEBAR_LIST_SIMPLE_CONFIG = {
    requiresAuth: false,
    noRouter: true,
    path: '/sidebar/left-sidebar-list-simple'
};

Vue.component('left-sidebar-list-simple', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            treeCategoryId: '_' + new Date().getTime(),
            _name: 'left-sidebar-list-simple',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/sidebar/left-sidebar-list-simple/index.html')
});