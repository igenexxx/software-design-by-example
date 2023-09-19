const [firstManifest, secondManifest] = process.argv.slice(2);

if (!firstManifest || !secondManifest) {
  console.log('Usage: compare_json_manifests.js <first_manifest> <second_manifest>');
  process.exit(1);
}

const isChanged = ([hash, path], manifest2) => {
  // same names but different hashes
  return manifest2.pathHash[path] && manifest2.pathHash[path] !== hash;
}

const isRenamed = ([hash, path], manifest2) => {
  // same hashes but different names
  return manifest2.hashPath[hash] && manifest2.hashPath[hash] !== path;
}

const isDeleted = ([hash, path], manifest2) => {
  // first have files that second doesn't
  return !manifest2.paths.has(path);
}

const isAdded = ([hash, path], manifest1) => {
  // first doesn't have files that second does
  return !manifest1.paths.has(path);
}
const getHashesAndPaths = manifest => Object.entries(manifest).reduce((acc, [hash, [path]]) => {
  acc.hashPath[hash] = path;
  acc.pathHash[path] = hash;
  acc.hashes.add(hash);
  acc.paths.add(path);

  return acc;
}, { hashes: new Set(), paths: new Set(), hashPath: {}, pathHash: {} });

const compare = async (firstManifest, secondManifest) => {
  const { default: first } = await import(firstManifest, { assert: { type: 'json' } });
  const { default: second } = await import(secondManifest, { assert: { type: 'json' }});
  const manifestPrev = getHashesAndPaths(first);
  const manifestNext = getHashesAndPaths(second);

  const result = Object.entries(manifestPrev.hashPath).reduce((report, firstManifestEntry) => {
    if (isChanged(firstManifestEntry, manifestNext)) {
      report.changed.push(firstManifestEntry[1]);
    } else if (isRenamed(firstManifestEntry, manifestNext)) {
      report.renamed.push([firstManifestEntry[1], manifestNext.hashPath[firstManifestEntry[0]]]);
    } else if (isDeleted(firstManifestEntry, manifestNext)) {
      report.deleted.push(firstManifestEntry[1]);
    } else if (isAdded(firstManifestEntry, manifestNext)) {
      report.added.push(firstManifestEntry[1]);
    }

    return report;
  }, { changed: [], renamed: [], deleted: [], added: [] });

  const extended = Object.entries(manifestNext.hashPath).reduce((report, secondManifestEntry) => {
    if (isAdded(secondManifestEntry, manifestPrev)) {
      report.added.push(secondManifestEntry[1]);
    }

    return report;
  }, result);

  return extended;
}

console.log(await compare(firstManifest, secondManifest));
