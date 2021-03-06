import { AppConfig, parseAppConfig } from "../parseAppConfig";
import { generateTemplateFiles } from "./generateTemplateFiles";
import { info, pluginHelpers, TemplateFile, WithExtraConfig, GeneratedFilesProcessorPluginBaseConfig } from "../../utils";

export const generateAppFiles = async (appName: string, appConfig: AppConfig): Promise<TemplateFile[]> => {
  const { routes, destinationDir, plugins, context } = parseAppConfig(appConfig);

  if (destinationDir) {
    const pluginModules = await pluginHelpers.loadPluginModules(plugins);

    const files = await Promise.all(
      Object.entries(routes).map(([routeName, routePattern]) =>
        generateTemplateFiles({
          context,
          appName,
          origin: routePattern.origin,
          routePattern: routePattern.path,
          routingType: routePattern.routingType || "route-internal",
          pluginModules,
          routeName,
          destinationDir,
        })
      )
    );
    const filesToGenerate = files.flat();

    if (filesToGenerate.length > 0) {
      filesToGenerate.forEach((file) => info([appName], `Generated: ${file.destinationDir}${file.filename}${file.extension}`));
    } else {
      info([appName], `*** No files to generate ***\n`);
    }

    const generatedFileProcessors = pluginHelpers.filterByTypes<WithExtraConfig<GeneratedFilesProcessorPluginBaseConfig>, TemplateFile[]>(
      pluginModules,
      ["generated-files-processor"]
    );
    const extraFiles = generatedFileProcessors.reduce<TemplateFile[]>((prevFiles, { plugin, config }) => {
      const newFiles = plugin.generate({ destinationDir, files: filesToGenerate, extraConfig: config });
      return [...prevFiles, ...newFiles];
    }, []);

    return [...filesToGenerate, ...extraFiles];
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};
