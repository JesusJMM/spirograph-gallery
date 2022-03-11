import React from 'react'
import { styled } from '../../stitchesTheme'
import Slider from '../ui/slider'
import { Input } from '../ui/input'
import Link from '../ui/Link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import {
  RadioGroup,
  RadioGroupRadio,
  RadioGroupIndicator,
} from '../ui/radio'
import { FormGroup } from '../ui/form'
import { Flex } from '../utils/container'

const Container = styled('nav', {
  height: '100%',
  padding: '$5',
  '& h1': {
    textAlign: 'center',
  },
  '@md':{
    borderRight: '1px solid $slate8',
  }
})

type SidebarEditorProps = {
  r1: number,
  onChangeR1: (e: number[]) => void,
  r2: number,
  onChangeR2: (e: number[]) => void,
  k: number,
  onChangeK: (e: number[]) => void,
  p: string,
  onChangeP: React.ChangeEventHandler<HTMLInputElement>,
  cycloidType: 'epi' | 'hypo',
  onChangeCycloidType: (e: 'epi' | 'hypo') => void,
  speed: number,
  onChangeSpeed: React.ChangeEventHandler<HTMLInputElement>,
}

const Sidebar: React.FC<SidebarEditorProps> = ({ 
  r1,
  onChangeR1,
  r2,
  onChangeR2,
  k,
  onChangeK,
  p,
  onChangeP,
  cycloidType,
  onChangeCycloidType,
  speed,
  onChangeSpeed
}) => {
  return (
    <Container>
      <h1>Options</h1>
      <Flex css={{ justifyContent:'center', marginBottom:'$6', marginTop:'$2'}}>
        <Link href='/spirograph-gallery/'><ArrowLeftIcon /> Go to gallery</Link>
      </Flex>
        <FormGroup>
          <span>R </span>
          <Slider
            step={1}
            min={10}
            value={[r1]}
            max={150}
            onValueChange={onChangeR1}
          />
        </FormGroup>
        <FormGroup>
          <span>r </span>
          <Slider
            step={1.5}
            min={5}
            value={[r2]}
            max={100}
            onValueChange={onChangeR2}
          />
        </FormGroup>
        <FormGroup>
          <span>k </span>
          <Slider
            step={1}
            min={5}
            value={[k]}
            max={100}
            onValueChange={onChangeK}
          />
        </FormGroup>
        <FormGroup>
          <label>P</label>
            <Input
              value={p}
              step={0.1}
              type='number'
              onChange={onChangeP}
            />
        </FormGroup>
        <FormGroup>
          <label>Speed</label>
            <Input
              value={speed}
              step={1}
              type='number'
              onChange={onChangeSpeed}
            />
        </FormGroup>
        <p style={{ fontWeight: 'bold' }}>Spirograph type</p>
        <RadioGroup
          onValueChange={onChangeCycloidType}
          value={cycloidType}
        >
          <FormGroup css={{ marginLeft: '$6', width: '90%' }}>
            <label htmlFor='hypocycloidOption'>Hypocicloid</label>
            <RadioGroupRadio value='hypo' id='hypocycloidOption'>
              <RadioGroupIndicator />
            </RadioGroupRadio>
          </FormGroup>
          <FormGroup css={{ marginLeft: '$6', width: '90%' }}>
            <label htmlFor='epicycloidOption'>Epicycloid</label>
            <RadioGroupRadio value='epi' id='epicycloidOption'>
              <RadioGroupIndicator />
            </RadioGroupRadio>
          </FormGroup>
        </RadioGroup>
    </Container>
  )
}
export default Sidebar
