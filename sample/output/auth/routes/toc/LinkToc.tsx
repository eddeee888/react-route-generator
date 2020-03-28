import React from 'react';
import { generateUrl } from 'route-codegen';
import { AnchorProps, CustomAnchor as Link } from 'common/ui/Anchor';
import { patternToc } from './patternToc';
type LinkTocProps = Omit<AnchorProps, 'href'>;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkToc;