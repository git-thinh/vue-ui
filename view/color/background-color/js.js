var BACKGROUND_COLOR_CONFIG = {
    requiresAuth: false,
    path: '//'
};

var BACKGROUND_COLOR_COM = Vue.component('background-color', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'background-color'
        };
        return data;
    },
    template: _apiGet('view/background-color/index.html')
});