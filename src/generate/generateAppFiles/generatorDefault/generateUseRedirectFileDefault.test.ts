import generateUseRedirectFileDefault from "./generateUseRedirectFileDefault";

describe("generateUseRedirectFileDefault", () => {
  it("should generate when there is no pathParams", () => {
    const templateFile = generateUseRedirectFileDefault({
      routeName: "Login",
      patternNamedExports: {
        filename: "patternLogin",
        patternName: "patternLogin",
        urlPartsInterfaceName: "UrlPartsLogin",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
    });

    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {UrlPartsLogin,patternLogin,} from './patternLogin'
  import {generateUrl,} from 'route-codegen'
  export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectFnLogin => {
    const redirect: RedirectFnLogin = urlParts => {
      const to = generateUrl(patternLogin, {}, urlParts?.urlQuery);
      if (!!window && !!window.location) {
        window.location.href = to;
      }
      return;
    }
    return redirect;
  }
  export default useRedirectLogin`);
  });

  it("should generate when there is pathParams", () => {
    const templateFile = generateUseRedirectFileDefault({
      routeName: "UserInfo",
      patternNamedExports: {
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlPartsInterfaceName: "UrlPartsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
    });

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {UrlPartsUserInfo,patternUserInfo,} from './patternUserInfo'
  import {generateUrl,} from 'route-codegen'
  export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectFnUserInfo => {
    const redirect: RedirectFnUserInfo = urlParts => {
      const to = generateUrl(patternUserInfo, urlParts.path, urlParts?.urlQuery);
      if (!!window && !!window.location) {
        window.location.href = to;
      }
      return;
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
