export const findBreadcrumbPath = (menu, pathname, parents = []) => {
  for (const item of menu) {
    const newParents = [...parents, item];

    if (item.path === pathname) {
      return newParents;
    }

    if (item.children) {
      const found = findBreadcrumbPath(item.children, pathname, newParents);
      if (found) return found;
    }
  }
  return null;
};
