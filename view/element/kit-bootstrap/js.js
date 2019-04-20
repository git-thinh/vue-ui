var KIT_BOOTSTRAP_CONFIG = {
    requiresAuth: false,
    path: '/element/kit-bootstrap'
};

var KIT_BOOTSTRAP_COM = Vue.component('kit-bootstrap', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'kit-bootstrap'
        };
        return data;
    },
    template: _apiGet('view/element/kit-bootstrap/index.html'),
    mounted: function () {
        console.log('mounted: Kit bootstrap ...');

        $(".alert").alert('close');

        // Enable popovers everywhere
        //$('[data-toggle="popover"]').popover();
        $('[data-toggle="popover"]').popover({ container: 'body' });

        // Enable tooltips everywhere
        $('[data-toggle="tooltip"]').tooltip();


        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);



    },
    methods: {
        openPopover: function () {
        }
    }
});