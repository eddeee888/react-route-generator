import { GeneralPluginBaseConfig } from "../../utils";
import { plugin } from "./TypescriptGenerateUrlPlugin";

describe("TypescriptGenerateUrlPlugin - generateUrl file", () => {
  const defaultParams: GeneralPluginBaseConfig = {
    appName: "nextjs-app",
    patternNamedExports: {
      filename: "patternUser",
      patternName: "patternUser",
      urlParamsInterfaceName: "UrlParamsUser",
      originName: "originUser",
    },
    destinationDir: "path/to/routes",
    routeName: "User",
    routePattern: "/user",
    context: {
      topLevelGenerateOptions: {
        generateUseRedirect: false,
        generateUseParams: false,
        generateRedirectComponent: false,
        generateLinkComponent: false,
      },
      importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
      importRedirectServerSide: {
        importedName: "RedirectServerSide",
        import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
      },
    },
  };

  it("should generate correctly if no path params", () => {
    const files = plugin.generate({ ...defaultParams });

    expect(files).toHaveLength(1);

    const [templateFile] = files;

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {generateUrl,} from 'route-codegen'
        import {patternUser,UrlParamsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParams?: UrlParamsUser ): string => generateUrl(patternUser, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originUser});"
    `);
  });

  it("should generate correctly if has path params", () => {
    const files = plugin.generate({
      ...defaultParams,
      patternNamedExports: { ...defaultParams.patternNamedExports, pathParamsInterfaceName: "PathParamsUser" },
    });

    expect(files).toHaveLength(1);

    const [templateFile] = files;

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {generateUrl,} from 'route-codegen'
        import {patternUser,UrlParamsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParams: UrlParamsUser ): string => generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser});"
    `);
  });
});
