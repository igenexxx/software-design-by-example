import assert from "assert";

const select = (root, selector) => {
  const selectors = selector.split(' ').filter(s => s.length);

  return firstMatch(root.window.document.body, selectors);
}

const firstMatch = (node, selectors) => {
  assert(selectors.length, 'Requires at least one selector');

  // not a tag
  if (node.nodeType !== 1) {
    return null;
  }

  // this node matches
  if (matchHere(node, selectors.shift())) {
    // this is the last selector, so matching worked
    if (selectors.length === 1) {
      return node;
    }

    // try to march remaining selectors
    return firstChildMatch(node, selectors);
  }

  // this node doesn't match, try siblings
  return firstChildMatch(node, selectors);
}

const firstChildMatch = (node, selectors) => {
  console.assert(node.nodeType === 1, `Should only try to match first child of a tag, not ${node.tagName}`);

  // first working match
  for (const child of node.children) {
    const match = firstMatch(child, selectors);

    if (match) {
      return match;
    }
  }

  // nothing worked
  return null;
}

const matchHere = (node, selector) => {
  let [name, id, cls] = Array(3).fill(null);

  if (selector.includes('#')) {
    [name, id] = selector.split('#');
  } else if (selector.includes('.')) {
    [name, cls] = selector.split('.');
  } else {
    name = selector;
  }

  return (node.tagName.toLowerCase() === name) && ((id === null) || (node.id === id )) &&
    ((cls === null) || node.classList.contains(cls));
}

export default select;
