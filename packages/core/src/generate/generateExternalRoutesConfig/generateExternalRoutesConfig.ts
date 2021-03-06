import { AppConfig } from "../parseAppConfig";
import { AppRoute } from "../../utils";

export const generateExternalRoutesConfig = (apps: Record<string, AppConfig>): Record<string, AppConfig> => {
  const externalRoutesConfig: Record<string, AppConfig> = {};

  Object.entries(apps).forEach(([appName, defaultAppConfig]) => {
    // TODO: handle duplicated routes in different apps

    // Remove current app from app list.
    const otherApps = { ...apps };
    delete otherApps[appName];

    // Use otherApps to generate the external route from current app
    const appRoutes = Object.entries(otherApps).reduce<Record<string, AppRoute>>((prevAppRoutes, [__app, { origin = "", routes }]) => {
      if (!routes) {
        return prevAppRoutes;
      }

      const currentAppRoutes = Object.entries(routes).reduce<Record<string, AppRoute>>((prevAppRoute, [routeName, route]) => {
        if (typeof route === "string") {
          prevAppRoute[routeName] = { path: route, origin, routingType: "route-external" };
        } else if (typeof route === "object") {
          prevAppRoute[routeName] = { path: route.path, origin: route.origin, routingType: route.routingType };
        }
        return prevAppRoute;
      }, {});

      return { ...prevAppRoutes, ...currentAppRoutes };
    }, {});

    externalRoutesConfig[appName] = {
      ...defaultAppConfig,
      origin: undefined, // Have to set this to undefined to force use route-level origin
      routes: appRoutes,
    };
  });

  return externalRoutesConfig;
};
