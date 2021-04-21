/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsAbout, patternAbout, originAbout } from "./patternAbout";
export const RedirectAbout: React.FunctionComponent<UrlParamsAbout & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAbout, { path: props.path, query: props.query, origin: props.origin ?? originAbout });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
