var ALERT_CONFIG = {
    requiresAuth: false,
    path: '/dialog/alert'
};

var ALERT_COM = Vue.component('alert', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'alert'
        };
        return data;
    },
    template: _apiGet('view/dialog/alert/index.html')
});