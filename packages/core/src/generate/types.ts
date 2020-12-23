export interface TemplateFile {
  template: string;
  filename: string;
  extension: string;
  destinationDir: string;
  hasDefaultExport: boolean;
  hasNamedExports: boolean;
  routeName: string;
}

export interface Import {
  defaultImport?: string;
  namedImports?: NamedImport[];
  from: string;
}

export interface NamedImport {
  name: string;
  importAs?: string;
}
