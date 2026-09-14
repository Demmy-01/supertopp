import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Products } from './pages/Products'
import { Media } from './pages/Media'
import { Contact } from './pages/Contact'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0B1F35] flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <AnimatedPage key={location.pathname}>
          <Outlet />
        </AnimatedPage>
      </AnimatePresence>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'media', element: <Media /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
