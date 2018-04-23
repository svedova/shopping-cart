import Styled from "styled-components";

const Container = Styled.div`
  max-width: 1024px;
  width: 100%;
  flex: 1 1 auto;
  margin: ${p => p.margin};
  display: flex;
  position: relative;
  padding: ${p => p.padding};
  flex-direction: ${p => p.flexDirection};
`;

Container.defaultProps = {
  padding: 0,
  margin: "2rem auto",
  flexDirection: "column"
};

export default Container;
