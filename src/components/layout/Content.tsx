import React from 'react'
import Tasks from '../Tasks'
import Sidebar from './Sidebar'

interface Props {
  
}

const Content: React.FC<Props> = (props) => {
  return (
    <section>
      <Sidebar />
      <Tasks />
    </section>
  )
}

export default Content
