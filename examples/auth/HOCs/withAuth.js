import React from "react";
import Router from "next/router";

export default Page =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      if (!ctx.cookies.get("token")) {
        if (ctx.res) {
          ctx.res.redirect("/login");
        } else {
          Router.replace("/login");
        }
        return {};
      }
      return Page.getInitialProps && (await Page.getInitialProps(ctx));
    }

    render() {
      return <Page {...this.props} />;
    }
  };
