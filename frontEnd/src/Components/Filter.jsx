import React from 'react'
import { useState } from 'react'

const Filter = () => {

    const [values, setvalue] =useState("")
    const tolowerCase = values.toLowerCase()

    let [products, setProducts] = useState([]); 
    console.log(products,'products=');
  return (
    <div className='main'>
    <span>Enter the Name</span>
    <input type="text" value={values} onChange={e => setvalue(e.target.value)} />
    {products.filter(name => name.toLowerCase().includes(tolowerCase)).map(filteredName => (
    <li>
       {filteredName}
    </li>
  ))}
  
</div>
  )
}

export default Filter
