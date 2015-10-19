var glob = require('glob');
var fs = require('fs');
var mm = require('musicmetadata');
var uuid = require('uuid');

var results = [];

glob('./front/public/musics/**/*.@(mp3|m4a)', function (err, files) {
    var total = 0;
    var current = 0;
    files.forEach(function (file) {
        total++;
        console.log(file);
        mm(fs.createReadStream(file), function (err, tags) {
            current++;
            if (current == 1)
                console.log(tags);
            if (err) {
                console.log(file + ' !!! ' + err);
            } else {
                results.push({
                    uuid: uuid.v4(),
                    title: tags.title,
                    album: tags.album,
                    artist: tags.artist[0],
                    track: tags.track.no,
                    musicId: file.match('./front/public/musics/(.*)')[1]
                });
            }
            if (current === total) {
                fs.writeFile('./front/public/data.json', JSON.stringify(results), function (err) {
                    if (err) return console.log(err);
                });
            }
        });
    });
});
