/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsAccount, patternAccount } from "./patternAccount";
export const RedirectAccount: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsAccount }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternAccount, { path: {}, query: urlParams.query, origin: urlParams.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
