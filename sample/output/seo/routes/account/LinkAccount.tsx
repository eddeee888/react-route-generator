import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternAccount } from './patternAccount';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkAccount: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkAccount;