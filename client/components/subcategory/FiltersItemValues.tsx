import { Checkbox } from '@chakra-ui/react'
import React from 'react'
import { useSortedParameterValues } from '../../hooks/useSortedParameterValues'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setFilters } from '../../redux/slices/filtrationSlice'
import { Parameter } from '../../types/Parameter'

type FiltersItemValuesProps = {
  parameter: Parameter
}

const FiltersItemValues: React.FC<FiltersItemValuesProps> = ({ parameter }) => {

  const sortedValues = useSortedParameterValues(parameter)

  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.filtration.filters)
  
  return (
    <div className='flex flex-col'>
      {sortedValues.map(value => 
        <Checkbox 
          isChecked={filters.find(filter => JSON.stringify(filter) === JSON.stringify({ name: parameter.name, value })) ? true : false}
          onChange={() => dispatch(setFilters({name: parameter.name, value}))}
        >
          {value}
        </Checkbox>
      )}
    </div>
  )
}

export default FiltersItemValues