import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import { Parameter } from '../../types/Parameter'
import FiltersItemValues from './FiltersItemValues'

type FiltersItemProps = {
  parameter: Parameter
}

const FiltersItem: React.FC<FiltersItemProps> = ({ parameter }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex='1' textAlign='left'>{parameter.name}</Box>
        <AccordionIcon/>
      </AccordionButton>
      <AccordionPanel>
        <FiltersItemValues parameter={parameter}/>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default FiltersItem