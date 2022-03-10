import * as SliderPrimitive from '@radix-ui/react-slider'
import { styled } from '../../stitchesTheme';

export const Slider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  maxWidth: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    maxWidth: 20,
    height: 100,
  },
});

export const Track = styled(SliderPrimitive.Track, {
  backgroundColor: '$slate11',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

export const Range = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '$violet8',
  borderRadius: '9999px',
  height: '100%',
});

export const Thumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px $slate7`,
  borderRadius: 10,
  '&:hover': { backgroundColor: '$violet3' },
  '&:focus': { 
    outline: '2px solid $violet8',
    outlineOffset : '0px',
  },
});

export default function CommonSlider (props: SliderPrimitive.SliderProps){
  return (
    <Slider {...props} >
      <Track>
        <Range />
      </Track>
      <Thumb />
    </Slider>
  )
}

// usage
// export default () => (
//   <Slider.Root>
//     <Slider.Track>
//       <Slider.Range />
//     </Slider.Track>
//     <Slider.Thumb />
//   </Slider.Root>
// );
