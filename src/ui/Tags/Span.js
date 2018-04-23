import Styled from "styled-components";

const Span = Styled.span`
  display: ${p => p.display};
  padding: ${p => p.padding};
`;

Span.defaultProps = {
  display: "inline-block"
};

export default Span;
