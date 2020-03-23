import React from "react";
import Layout from "../components/layout";

const NotFoundPage = () => (
  <div className="container">
    <Layout>
      <div className="page">
        <div className="wrapper centertext">
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </div>
    </Layout>
  </div>
);

export default NotFoundPage;
