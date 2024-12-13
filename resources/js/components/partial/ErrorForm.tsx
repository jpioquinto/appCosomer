import React from 'react'

export default function ErrorForm({children} : {children: React.ReactNode}) {
  return (
    <small className="invalid-feedback">
        {children}
    </small>
  )
}
