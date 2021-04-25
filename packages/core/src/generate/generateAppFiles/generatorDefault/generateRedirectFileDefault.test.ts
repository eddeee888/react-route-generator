import { generateRedirectFileDefault, GenerateRedirectFileDefaultParams } from "./generateRedirectFileDefault";

describe("generateRedirectFileDefault", () => {
  const defaultParams: GenerateRedirectFileDefaultParams = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    importRedirectServerSide: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
      patternNameNextJS: "patternNextJSLogin",
    },
    destinationDir: "path/to/routes",
  };

  it("should generate correctly if no path params", () => {
    const templateFile = generateRedirectFileDefault({ ...defaultParams });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams?: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: {}, query: urlParams.query, origin: urlParams.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });

  it("should generate correctly with path params", () => {
    const templateFile = generateRedirectFileDefault({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams.query, origin: urlParams.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });
});
