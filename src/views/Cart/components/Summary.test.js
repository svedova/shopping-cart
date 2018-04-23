import React from "react";
import { mount } from "enzyme";
import { Summary, mapStateToProps } from "./Summary";
import mocks from "@/tests/mocks";

describe("(Component) Summary", () => {
  let comp;

  beforeEach(() => {
    comp = mount(<Summary items={mocks.items.all} cart={mocks.cart} />);
  });

  test("should mount", () => {
    expect(comp.html()).toMatchSnapshot();
  });

  test("should match the snapshot for mapStateToProps", () => {
    expect(
      mapStateToProps({ cart: mocks.cart, items: mocks.items })
    ).toMatchSnapshot();
  });

  test("should return the total correctly", () => {
    const inst = comp.instance();
    expect(inst.getTotal()).toBe("16.86");
    expect(inst.getSubtotal()).toBe("17.10");
  });

  test("should return the correct price", () => {
    const inst = comp.instance();
    expect(inst.price(mocks.items.all[0])).toBe("CHF 0.75");
    expect(mocks.items.all[0].price).toBe(0.25);
    expect(mocks.cart.quantities[mocks.items.all[0].id]).toBe(3);
  });

  test("should return the normalized name", () => {
    const inst = comp.instance();
    const item1 = mocks.items.all[0];
    const item2 = mocks.items.all[2];
    const div1 = mount(<div>{inst.normalizedName(item1)}</div>);
    const div2 = mount(<div>{inst.normalizedName(item2)}</div>);

    expect(div1.text()).toBe("(x3)Apple");
    expect(div2.text()).toBe("(x4)Barilla, Penne");
  });
});
