import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import Fade from "./Fade";

export default function DefaultTransition(allProps) {
  const { children, ...props } = allProps;
  return (
    <>
      {props.fade && <Fade {...props}>{children}</Fade>}
      {!props.fade && <TransitionLink {...props}>{children}</TransitionLink>}
    </>
  );
}
