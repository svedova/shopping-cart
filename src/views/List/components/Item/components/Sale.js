import Styled from "styled-components";
import { props } from "@/ui";

export default Styled.span`
  position: absolute;
  transform: rotate(-45deg);
  background-color: red;
  color: white;
  padding: ${props.paddingS};
  font-size: 0.8rem;
  top: 0;
  right: 0;
  border-radius: 3px;
`;
