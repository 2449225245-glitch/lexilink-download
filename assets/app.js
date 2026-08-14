(function(){
  var apkUrl = 'https://github.com/2449225245-glitch/lexilink-download/releases/download/v0.7.6.1/LexiLink-v0.7.6.1.apk';
  var qr = document.getElementById('qr');
  qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=' + encodeURIComponent(apkUrl);
})();
