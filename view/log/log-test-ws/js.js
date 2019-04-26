var LOG_TEST_WS_CONFIG = {
    requiresAuth: false,
    path: '/log/log-test-ws'
};

var LOG_TEST_WS_COM = Vue.component('log-test-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'log-test-ws'
        };
        return data;
    },
    template: _apiGet('view/log/log-test-ws/index.html'),
    mounted: function () {
        document.title = 'LOG-TEST';
        $(".alert").alert('close');
    }
});