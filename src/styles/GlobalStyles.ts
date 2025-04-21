import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    /* 主色調 */
    --primary-color: #FF914D;
    --primary-light: #FFB07D;
    --primary-dark: #E67A3D;
    
    /* 輔助色 */
    --secondary-color: #2DA8A4;
    --secondary-light: #4DC8C4;
    --secondary-dark: #1E8884;
    
    /* 中性色 */
    --neutral-100: #FFFFFF;
    --neutral-200: #F5F5F5;
    --neutral-300: #E5E5E5;
    --neutral-400: #D4D4D4;
    --neutral-500: #A3A3A3;
    --neutral-600: #737373;
    --neutral-700: #525252;
    --neutral-800: #404040;
    --neutral-900: #262626;
    
    /* 功能色 */
    --success-color: #4CAF50;
    --warning-color: #FACC15;
    --error-color: #F87171;
    --info-color: #60A5FA;
    
    /* 字體大小 */
    --font-size-small: 0.875rem;
    --font-size-normal: 1rem;
    --font-size-large: 1.25rem;
    --font-size-xlarge: 1.5rem;
    
    /* 間距 */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
  }
`; 