import React from 'react'
import { render } from 'react-dom'
import { ReactDemo } from '../../lib/index'
console.log(ReactDemo)

const App = () => <ReactDemo />
render(<App />, document.getElementById('root'))