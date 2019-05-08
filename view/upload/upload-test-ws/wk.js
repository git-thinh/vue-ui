var ws, item, buffers = [], uploadIndex = 0, wsSessionId;

onmessage = function (e) {
    var data = e.data;
    console.log('WK[' + data.id + '].1 = ', data);
    item = data;
    //postMessage('WK');
};

ws = new WebSocket("ws://localhost:51648/upload");
ws.binaryType = 'arraybuffer';
//ws.binaryType = 'blob';
ws.onopen = function () {
    postMessage({ Code: 'SOCKET_OPEN' });
    //ws.send('FOLDER.ADD:folder1');
    //ws.send('FILE.ADD:' + data.name);
    //ws.send(rawData);
    //postMessage({ Code: 'SOCKET_SENDING_FILE' });

    var a = new Uint8Array([8, 6, 7, 3, 5, 9.0]);
    console.log(a.buffer);
    //ws.send(a.buffer);

    var reader = new FileReader();
    reader.loadend = function () { }
    reader.onload = function (er) {
        var rawData = er.target.result; // ArrayBuffer
        var uint8Array = new Uint8Array(rawData);

        //console.log('WK.rawData = ', rawData);
        //console.log('WK.uint8Array = ', uint8Array);

        var len = uint8Array.length, size = 65536; // max limit are 65536 64kB
        var page = Math.round(len / size);
        if (len % size != 0) page++;
        var blob, min, max;

        //ws.send('PAGE=' + page);

        for (var i = 0; i < page; i++) {
            min = i * size;
            max = (i + 1) * size;
            if (max > len) max = len;

            blob = uint8Array.slice(min, max);
            buffers.push(blob);
        }

        console.log(buffers);
        //-> send info of the file to begin buffering via socket
        ws.send(JSON.stringify({ folder:'', name: item.name, size: item.size, type: item.type }));
    }
    reader.readAsArrayBuffer(item.file);

};
ws.onmessage = function (evt) {
    var data = evt.data;
    console.log('WK ws.msg = ', uploadIndex, data);

    switch (data) {
        case '0':
            //-> begin buffering first packet
            postMessage({ Code: 'SOCKET_SENDING', PageTotal: buffers.length, Index: 1 });
            ws.send(buffers[0]);
            uploadIndex++;
            break;
        case 'SOCKET_BUFFERING':
            //-> begin buffering next packet
            postMessage({ Id: item.id, Code: 'SOCKET_SENDING', Name: item.name, PageTotal: buffers.length, Index: uploadIndex });
            ws.send(buffers[uploadIndex]);
            uploadIndex++;
            if (uploadIndex == buffers.length) {
                ws.send('SENDING_COMPLETE');
                //postMessage({ Code: 'SOCKET_SENDING_COMPLETE', PageTotal: buffers.length, Index: uploadIndex });
            }
            break;
        default:
            postMessage({ Code: 'SOCKET_MSG', Data: data });
            break;
    }
};
ws.onerror = function (evt) {
    postMessage({ Code: 'SOCKET_ERROR' });
};
ws.onclose = function () {
    postMessage({ Code: 'SOCKET_CLOSE' });
};
