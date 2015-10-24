import * as React from 'react';
import {Dict, toArray, newDict} from './utils/Dict';
import {render} from 'react-dom';
import MusicApplication from './components/MusicApplication';
import Album from './models/Album';
import Artist from './models/Artist';
import Song from './models/Song';
import ApplicationStore from './stores/ApplicationStore';
import Dispatcher from './Dispatcher';

function normalize(str: string): string {
    return (str || '').toLowerCase();
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        bootstrapApp();
    }
};
xhr.send();

function bootstrapApp() {
    const songs = JSON.parse(xhr.responseText);
    const artists: Dict<Artist> = songs.reduce((artists: Dict<Artist>, song: Song) => {
        const normalizedArtist = normalize(song.artist) || 'Unknown artist';
        const normalizedAlbum = normalize(song.album) || 'Unknown album';
        artists[normalizedArtist] = artists[normalizedArtist] || {
            name: song.artist || 'Unknown artist',
            albums: newDict<Album>()
        };
        artists[normalizedArtist].albums[normalizedAlbum] = artists[normalizedArtist].albums[normalizedAlbum] || {
            name: song.album || 'Unknown album',
            songs: []
        };
        song.title = song.title || 'Unknown Title';
        artists[normalizedArtist].albums[normalizedAlbum].songs.push(song);
        return artists;
    }, newDict<Artist>());
    toArray(artists).forEach(artist => {
        toArray(artist.albums).forEach(album => {
            album.songs.sort((song1: Song, song2: Song) => {
                return song1.track - song2.track || song1.title.localeCompare(song2.title);
            });
        });
    });
    const dispatcher = new Dispatcher(doRender);
    const applicationStore = new ApplicationStore(dispatcher.on, songs);

    function doRender() {
        render(<MusicApplication store={applicationStore}
                                 dispatcher={dispatcher} />,
            document.getElementById("react-main"));
    }
    applicationStore.musicLibrary.artists = toArray(artists);

    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function (handler: any, timeout?: any, ...args: any[]): number {
        return originalSetTimeout((...args: any[]) => {
            handler(...args);
            doRender();
        }, timeout, ...args);
    }

    doRender();
}
