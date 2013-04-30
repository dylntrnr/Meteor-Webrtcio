Npm.depends({
	'webrtc.io': '0.0.4'
});

Package.on_use(function(api) {
    api.add_files('meteor-webrtcio.js', 'server');
    api.add_files('webrtc.io.js', 'client');
});