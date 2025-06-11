import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AvatarCustomize from './pages/Avatar'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex justify-center">
      {/* Responsive card with wider max width on xl screens */}
      <div
        className="
          w-full 
          max-w-sm       /* small screens */
          sm:max-w-md    /* small tablets */
          md:max-w-3xl   /* medium screens */
          lg:max-w-screen-lg /* large screens */
          xl:max-w-screen-2xl  /* extra extra large */
          bg-gray-900 bg-opacity-90 
          rounded-2xl 
          shadow-2xl 
          p-6 sm:p-8 md:p-10

          min-h-[500px]      /* base height */
          md:min-h-[700px]   /* taller on medium+ screens */
          lg:min-h-[900px]   /* taller on large screens */
        "
      >
        <Router>
          {/* Navigation */}
          <nav className="px-4 sm:px-6 md:px-8 py-4 bg-gray-800 rounded-xl flex space-x-6 text-white mb-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-300'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/avatar"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-300'
              }
            >
              Avatar
            </NavLink>
          </nav>

          {/* Page content */}
          <main className="text-white">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/avatar" element={<AvatarCustomize />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  )
}
