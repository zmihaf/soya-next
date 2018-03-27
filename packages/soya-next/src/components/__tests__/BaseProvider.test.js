import React from "react";
import PropTypes from "prop-types";
import TestUtils from "react-dom/test-utils";
import { Cookies } from "react-cookie";
import BaseProvider from "../BaseProvider";
import { localeShape } from "../../constants/PropTypes";

describe("<BaseProvider />", () => {
  const createChild = () =>
    class extends React.Component {
      static contextTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired,
        defaultLocale: PropTypes.string,
        siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
        locale: localeShape
      };

      render() {
        return <div />;
      }
    };

  it("should add cookies, defaultLocale, locale, and siteLocales to child context", () => {
    const Child = createChild();
    const tree = TestUtils.renderIntoDocument(
      <BaseProvider
        cookies={new Cookies()}
        defaultLocale="id-id"
        locale={{ language: "en", country: "id" }}
        siteLocales={["id-id", "en-id"]}
      >
        <Child />
      </BaseProvider>
    );
    const child = TestUtils.findRenderedComponentWithType(tree, Child);
    expect(child.context).toMatchSnapshot();
  });
});
