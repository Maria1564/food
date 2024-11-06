
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import React from 'react'
import Content from 'layout/Content'
import RecipeDetail from './pages/RecipeDetail'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Content/>}>
        <Route index element={<Navigate to={'/recipes'}/>}/>
        <Route path='/recipes' element={<Main/>}/>
        <Route path='/recipes/:id' element={<RecipeDetail/>}/>
      </Route>
    </Routes>
  )
}

export default App
