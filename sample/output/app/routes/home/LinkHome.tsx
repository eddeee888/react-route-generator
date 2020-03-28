import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternHome, UrlPartsHome } from './patternHome';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
> &
  UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkHome;
