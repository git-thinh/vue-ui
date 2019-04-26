var EXPORT_TEST_WS_CONFIG = {
    requiresAuth: false,
    path: '/export/export-test-ws'
};

var EXPORT_TEST_WS_COM = Vue.component('export-test-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'export-test-ws'
        };
        return data;
    },
    template: _apiGet('view/export/export-test-ws/index.html'),
    mounted: function () {
        document.title = 'EXPORT-TEST';
        $(".alert").alert('close');
    }
});