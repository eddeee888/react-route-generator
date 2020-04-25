import printImport from '../../utils/printImport';
import { TemplateFile, Import } from '../../types';
import { PatternNamedExports } from '../types';

export interface GenerateUseRedirectReactRouterV5Params {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectReactRouterV5 = (params: GenerateUseRedirectReactRouterV5Params): TemplateFile => {
  const { routeName, patternNamedExports, destinationDir, importGenerateUrl } = params;
  const functionName = `useRedirect${routeName}`;
  const pathVariable = patternNamedExports.pathParamsInterfaceName ? 'urlParts.path' : '{}';
  const resultTypeInterface = `Redirect${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: 'useHistory' }],
    from: 'react-router',
  })}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  type ${resultTypeInterface} = (urlParts: ${patternNamedExports.urlPartsInterfaceName}) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const history = useHistory();
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = generateUrl(${patternNamedExports.patternName}, ${pathVariable}, urlParts.urlQuery);
      history.push(to);
    }
    return redirect;
  }
  export default ${functionName}`;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: '.ts',
    destinationDir,
  };

  return templateFile;
};

export default generateUseRedirectReactRouterV5;
