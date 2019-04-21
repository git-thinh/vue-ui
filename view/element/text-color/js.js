var TEXT_COLOR_CONFIG = {
    requiresAuth: false,
    path: '/color/text-color'
};

var TEXT_COLOR_COM = Vue.component('text-color', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'text-color'
        };
        return data;
    },
    template: _apiGet('view/color/text-color/index.html')
});