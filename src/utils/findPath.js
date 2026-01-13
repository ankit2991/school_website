// src/utils/findPath.js
import { matchPath } from "react-router-dom";

export const findPath = (menu, pathname, trail = []) => {
  for (const item of menu) {
    const newTrail = [...trail, item];

    // ✅ match dynamic & nested routes
    if (
      item.path &&
      matchPath({ path: item.path, end: false }, pathname)
    ) {
      return newTrail;
    }

    if (item.submenus) {
      const found = findPath(item.submenus, pathname, newTrail);
      if (found.length) return found;
    }
  }

  return [];
};
