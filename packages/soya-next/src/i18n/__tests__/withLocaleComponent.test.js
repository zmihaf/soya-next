import React from "react";
import { shallow } from "enzyme";
import withLocale from "../withLocaleComponent";

describe("withLocale", () => {
  let context, Component, ComponentWithLocale;

  beforeEach(() => {
    context = {
      locale: {
        language: "id",
        country: "id"
      },
      defaultLocale: "id-id",
      siteLocales: ["id-id", "en-id"]
    };
    Component = () => <div />;
    ComponentWithLocale = withLocale(Component);
  });

  it("should add default locale, locale, and site locales to component props", () => {
    const wrapper = shallow(<ComponentWithLocale />, { context });
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });

  it("should override locale context with locale props", () => {
    const locale = { language: "en", country: "id" };
    const wrapper = shallow(<ComponentWithLocale locale={locale} />, {
      context
    });
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });

  it("should accept locale string props", () => {
    const wrapper = shallow(<ComponentWithLocale locale="en-id" />, {
      context
    });
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });
});
