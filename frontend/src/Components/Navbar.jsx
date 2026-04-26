import { useContext } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShopContext } from '../Context/ShopContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const location = useLocation();
  const { cart } = useContext(ShopContext);
  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); 
  }

  // Calculate total items in cart
  const cartItemsCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Disclosure as="nav" className="bg-black w-full z-10 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 group-open:hidden" />
              <XMarkIcon aria-hidden="true" className="h-6 w-6 group-open:block hidden" />
            </DisclosureButton>
          </div>

          {/* Logo and Desktop Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {/* SVG Text Logo */}
              <svg className="h-8 w-auto text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
                <text x="0" y="30" fontSize="30" fontFamily="Arial, sans-serif" fill="currentColor"> CLOTHIFY</text>
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {['Home', 'About', 'Collection', 'Contact'].map((name) => (
                  <Link
                    key={name}
                    to={`/${name.toLowerCase()}`}
                    className={classNames(
                      location.pathname === `/${name.toLowerCase()}` ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right-side Icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
  <div>
    <MenuButton className="relative flex rounded-full bg-black text-sm">
      <span className="sr-only">Open user menu</span>
      <UserIcon className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer" />
    </MenuButton>
  </div>
  <MenuItems
    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
  >
    <MenuItem>
      {({ active }) => (
        <Link
          to="/profile"
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700'
          )}
        >
          Your Profile
        </Link>
      )}
    </MenuItem>
    <MenuItem>
      {({ active }) => (
        <Link
          to="/orders"
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700'
          )}
        >
          My Orders
        </Link>
      )}
    </MenuItem>
    <MenuItem>
      {({ active }) => (
        <Link
          to="/"
          onClick={handlelogout} 
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700' 
            
          )}
        >
          Sign out
        </Link>
      )}
    </MenuItem>
  </MenuItems>
</Menu>


            {/* Shopping Bag Icon with Cart Count */}
            <Link to="/cart" className="relative ml-4">
              <ShoppingBagIcon className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {['Home', 'About', 'Collection', 'Contact'].map((name) => (
            <DisclosureButton
              key={name}
              as={Link}
              to={`/${name.toLowerCase()}`}
              className={classNames(
                location.pathname === `/${name.toLowerCase()}` ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
 