import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const {id} = useParams()

    useEffect(() => {
        localStorage.setItem('userID', id)
    }
    , [id])
  return (
    <div>
        <h1 className=' text-center text-4xl font-medium mt-20'>Thank you for verifying your email you can continue shopping now! </h1>
    </div>
  )
}

export default VerifyEmail