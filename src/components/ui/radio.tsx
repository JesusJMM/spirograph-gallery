import { styled } from "../../stitchesTheme";
import { blue } from "@radix-ui/colors";
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  width: 19,
  height: 19,
  borderRadius: '100%',
  boxShadow: `0 2px 10px $slate8`,
  '&:hover': { backgroundColor: '$violet3' },
  '&:focus': { 
    outline: '2px solid $violet8',
  },
})

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 11,
    height: 11,
    borderRadius: '50%',
    backgroundColor: '$violet10',
  }
})

export const RadioGroup = RadioGroupPrimitive.Root
export const RadioGroupRadio = StyledRadio
export const RadioGroupIndicator = StyledIndicator
