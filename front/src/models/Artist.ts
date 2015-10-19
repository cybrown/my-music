import {Dict} from '../utils/Dict';
import Album from './Album';

export default class Artist {
    name: string;
    albums: Dict<Album>;
}
