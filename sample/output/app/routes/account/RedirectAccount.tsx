/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { Redirect } from "react-router";
import { UrlPartsAccount, patternAccount } from "./patternAccount";
const RedirectAccount: React.FunctionComponent<UrlPartsAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAccount, {}, props.urlQuery);
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
export default RedirectAccount;