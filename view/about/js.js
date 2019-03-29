var ABOUT_CONFIG = {
    requiresAuth: false
};

var ABOUT_COM = {
    mixins: [_MIXIN_COMS, _MIXIN_GLOBAL],
    data: function () {
        var data = {
            _name: 'about',
            about: 3
        };
        return data;
    },
    template: '<h1>About</div>'
};