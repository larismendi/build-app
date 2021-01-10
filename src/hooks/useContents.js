import { useContext, useEffect, useState} from 'react'
import getContents from '../services/getContents'
import ContentsContext from '../contexts/stores/Contents'

export function useContents ({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(false)
  const {contents, setContents} = useContext(ContentsContext)

  useEffect(function () {
    setLoading(true)

    const keywordToUse = keyword || localStorage.getItem('lastKeyword')

    getContents({ keyword: keywordToUse })
      .then(contents => {
        setContents(contents)
        setLoading(false)
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, setContents])

  return {loading, contents}
} 