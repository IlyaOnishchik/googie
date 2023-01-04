import { TableContainer, Table as TableChakra, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'
import { Product } from '../../../../types/Product'
import TableItem from './TableItem'

type TableProps = {
  products: Product[]
}

const Table: React.FC<TableProps> = ({ products }) => {
  return (
    <TableContainer>
      <TableChakra variant='striped'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Id</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(product => <TableItem product={product}/>)}
        </Tbody>
      </TableChakra>
    </TableContainer>
  )
}

export default Table