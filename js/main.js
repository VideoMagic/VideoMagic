let connectStatusEl, playingFileId;
let timer = document.getElementById('timer')
/**
 * Show video element and play recording.
 * It's a regular file that you could upload to your backend instead.
 */
function playFile(fileId) {
  return screencastify.getFile(fileId).then(function(fileInfo) {
    playingFileId = fileId;
    document.querySelector('.videoPlayer').removeAttribute('hidden');
    let videoEl = document.querySelector('video');
    console.log('playing file', fileInfo);
    // fileInfo.file is a regular File/Blob.
    videoEl.src = URL.createObjectURL(fileInfo.file);
    // Show file title in heading.
    document.querySelector('h2').innerText = fileInfo.title;
    if (!fileInfo.inLibrary)
      document.querySelector('#storeBtn').removeAttribute('hidden');
    }, function(err) {
      console.error('failed to load file', err);
  });
}
function checkIfConnected() {
  // Hide connect button if connected, show it else.
  return screencastify.isAppConnected().then(function(isConnected) {
    console.log('connected status', isConnected);
    connectStatusEl.classList.remove('hidden');
    connectStatusEl.classList.toggle('isConnected', isConnected);
  });
}
function onConnectClicked() {
  screencastify.connectApp().then(function() {
    console.log('App is connected now');
    connectStatusEl.classList.toggle('isConnected', true);
    }, function(err) {
      console.error('failed to connect App', err);
  });
}
function onStartClicked() {
  let recorder = new screencastify.Recorder();
  recorder.start({
    recordConfig: {  // optional
      captureSource: 'desktop',  // for window picker, use 'screen' for screen picker
      audio: {
        mic: true,
        system: true
      }
    },
    shareUrl: location.href  // URL of your page that handles shared files.
  }).then(function() {
        let now = new Date();
        timer.innerText = now.getTime();
        timer.click();
        console.log('recording started ' + now);
  }, function(err) {
    console.error('recorder.start() failed', err);
  });
}
/**
 * Store recording in "Your Recordings" view in Screencastify.
 */
function onStoreClicked() {
  screencastify.storeFileInLibrary(playingFileId, true).then(function() {
    console.log('file was stored in library');
  }, function(err) {
    console.log('failed to store file in library');
  });
}
function initialize() {
  screencastify.setAppId(6597414418382848);
  connectStatusEl = document.getElementById('connectStatus');
  // The state query parameter is a json-encoded object that looks like this
  // {
  //  ids: ['shared-file-id']
  // }
  let state = screencastify.decodeStateQuery();
  let loadingPromise;
  if (state && state.ids && state.ids.length) {
    loadingPromise = playFile(state.ids[0]);
  } else {
    loadingPromise = checkIfConnected();
  }
  loadingPromise.then(function() {
    document.querySelector('body').classList.remove('loading');
  });
  document.getElementById('connectBtn')
    .addEventListener('click', onConnectClicked);
  document.getElementById('startBtn')
    .addEventListener('click', onStartClicked);
  document.getElementById('storeBtn')
    .addEventListener('click', onStoreClicked);
}

initialize();