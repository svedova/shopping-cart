import { css } from "styled-components";
import props from "./props";

export default {
  phoneAndSmaller: (...args) => css`
    @media (max-width: ${props.viewPhone}) {
      ${css(...args)};
    }
  `,

  phabletAndSmaller: (...args) => css`
    @media (max-width: ${props.viewPhablet}) {
      ${css(...args)};
    }
  `,

  tabletAndSmaller: (...args) => css`
    @media (max-width: ${props.viewTablet}) {
      ${css(...args)};
    }
  `,

  desktopAndSmaller: (...args) => css`
    @media (max-width: ${props.viewDesktop}) {
      ${css(...args)};
    }
  `
};
