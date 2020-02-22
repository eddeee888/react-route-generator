import React from 'react';
import LinkNext, { LinkProps as NextJSLinkProps } from 'next/link';
import generateUrl from './generateUrl';

export interface LinkProps<P> extends Omit<NextJSLinkProps, 'href'> {
  params: P;
  children: React.ReactNode;
  urlQuery?: Record<string, string>;
}

function createNextJSLink<P>(pattern: string) {
  return function NextJSLink({ params, urlQuery, children, ...props }: LinkProps<P>) {
    const to = generateUrl(pattern, params as any, urlQuery);
    return (
      <LinkNext href={to} {...props}>
        <a>{children}</a>
      </LinkNext>
    );
  };
}

export default createNextJSLink;