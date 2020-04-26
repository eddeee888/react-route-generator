/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import { Redirect } from 'react-router';
import { UrlPartsUser, patternUser } from './patternUser';
const RedirectUser: React.FunctionComponent<UrlPartsUser & { fallback?: React.ReactNode }> = props => {
  const to = generateUrl(patternUser, props.path, props.urlQuery);
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
export default RedirectUser;
