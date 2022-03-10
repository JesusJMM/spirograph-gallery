import { styled } from "../../stitchesTheme";

const Link = styled('a', {
  color: '$blue9',
  textDecoration: 'none',
  '&:hover':{
    textDecoration: 'underline',
  },
  variants: {
    color: {
      gray: {
        color: '$slate9'
      }
    }
  }
})

export default Link

