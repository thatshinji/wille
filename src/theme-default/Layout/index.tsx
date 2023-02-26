import { useState } from 'react'

const Layout = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>this is layout</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}> add count </button>
    </div>
  )
}

export {
  Layout
}