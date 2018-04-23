import Styled, { keyframes } from "styled-components";
import Dropdown from "react-dropdown";
import { props } from "@/ui/index";

const slideDown = keyframes`
  from { max-height: 0 },
  to { max-height: 400px }
`;

export default Styled(Dropdown)`
  cursor: pointer;
  border-bottom: 1px solid ${props.gray90};
  position: relative;
  
  .Dropdown-placeholder {
    color: ${props.gray30};
    transition: color 0.375s ease-in;
    padding: ${props.paddingM};
  }
  
  .Dropdown-control {
    position: relative;
  }

  .Dropdown-arrow {
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props.gray80};
    position: absolute;
    top: 50%;
    right: ${props.paddingM};
    transform: translateY(-50%);
    transition: border 0.375s ease-in;
  }
  
  .Dropdown-menu {
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    max-height: 400px;
    animation: ${slideDown} 0.25s ease-in-out;
    background: white;
    z-index: 1;
    border: 1px solid ${props.gray50};
    border-radius: 5px;
  
    .Dropdown-option {
      background-color: transparent;
      padding: ${props.paddingM};
    }
  }
  
  &:hover {
    .Dropdown-placeholder {
      color: black;
    }
    
    .Dropdown-arrow {
      border-top-color: black;
    }
  }
`;
