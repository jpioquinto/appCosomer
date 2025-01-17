import React, { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router'

import WebFont from 'webfontloader'

WebFont.load({
  google: {"families":["Lato:300,400,700,900"]},
  custom: {"families":["Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"], urls: ['../assets/css/fonts.min.css']},
  active: () => sessionStorage.fonts = true
});

createRoot(document.getElementById('app')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  )
  