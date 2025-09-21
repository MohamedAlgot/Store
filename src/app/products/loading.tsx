import {  Loader, LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col justify-center h-screen items-center'>
    <LoaderCircle  className=' text-green-500  animate-spin ' size={60}/>
    <p className='text-green-500 text-lg animate-bounce'>Loading...</p>
    </div>
  )
}
