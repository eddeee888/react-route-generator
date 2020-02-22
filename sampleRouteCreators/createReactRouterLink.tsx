import React from 'react';
import { Link, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import generateUrl from './generateUrl';

export interface LinkProps<P> extends Omit<ReactRouterLinkProps, 'to'> {
  params: P;
  urlQuery?: Record<string, string>;
}

function createReactRouterLink<P = {}>(pattern: string) {
  return function RouteLink({ params, urlQuery, ...props }: LinkProps<P>): any {
    const to = generateUrl(pattern, params as any, urlQuery);
    return <Link {...props} to={to} />;
  };
}

export default createReactRouterLink;