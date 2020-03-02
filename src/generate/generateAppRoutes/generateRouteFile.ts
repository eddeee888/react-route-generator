import { pathToRegexp, Key } from 'path-to-regexp';
import { writeFileSync, mkdirSync } from 'fs';
import generateRouteTemplate from './generateRouteTemplate';
import { RoutingType } from '../config';

type CreateRouteFile = (params: {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  routingType: RoutingType;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}) => void;

const createRouteFile: CreateRouteFile = ({
  routeName,
  routePattern,
  destinationDir,
  routingType,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}) => {
  const keys: Key[] = [];
  const routeNameString = routeName.toString();
  const displayRouteName = `RouteTo${routeNameString[0].toUpperCase() + routeNameString.slice(1)}`;

  pathToRegexp(routePattern, keys);

  const template = generateRouteTemplate({
    routePattern,
    displayRouteName,
    keys,
    routingType,
    shouldGenerateLink,
    shouldGenerateReactRouterFunctions,
  });

  mkdirSync(destinationDir, { recursive: true });

  writeFileSync(destinationDir.concat('/', displayRouteName, '.tsx'), template);
};

export default createRouteFile;
