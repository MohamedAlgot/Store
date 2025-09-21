
import React from 'react'
import { getAllBrand } from '../actions/brand.action'
import Brand from '@/components/brand-coms/Brand';



export default async function Pagebrand() {

 await getAllBrand();

  return (
  <>
  
  <div className="container mx-auto w-[95%] mt-25">
    <h2 className='text-center font-extrabold text-6xl mb-16 text-green-500'>All Brands</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:col-end-3 xl:grid-cols-4 gap-5'>
    <Brand/>
    </div>
  </div>
  
  
  </>
  )
}
