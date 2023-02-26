import {findNew} from "./utils";
import { mkdir, rmdir } from 'node:fs/promises';

describe('findNew',  () => {
  it('should find no pre-existing files when none given or exist', async () => {
    const expected = {};
    await mkdir('backup_test');
    const actual = await findNew('backup_test', []);

    expect(actual).toEqual(expected);
    await rmdir('backup_test');
  });

  it('should find some files when one is given and none exist', async () => {
    const check = [['./backup_1/another_file_3.js', '564b326edba1d1245hjkj3hkj2c4706642be19d2b9f']];
    const expected = { '564b326edba1d1245hjkj3hkj2c4706642be19d2b9f': './backup_1/another_file_3.js' };
    const actual = await findNew('backup_1', check);

    expect(actual).toEqual(expected);
  });

  it('should finds nothing needs backup when there is a match', async () => {
    const check = [['./backup_1/another_file.js', '564b326edba1d1245885e4bc4706642be19d2b9f']];
    const expected = {};
    const actual = await findNew('backup_1', check);

    expect(actual).toEqual(expected);
  });
});
