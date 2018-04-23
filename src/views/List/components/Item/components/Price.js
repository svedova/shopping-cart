import { props } from "@/ui";
import Styled from "styled-components";

export const PriceWrapper = Styled.div`
  padding: ${props.paddingM};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Price = Styled.div`
  color: ${props.gray50};
  ${p => p.discounted && "text-decoration: line-through;"}
`;

export const Discount = Styled.div`
  color: red;
`;
