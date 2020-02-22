import createLink, { LinkProps } from './createDefaultLink';
import generateUrl from './generateUrl';

interface DefaultRoute<P> {
  pattern: string;
  generate: (inputParams: P, urlQuery?: Record<string, string>) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
}

function createDefaultRoute<P = {}>(pattern: string): DefaultRoute<P> {
  return {
    pattern,
    generate: (params, urlQuery) => generateUrl(pattern, params as any, urlQuery),
    Link: createLink(pattern),
  };
}

export default createDefaultRoute;