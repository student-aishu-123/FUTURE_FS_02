import React from 'react';
import { Menu, Plus, User } from 'lucide-react';

const Navbar = ({ toggleSidebar, onOpenAddModal, user }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            Client Lead Management
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Lead
            </button>
          )}

          <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold border border-slate-200">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-blue-50 text-blue-700 hidden md:inline-block">
              {user?.role || 'Sales Rep'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
