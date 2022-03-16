import * as React from 'react'
import { styled } from '../stitchesTheme'
import Link from '../components/ui/Link'
import Hypocycloid from '../components/canvas/hypocycloid'
import Epicycloid from '../components/canvas/epicycloid'
import { orange, pink, teal, violet } from '@radix-ui/colors'
import { Flex } from '../components/utils/container'
import { ArrowRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

const CanvasGallery = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  columnGap: '2em',
  rowGap: '1em',
  marginBlock: '$6',
})
const Container = styled('div', {
  paddingBlock: '$5',
  margin: 'auto',
  padding: '1em',
  maxWidth: 840,
  '& h1': {
    textAlign: 'center',
    fontWeight: '600',
  },
})
const Heading = styled('p', {
  fontSize: '1.5em',
  fontWeight: 'bold',
  display: 'inline',
  marginRight: '$5',
  marginTop: '$6',
})

const Gallery: React.FC = () => {
  const data: {
    title: string
    moreInfo: string
    component: React.FC<any>
    data: any[]
    color: string
  }[] = [
    {
      title: 'Hypocycloid',
      moreInfo: 'https://en.wikipedia.org/wiki/Hypocycloid',
      component: Hypocycloid,
      color: violet.violet9,
      data: [
        { p: 3 },
        { p: 5 },
        { p: 6 },
        { p: 5.5 },
        { p: 7.2 },
        { p: 2.1 },
      ],
    },
    {
      title: 'Hypotrochoid',
      moreInfo: 'https://en.wikipedia.org/wiki/Hypotrochoid',
      component: Hypocycloid,
      color: teal.teal9,
      data: [
        { p: 1.2  , k: 30},
        { p: 2.25 , k: 70, R: 60},
        { p: 7.2  , k: 40, R: 80},
        { p: 4.2  , k: 30},
        { p: 2    , k: 20},
        { p: 2.1  , k: 60, R: 80},
      ],
    },
    {
      title: 'Epicycloid',
      moreInfo: 'https://en.wikipedia.org/wiki/Epicycloid',
      component: Epicycloid,
      color: orange.orange9,
      data: [
        { p: 1, R: 32},
        { p: 2 },
        { p: 3 },
        { p: 2.1, V : 0.1 },
        { p: 5.5, V : 0.04, R: 54 },
        { p: 7.2, V : 0.04, R: 64 },
      ],
    },
    {
      title: 'Epitrochoid',
      moreInfo: 'https://en.wikipedia.org/wiki/Epitrochoid',
      component: Epicycloid,
      color: pink.pink9,
      data: [
        { p: 1, R: 32, h: 16},
        { p: 2 , h: 32, R: 32},
        { p: 2.2, R: 32, h: 32 },
        { p: 2.1, h: 12, V : 0.1 },
        { p: 5.25, V : 0.04, R: 54, h: 20 },
        { p: 9, V : 0.04, R: 64, h: 16 },
      ],
    },
  ]
  return (
    <Container>
      <Flex css={{ justifyContent:'center', alignItems:'center', flexWrap:'wrap', columnGap:'$6'}}>
        <h1 style={{ position:'relative', paddingLeft:'15%'}}>Gallery</h1>
        <Link href='/editor'><ArrowRightIcon /> Go to Editor</Link>
      </Flex>
        <Link 
          href='https://github.com/JesusJMM/spirograph-gallery'        
          target="_blank"
          css={{ display:'flex' , alignItems: 'center', gap: '$3', marginBlock:'$6'}}>
          <GitHubLogoIcon />
          <span>See the source code.</span>
        </Link>
      {data.map((d, i) => {
        const baseID = i
        const SpirographComp = d.component
        return (
          <div key={i}>
            <Heading>{d.title}</Heading>
            <Link href={d.moreInfo} color='gray' target="_blank">
              More Information
            </Link>
            <CanvasGallery>
              {d.data.map((p, index) => (
                <SpirographComp {...p} canvasID={`${i}-${index}`} key={`${i}-${index}`} color={d.color} />
              ))}
            </CanvasGallery>
          </div>
        )
      })}
      <Flex css={{ justifyContent: 'center', alignItems:'center', color:'$slate11', paddingBlock: '5em'}}>
        <p>Created by Jesus Marcano</p>
      </Flex>
    </Container>
  )
}

export default Gallery
