var DASHBOARD_COM = {
    mixins: [_MIXIN_COMS, _MIXIN_GLOBAL],
    data: function () {
        var data = {
            requiresAuth: true
        };
        return data;
    },
    template: '<h1>Dashboard</h1>'
};
