import { useState } from 'react'
import logo from '/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="flex min-h-screen select-none flex-col items-center bg-gradient-to-tr from-teal-500 to-blue-600">
     
      <div className='flex justify-center items-center gap-4'>
        <a href="https://rolf.bible" target="_blank" rel='noreferrer noopener'>
          <img src={logo} className="logo" alt="Rolf.Bible logo" />
        </a>
      </div>
      <h1>Rolf.Bible</h1>
      <div className="card flex flex-col items-center justify-center gap-4">
        <button type='button' className='btn btn-primary w-64 rounded-full' onClick={() => {setCount((count) => count + 1)}}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Rolf.Bible and React logos to learn more
      </p>
    </div>
  )
}

export default App
