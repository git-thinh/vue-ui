var LOG_TEST_WS_CONFIG = {
    requiresAuth: false,
    path: '/log/log-test-ws'
};

var LOG_TEST_WS_COM = Vue.component('log-test-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'log-test-ws',
            socket: {

            }
        };
        return data;
    },
    template: _apiGet('view/log/log-test-ws/index.html'),
    mounted: function () {
        var _self = this;
        _self._socketInit();

        document.title = 'LOG-TEST';
        $(".alert").alert('close');
    },
    methods: {
        _onOtherViewLoadCompleted: function (viewSetting) { },
        _socketInit: function (viewSetting) {

        }
    }
});