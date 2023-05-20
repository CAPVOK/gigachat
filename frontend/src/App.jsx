import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'

import { MainPage, NotFoundPage, ProfilePage, AuthPage } from './pages';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
