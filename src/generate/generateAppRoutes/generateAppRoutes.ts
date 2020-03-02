import { AppConfig, parseAppConfig } from './../config';
import generateRouteFile from './generateRouteFile';
// import generateRouteCreatorFile from './generateRouteCreatorFile';
import { mkdirSync } from 'fs';

function generateAppRoutes(app: AppConfig): void {
  const {
    routes,
    routingType,
    destinationDir,
    routeLinkCreators,
    generateUrlFunctionPath,
    shouldGenerateLink,
    shouldGenerateReactRouterFunctions,
  } = parseAppConfig(app);

  if (destinationDir) {
    const utilsFolder = destinationDir.concat('/', 'utils');
    mkdirSync(utilsFolder, { recursive: true });

    Object.entries(routes).forEach(([routeName, routePattern]) =>
      generateRouteFile({
        routeName,
        routePattern,
        destinationDir,
        routingType,
        shouldGenerateLink,
        shouldGenerateReactRouterFunctions,
      })
    );

    // generateRouteCreatorFile({
    //   routingType,
    //   utilsFolder,
    //   routeLinkCreators,
    //   generateUrlFunctionPath,
    //   shouldGenerateLink,
    //   shouldGenerateReactRouterFunctions,
    // });
  }
}

export default generateAppRoutes;
