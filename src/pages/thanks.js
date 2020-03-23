import React from "react";
import Layout from "../components/layout";

const Thanks = () => {
  const style = {
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
    webkitBoxAlign: "center",
    msFlexAlign: "center",
    alignItems: "center"
  };
  return (
    <div className="container">
      <Layout>
        <div className="page" id="thanks" style={style}>
          <div className={`wrapper x_skinny centertext`}>
            <p className="large">
              Thank you for your submission! We will be in touch with you
              shortly.
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Thanks;
