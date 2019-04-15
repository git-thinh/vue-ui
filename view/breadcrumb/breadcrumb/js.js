var BREADCRUMB_CONFIG = {
    requiresAuth: false,
    path: '/breadcrumb/breadcrumb'
};

var BREADCRUMB_COM = Vue.component('breadcrumb', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'breadcrumb'
        };
        return data;
    },
    template: _apiGet('view/breadcrumb/breadcrumb/index.html')
});