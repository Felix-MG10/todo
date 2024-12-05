import React from 'react';
import { Input } from "@/components/ui/input";
import { Plus, Bell, Filter } from 'lucide-react';
import Badge from './Badge';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 w-full">
      {/* Barre de recherche */}
      <Input type="search" className="w-64" />

      {/* Actions */}
      <div className="flex items-center gap-6 divide-x divide-gray-300">
        {/* Notifications et Filtres avec séparateurs */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative flex items-center">
            <Bell className="cursor-pointer text-gray-600 hover:text-gray-800" />
            <Badge />
          </div>

          {/* Filtres */}
          <div className="relative flex items-center">
            <Filter className="cursor-pointer text-gray-600 hover:text-gray-800" />
            <Badge />
          </div>
        </div>

        {/* Bouton "Create New" */}
        <Button className="flex items-center gap-2 text-sm">
          <Plus  />
          Create New
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
