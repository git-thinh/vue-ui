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
                 
        $('[modal-iframe]').on('click', function () {
            var $modal = $(this).data("target");
            var $page = $(this).data('page');
            var $image = $(this).data('image');
            var $video = $(this).data('video');
            var $title = $(this).data('title');
            var $size = $(this).data('size');

            $($modal + ' .modal-title').text($title);
            if ($size) { $($modal + ' .modal-dialog').addClass('modal-' + $size); }

            if ($image) {
                $($modal + ' .modal-body').html('<div class="text-center"><img class="img-fluid" src="' + $image + '"></div>');
            } else if ($video) {
                $($modal + ' .modal-body').html('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/' + $video + '?autoplay=1" allowfullscreen></iframe></div>');
            }

            //if ($page) {
            //    $($modal + ' .modal-body').load($page, function () {
            //        $($modal).modal({ show: true });
            //    });
            //} else {
            //    $($modal).modal({ show: true, keyboard: false });
            //}

            if ($page) {
                $($modal + ' .modal-body').html('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + $page + '" allowfullscreen></iframe></div>');
            }
            $($modal).modal({ show: true, keyboard: false }); 

            $($modal).on('hidden.bs.modal', function () {
                $($modal + ' .modal-title').text('');
                $($modal + ' .modal-body').html('');
                if ($size) { $($modal + ' .modal-dialog').removeClass('modal-' + $size); }
            });
        });
    },
    methods: {
        openPopover: function () {
        }
    }
});