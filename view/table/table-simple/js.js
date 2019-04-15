var TABLE_SIMPLE_CONFIG = {
    requiresAuth: true,
    path: '/table/table-simple'
};

var TABLE_SIMPLE_COM = {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'table-simple',
            dashboard: 2
        };
        return data;
    },
    template: _apiGet('view/table/table-simple/index.html') 
};
