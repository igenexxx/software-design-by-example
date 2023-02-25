import fs from 'node:fs';

const MOCK_READ_FILE_CONTROL = [false, false, true, false, true]
// export const mockReadFileSync = (path, encoding = 'utf-8') => {
//   MOCK_READ_FILE_CONTROL.forEach((control, i) => {
//     if (!control) {
//       const result = fs.readFileSync(path, encoding);
//
//       console.log(result);
//     }
//
//     return new Error(`Mocked error ${i}`);
//   });
// }


export const mockReadFileSync = (filename, encoding = 'utf-8') => {
  const control = [false, false, true, false, true]; // Mock read file control array
  const index = mockReadFileSync.callCount || 0; // Get the call count or start from 0
  mockReadFileSync.callCount = index + 1; // Increment the call count

  if (index >= control.length || !control[index]) {
    // If the call count exceeds the control length or control flag is false, return data
    fs.readFileSync(filename, encoding);
  } else {
    // Otherwise, throw an exception
    throw new Error(`Mock readFileSync error for file: ${filename}`);
  }
};
