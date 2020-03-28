import React from 'react';
import { generateUrl } from 'route-codegen';
import { AnchorProps, CustomAnchor as Link } from 'common/ui/Anchor';
import { patternUser } from './patternUser';
type LinkUserProps = Omit<AnchorProps, 'href'>;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkUser;