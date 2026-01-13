export const flattenMenu = (menu, parentTrail = []) => {
  let routes = [];

  menu.forEach(item => {
    const currentTrail = [...parentTrail, item.name];

    if (item.path) {
      routes.push({
        path: item.path,
        breadcrumb: currentTrail,
      });
    }

    if (item.submenus) {
      routes = routes.concat(
        flattenMenu(item.submenus, currentTrail)
      );
    }
  });

  return routes;
};
