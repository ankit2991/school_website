export function findBreadcrumbs(tree, pathname, trail = []) {
  for (const node of tree) {
    const currentTrail = [...trail, node];

    // page match
    if (node.path === pathname) {
      return currentTrail;
    }

    // dive into children
    if (node.submenus) {
      const found = findBreadcrumbs(
        node.submenus,
        pathname,
        currentTrail
      );
      if (found) return found;
    }
  }
  return [];
}
