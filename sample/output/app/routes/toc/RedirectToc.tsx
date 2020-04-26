/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsToc, patternToc } from './patternToc';
const RedirectToc: React.FunctionComponent<UrlPartsToc & { fallback?: React.ReactNode }> = props => {
  const to = generateUrl(patternToc, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return <>{props.fallback}</>;
};
export default RedirectToc;
