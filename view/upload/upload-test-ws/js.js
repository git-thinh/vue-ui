var UPLOAD_TEST_WS_CONFIG = {
    requiresAuth: false,
    path: '/upload/upload-test-ws',
    api: {
        uriPawn: {
            search: 'http:1.1.1.1:9001/api/pawn/seachr/{key}'
        }
    }
};

var UPLOAD_TEST_WS_COM = Vue.component('upload-test-ws', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'upload-test-ws',
            files: []
        };
        return data;
    },
    template: _apiGet('view/upload/upload-test-ws/index.html'),
    mounted: function () {
        document.title = 'UPLOAD-TEST';
        $(".alert").alert('close');
    },
    methods: {
        previewFiles: function (e) {


            //Add By EsonDinh [23/04/2019]: Xu ly hien thi hinh anh de User xem,truoc khi upload len Server
            var f = e.target.files || e.dataTransfer.files;
            if (!f.length)
                return;
            this.createImage(f[0]);
            //End Add By EsonDinh [23/04/2019]: Xu ly hien thi hinh anh de User xem,truoc khi upload len Server



            var _self = this;

            var files = _self.$refs.myFiles.files;
            console.log(files);

           

            _self.files = [];
            var rs = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var item = {
                    id: i,
                    token: '123',
                    folder: 'test',
                    name: file.name,
                    size: file.size,
                    uploadPercen: 0,
                    type: file.type,
                    file: file
                };

                var worker = new Worker('view/upload/upload-test-ws/wk.js');
                worker.onmessage = function (oEvent) {
                    console.log('->UI: ' + JSON.stringify(oEvent.data));
                    switch (oEvent.data.Code) {
                        case 'FILE_DELETE_SUCCESS':

                            break;
                        case 'SOCKET_SENDING':
                            var per = (oEvent.data.Index / oEvent.data.PageTotal * 100).toFixed(2);
                            console.log(oEvent.data.Name, per);
                            _self.files[oEvent.data.Id].uploadPercen = per;
                            break;
                        default:
                            break;
                    }
                };
                worker.onerror = function (oEvent) {
                    //console.log('->UI: ' + oEvent.data);
                    throw oEvent.data;
                };
                worker.postMessage(item);

                item.worker = worker;
                rs.push(item);
            }
            _self.files = rs;

        },

        //Add By EsonDinh [23/04/2019]: Xu ly hiển thị hinh anh de User xem,truoc khi upload len Server
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        deleteData: function (id) {
            this.$delete(this.files,id);
            //this.files.splice(result.id, 1);
            var filename = id;
            $.ajax({
                contentType: "application/json",
                dataType: "json",
                data: { data: filename },
                url: "http://localhost:51648/Upload/DeleteData",
                //url: window.ServerUrl + "/Home/DeleteData",
                method: "GET",
                success: function (response) {
                    console.log(response);
                },
                error: function () {
                    console.log("Oops");
                }
            });
        },


        removeImage(key) {

            this.files.splice(key, 1);
            var path = "/Test";
            this.files.remove(path + key).then(
                    function (response)
                    {
                      alert('delete ok!');
                    }
                );
        }
        //End Add By EsonDinh [23/04/2019]: Xu ly hien thi hinh anh de User xem,truoc khi upload len Server

    }
});


