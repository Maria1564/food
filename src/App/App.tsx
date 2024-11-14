
import Content from 'layout/Content'
import { NavigationPath } from 'layout/Navbar/types'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Main from './pages/Main'
import RecipeDetail from './pages/RecipeDetail'
import UrlParamsProvider from './provider'

const App: React.FC = () => {
  return (
    <UrlParamsProvider>
    <Routes>
      <Route path='/' element={<Content/>}>
        <Route index element={<Navigate to={NavigationPath.RECIPES}/>}/>
        <Route path={NavigationPath.RECIPES}element={<Main/>}/>
        <Route path={`${NavigationPath.RECIPES}/:id`} element={<RecipeDetail/>}/>
      </Route>
    </Routes>
    </UrlParamsProvider>

  )
}

export default App
