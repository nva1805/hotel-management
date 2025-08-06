import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Topbar() {
  return (
    <div className="bg-white shadow h-16 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Admin</span>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
