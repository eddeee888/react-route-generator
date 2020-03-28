import { TemplateFile, Import } from '../types';
import printImport from '../utils/printImport';
import { RoutingType } from '../config';
import { PatternNamedExports } from './generatePatternFile';
import { RouteLinkOptions } from './parseAppConfig';

export interface GenerateLinkFileParams {
  routeName: string;
  routingType: RoutingType;
  destinationDir: string;
  routeLinkOptions: RouteLinkOptions;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

type GenerateLinkFile = (params: GenerateLinkFileParams) => TemplateFile;

const generateLinkFile: GenerateLinkFile = ({
  routeName,
  routingType,
  routeLinkOptions,
  destinationDir,
  patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename },
  importGenerateUrl,
}) => {
  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;

  const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = generateLinkInterface({
    defaultLinkPropsInterfaceName,
    routingType,
    routeLinkOptions,
  });

  const template = `${printImport({ defaultImport: 'React', from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ''}
  ${printImport({ namedImports: [{ name: patternName }], from: `./${routePatternFilename}` })}
  ${linkPropsTemplate}
  const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ ${
    hasPathParams ? 'path,' : ''
  } urlQuery, ...props }) => {
    const to = generateUrl(${patternName}, ${hasPathParams ? 'path' : '{}'}, urlQuery);
    return <${linkComponent} {...props} ${hrefProp}={to} />;
  }
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: '.tsx',
    destinationDir,
  };

  return templateFile;
};

type GenerateLinkInterface = (params: {
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  defaultLinkPropsInterfaceName: string;
}) => {
  importLink?: Import;
  linkPropsTemplate: string;
  linkComponent: string;
  linkProps?: string;
  hrefProp: string;
  linkPropsInterfaceName: string;
};

const generateLinkInterface: GenerateLinkInterface = ({
  routingType,
  routeLinkOptions,
  defaultLinkPropsInterfaceName,
}) => {
  const option = routeLinkOptions[routingType];

  const { hrefProp, linkProps, importLink } = option;

  // if there's inlineLinkPropsTemplate, we don't import anything
  let linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'>;`;
  let linkPropsInterfaceName = defaultLinkPropsInterfaceName;
  if ('inlineLinkProps' in option && option.inlineLinkProps) {
    linkPropsTemplate = option.inlineLinkProps.template;
    linkPropsInterfaceName = option.inlineLinkProps.linkProps;
  }

  return {
    importLink,
    linkPropsTemplate,
    linkComponent: option.linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};

export default generateLinkFile;