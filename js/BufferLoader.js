function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList.list;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
    this.bpm = urlList.bpm
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    const loader = this;

    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount === loader.urlList.length) {
                    loader.onload(loader.bufferList, loader.bpm);
                }
            },
            function(error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function(error) {
        console.error('BufferLoader error', error);
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    for (let i = 0; i < this.urlList.length; ++i) {
        this.loadBuffer(this.urlList[i], i);
    }
}

export {
    BufferLoader
}
