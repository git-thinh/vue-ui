var UPLOAD_WS_CONFIG = {
    requiresAuth: false,
    path: '/upload/upload-ws'
};

var UPLOAD_WS_COM = Vue.component('upload-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'upload-ws'
        };
        return data;
    },
    template: _apiGet('view/upload/upload-ws/index.html')
});