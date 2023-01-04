import { gql, useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const test = () => {

  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])

  return (
    <section>
      <div className='container'>
        <input type="file" onChange={(e) => handleChange(e)}/>
        <Button>Submit</Button>
      </div>
    </section>
  )
}

export default test