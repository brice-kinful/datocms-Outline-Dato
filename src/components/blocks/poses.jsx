import posed from "react-pose";

const Fade = posed.div({
  enter: { opacity: 1, delay: 0, beforeChildren: 300 },
  exit: { opacity: 0, transition: { duration: 1000 } }
});

const DefaultPose = Fade;

export { Fade, DefaultPose };
