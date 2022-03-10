import { globalCss } from "./stitchesTheme";

const globalStyles = globalCss({
  '*':{
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
  },
  'body': {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    backgroundColor: '$slate2'
  }
})
export default globalStyles
