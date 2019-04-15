var ICONS_CONFIG = {
    requiresAuth: false,
    path: '//'
};

var ICONS_COM = {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'icons',
        };
        return data;
    },
    template: _apiGet('view/icons/index.html')
};
