import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

type NavItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Đặt Phòng', href: '/bookings', icon: CalendarIcon },
  { name: 'Check-in', href: '/check-in', icon: ArrowRightOnRectangleIcon },
  { name: 'Check-out', href: '/check-out', icon: ArrowLeftOnRectangleIcon },
  { name: 'Khách Hàng', href: '/customers', icon: UserGroupIcon },
  { name: 'Hóa Đơn', href: '/invoices', icon: DocumentTextIcon },
  { name: 'Báo Cáo', href: '/reports', icon: ChartBarIcon },
  { name: 'Đối Tác', href: '/partners', icon: BuildingStorefrontIcon },
  { name: 'Khoản Chi', href: '/expenses', icon: CurrencyDollarIcon },
  { name: 'Cài Đặt', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gray-800 w-64">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center h-16 px-4 bg-gray-900">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-white">Hotel Manager</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md group ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 bg-gray-900 text-gray-400 text-xs">
        Version 1.0.0
      </div>
    </div>
  );
}
