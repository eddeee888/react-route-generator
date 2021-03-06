/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsUser, patternUser } from "./patternUser";
export const RedirectUser: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams: UrlParamsUser }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
