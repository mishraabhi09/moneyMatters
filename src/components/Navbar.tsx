
import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign, User, Menu, LogOut, BarChart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = (
    <>
      <Button 
        variant={isActive('/') ? "default" : "ghost"} 
        className={isActive('/') ? "bg-teal-500 hover:bg-teal-600 text-white" : "text-navy-700 hover:text-navy-900 hover:bg-teal-50"}
        asChild
      >
        <Link to="/">Dashboard</Link>
      </Button>
      <Button 
        variant={isActive('/insights') ? "default" : "ghost"} 
        className={isActive('/insights') ? "bg-teal-500 hover:bg-teal-600 text-white" : "text-navy-700 hover:text-navy-900 hover:bg-teal-50"}
        asChild
      >
        <Link to="/insights">Insights</Link>
      </Button>
      <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-teal-50">Goals</Button>
      <Button variant="ghost" className="text-navy-700 hover:text-navy-900 hover:bg-teal-50">Habits</Button>
    </>
  );

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';

  return (
    <nav className="border-b border-gray-200 py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-teal-500" />
          <span className="text-xl font-semibold text-navy-800">Mindful Money Mentor</span>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-4 flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback className="bg-teal-100 text-teal-700">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
