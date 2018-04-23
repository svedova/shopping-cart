import { injectGlobal } from "styled-components";
import bg from "@/views/Layout/assets/img-noise-100x100.png";

// Global styles for the application. Try to use
// with caution as this method is intended only for REALLY
// global stuff.
injectGlobal`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
  }
  
  body {
    min-height: 100%;
    display: flex;
    background: url(${bg}) repeat;
    font-size: 15px;
    font-family: 'Quicksand', sans-serif;
  }
  
  #root {
    display: flex;
    min-height: 100%;
    width: 100%;
    border: 1px solid black;
  }
  
  a {
    text-decoration: none;
    color: white;
    
    &:hover {
      color: orange;
    }
  }
`;
