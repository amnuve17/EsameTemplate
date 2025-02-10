import { NavLink } from 'react-router'

const Header = () => {
  return (
   <div className='shadow-md'>
        <div className='max-w-6xl py-5 mx-auto'>
          <div className="flex items-center justify-between">
            <div className='flex items-center gap-4 logo'>
                <img className='w-[35px]' src="/paper-plane.png" />
                <p className='text-2xl font-semibold'>PaperFly</p>
            </div>
            <div className='flex gap-4 nav'>
                <NavLink to="/" className={({ isActive }) => 
                    isActive ? "text-blue-500" : "text-black"
                    }>Lista Voli</NavLink>
                <NavLink to="/favs" className={({ isActive }) => 
                    isActive ? "text-blue-500" : "text-black"
                    }>Lista Preferiti</NavLink>
            </div>
          </div>
        </div>
   </div>
  )
}

export default Header
