import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import Index from './pages/Index'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Index />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}