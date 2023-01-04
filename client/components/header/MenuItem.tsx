import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Category } from '../../types/Category'

type MenuItemProps = {
  category: Category
  onClose: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ category, onClose }) => {

  const router = useRouter()
  
  return (
    <li>
      <AccordionItem border='none'>
        <AccordionButton _hover={{ background: 'white' }}>
          <div className='flex items-center | w-full gap-2 p-1 | rounded-xl hover:shadow-inner cursor-pointer'>
            <Image src={`http://localhost:3001/${category.imageName}`} alt={category.name} objectFit='cover' boxSize='100px'/>
            <span className='text-md font-semibold'>{category.name}</span>
          </div>
        </AccordionButton>
        <AccordionPanel>
          <ul>
            {category.subcategories.map(subcategory => 
              <li key={subcategory.id} className='cursor-pointer hover:opacity-70 transition-all p-1' onClick={onClose}>
                <Link href={`/subcategories/${subcategory.id}`}>{subcategory.name}</Link>
              </li>
            )}
          </ul>
        </AccordionPanel>
      </AccordionItem>
    </li>
  )
}

export default MenuItem