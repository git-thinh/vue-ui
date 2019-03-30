var ABOUT_CONFIG = {
    requiresAuth: false
};

var ABOUT_COM = {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'about',
            about: 3
        };
        return data;
    },
    template: '<h1>About</div>'
};