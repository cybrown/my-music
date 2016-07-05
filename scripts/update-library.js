var glob = require('glob');
var fs = require('fs');
var mm = require('musicmetadata');
var uuid = require('uuid');
var path = require('path');

var publicPath = path.normalize(__dirname + '/../front/public').replace(/\\/g, '/');
var dataFilePath = publicPath + '/data.json';

var results = [];
try {
    results = require(dataFilePath);
} catch (e) {

}

glob(publicPath + '/musics/**/*.@(mp3|m4a)', function (err, files) {
    var total = 0;
    var current = 0;
    files.forEach(function (file) {
        console.log(file);
        file = file.replace('\\', /\//g);
        console.log(publicPath + '/musics/(.*)');
        var musicId = file.match(publicPath + '/musics/(.*)')[1];
        var idExists = results.filter(function (result) {
            return result.musicId === musicId;
        }).length > 0;
        if (!idExists) {
            total++;
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
                        musicId: musicId
                    });
                    console.log('Adding: ' + musicId);
                }
                if (current === total) {
                    fs.writeFile(dataFilePath, JSON.stringify(results), function (err) {
                        if (err) return console.log(err);
                        console.log('File written \\o/')
                    });
                }
            });
        }
    });
});
