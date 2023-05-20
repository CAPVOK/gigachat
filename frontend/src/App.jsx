import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'

import { MainPage, NotFoundPage } from './pages';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
