var UPLOAD_TEST_WS_CONFIG = {
    requiresAuth: false,
    path: '/upload/upload-test-ws'
};

var UPLOAD_TEST_WS_COM = Vue.component('upload-test-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'upload-test-ws'
        };
        return data;
    },
    template: _apiGet('view/upload/upload-test-ws/index.html')
});