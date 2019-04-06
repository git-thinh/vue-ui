var BREADCRUMB_CONFIG = {
    requiresAuth: false
};

var BREADCRUMB_COM = Vue.component('breadcrumb', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'breadcrumb'
        };
        return data;
    },
    template: _apiGet('view/breadcrumb/index.html')
});