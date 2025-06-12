import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  )
}

export default App
