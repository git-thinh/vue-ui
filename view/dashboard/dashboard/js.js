var DASHBOARD_CONFIG = {
    requiresAuth: true,
    path: '/dashboard/dashboard'
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
    template: _apiGet('view/dashboard/dashboard/index.html')
    //template: '<h1>Dashboard</h1>'
};
