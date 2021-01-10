import React, {useState} from 'react'

const Context = React.createContext({})

export function ContentsContextProvider ({children}) {
  const [contents, setContents] = useState([])

  return <Context.Provider value={{contents, setContents}}>
    {children}
  </Context.Provider>
}

export default Context