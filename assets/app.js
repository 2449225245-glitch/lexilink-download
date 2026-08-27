(function(){
  var fallbackApk = 'https://github.com/2449225245-glitch/lexilink-download/releases/download/v1.0.0/LexiLink-v1.0.0.apk';
  var fallbackSha = 'https://github.com/2449225245-glitch/lexilink-download/releases/download/v1.0.0/SHA256SUMS.txt';

  var apkLink = document.getElementById('download-apk');
  var shaLink = document.getElementById('download-sha');
  var qr = document.getElementById('qr');

  function setQr(url) {
    if (!qr) return;
    qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=' + encodeURIComponent(url);
  }

  function text(id, value) {
    var node = document.getElementById(id);
    if (node && value !== undefined && value !== null && value !== '') node.textContent = value;
  }

  function apply(meta) {
    var apkUrl = meta.apk || fallbackApk;
    var shaUrl = meta.sha256File || fallbackSha;
    var version = meta.versionName || '1.0.0';
    var versionCode = meta.versionCode || 121;

    if (apkLink) apkLink.href = apkUrl;
    if (shaLink) shaLink.href = shaUrl;
    setQr(apkUrl);

    text('version-short', 'v' + version);
    text('version-full', version + ' (' + versionCode + ')');
    text('release-title', 'v' + version);
    text('footer-version', 'Android Stable v' + version);
    text('package-name', meta.packageName || 'com.lexilink.app');
    text('min-android', 'Android ' + (meta.minAndroid || '8.0') + '+');
    text('sha256', meta.sha256 || '以下载的 SHA256SUMS.txt 为准');
    text('release-hint', '这是 LexiLink v' + version + ' 当前正式 Release 包。首次安装时请按 Android 系统提示允许当前浏览器安装应用。');
    if (meta.apkSizeMb) text('apk-size', '约 ' + meta.apkSizeMb + ' MB');
  }

  setQr(fallbackApk);
  fetch('./version.json?t=' + Date.now(), { cache: 'no-store' })
    .then(function(response){
      if (!response.ok) throw new Error('version metadata unavailable');
      return response.json();
    })
    .then(apply)
    .catch(function(){
      if (apkLink) apkLink.href = fallbackApk;
      if (shaLink) shaLink.href = fallbackSha;
      setQr(fallbackApk);
    });
})();
