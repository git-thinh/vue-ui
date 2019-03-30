var DASHBOARD_CONFIG = {
    requiresAuth: true
};

var DASHBOARD_COM = {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'dashboard',
            dashboard: 2
        };
        return data;
    },
    template: '<h1>Dashboard</h1>'
};
