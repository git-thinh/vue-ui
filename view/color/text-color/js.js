var TEXT_COLOR_CONFIG = {
    requiresAuth: false,
    path: '//'
};

var TEXT_COLOR_COM = Vue.component('text-color', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'text-color'
        };
        return data;
    },
    template: _apiGet('view/text-color/index.html')
});