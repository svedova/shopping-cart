import { props } from "@/ui";
import Styled from "styled-components";

export const ImageWrapper = Styled.div`
  width: 50%;
  margin: 0 auto;
  height: 60%;
  margin-bottom: ${props.marginM};
  overflow: hidden;
  display: flex;
  justify-content: center;
  border: none;
`;

export const Image = Styled.img`
  width: 100%;
  border: none;
`;
