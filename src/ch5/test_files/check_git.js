import {hashExisting} from "../git_proto.js";

const root = process.argv[2];

const archive = await hashExisting(root);
archive.forEach(([path, hash]) => console.log(`${path} ${hash}`));
