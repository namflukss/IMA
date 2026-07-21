import { CATEGORIES } from '../data/categories';

export function findNode(path, nodes = CATEGORIES) {
  if (!path || !path.length) return null;
  const [id, ...rest] = path;
  const node = nodes.find((n) => n.id === id);
  if (!node) return null;
  if (!rest.length) return node;
  return findNode(rest, node.children || []);
}

export function findCategoryInfo(leafId, nodes = CATEGORIES) {
  for (const n of nodes) {
    if (n.id === leafId) return n;
    if (n.children) {
      const found = findCategoryInfo(leafId, n.children);
      if (found) return found;
    }
  }
  return null;
}

export function findPathToLeaf(leafId, nodes = CATEGORIES, path = []) {
  for (const n of nodes) {
    const nextPath = [...path, n];
    if (n.id === leafId) return nextPath;
    if (n.children) {
      const found = findPathToLeaf(leafId, n.children, nextPath);
      if (found) return found;
    }
  }
  return null;
}

export function firstLeafId(node) {
  if (!node.children || node.children.length === 0) return node.id;
  return firstLeafId(node.children[0]);
}

export function countRecipesUnder(node, recipes) {
  if (!node.children) {
    return recipes.filter((r) => r.categoryId === node.id).length;
  }
  return node.children.reduce((sum, child) => sum + countRecipesUnder(child, recipes), 0);
}
