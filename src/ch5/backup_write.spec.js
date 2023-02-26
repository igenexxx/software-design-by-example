import mock from 'mock-fs';
import glob from 'glob-promise';

import { findNew } from './utils';
import {getHash} from "./hash.js";
import backup from "./backup.js";
import {writeFile} from "node:fs/promises";

const contents = {
  aaa: 'AAA',
  bbb: 'BBB',
  ccc: 'CCC'
};

const hashes = Object.keys(contents).reduce((obj, key) => {
  obj[key] = getHash(contents[key]);
  return obj;
}, {});

const basicMock = () => mock({
  'bck-0-csv-0': {},
  'bck-1-csv-1': {
    '0001.csv': 'alpha.js,abcd1234',
    'abcd1234.bck': 'alpha.js content'
  },
  'bck-4-csv-2': {
    '0001.csv': ['alpha.js,abcd1234',
      'beta.txt,bcde2345'].join('\n'),
    '3024.csv': ['alpha.js,abcd1234',
      'gamma.png,3456cdef',
      'subdir/renamed.txt,bcde2345'].join('\n'),
    '3456cdef.bck': 'gamma.png content',
    'abcd1234.bck': 'alpha content',
    'bcde2345.bck': 'beta.txt became subdir/renamed.txt'
  }
});

const fixture = () => mock({
  source: {
    'alpha.txt': contents.aaa,
    'beta.txt': contents.bbb,
    gamma: {
      'delta.txt': contents.ccc
    },
  },
  backup: {},
});

const initialBackups = Object.keys(hashes).reduce((set, filename) =>
  set.add(`backup/${hashes[filename]}.bck`), new Set());
describe('findNew',  () => {
  beforeEach(fixture);

  afterEach(() => mock.restore())

  it('creates an initial CSV manifest', async () => {
    await backup('source', 'backup', 0);

    expect((await glob('backup/*')).length).toBe(4);
  });

  it('should create 3 backup files', async () => {
    await backup('source', 'backup', 0);

    const actualBackup = new Set(await glob('backup/*.bck'));

    expect(actualBackup).toEqual(initialBackups);
  });

  it('should create one manifest', async () => {
    await backup('source', 'backup', 0);

    const actualManifests = await glob('backup/*.csv');

    expect(actualManifests).toEqual(['backup/0000000000.csv']);
  });

  it('should not duplicate files', async () => {
    await backup('source', 'backup', 0);
    expect((await glob('backup/*')).length).toBe(4);

    await backup('source', 'backup', 1);
    expect((await glob('backup/*')).length).toBe(5);

    const actualBackup = new Set(await glob('backup/*.bck'));
    expect(actualBackup).toEqual(initialBackups);

    const actualManifests = await glob('backup/*.csv');
    expect(actualManifests).toEqual(['backup/0000000000.csv', 'backup/0000000001.csv']);
  });

  it('should add a file as needed', async () => {
    await backup('source', 'backup', 0);
    expect((await glob('backup/*')).length).toBe(4);

    await writeFile('source/newfile.txt', 'NNN');
    const newFileHash = getHash('NNN');

    await backup('source', 'backup', 1);
    expect((await glob('backup/*')).length).toBe(6);

    const expected = new Set(initialBackups).add(`backup/${newFileHash}.bck`);
    const actualBackup = new Set(await glob('backup/*.bck'));
    expect(actualBackup).toEqual(expected);

    const actualManifests = await glob('backup/*.csv');
    expect(actualManifests).toEqual(['backup/0000000000.csv', 'backup/0000000001.csv']);
  });
});
