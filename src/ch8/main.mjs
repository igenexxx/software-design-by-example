import tokenize from "./tokenize-2.mjs";

const test = '^a^b*'
const result = tokenize(test)
console.log(JSON.stringify(result, null, 2))
