"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter()
  useEffect(()=> {
    router.push('/survey-form')
  }, [])
  return (
    <div>page</div>
  )
}

export default page