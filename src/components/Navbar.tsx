import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign, User, Menu, LogOut, BarChart, Crown } from "lucide-react";
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
import ThemeSwitcher from './ThemeSwitcher';

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
        className={isActive('/') ? "bg-primary hover:bg-primary/90" : ""}
        asChild
      >
        <Link to="/">Dashboard</Link>
      </Button>
      <Button 
        variant={isActive('/insights') ? "default" : "ghost"}
        className={isActive('/insights') ? "bg-primary hover:bg-primary/90" : ""}
        asChild
      >
        <Link to="/insights">Insights</Link>
      </Button>
      <Button 
        variant={isActive('/goals') ? "default" : "ghost"}
        className={isActive('/goals') ? "bg-primary hover:bg-primary/90" : ""}
        asChild
      >
        <Link to="/goals">Goals</Link>
      </Button>
      <Button 
        variant={isActive('/report') ? "default" : "ghost"}
        className={isActive('/report') ? "bg-primary hover:bg-primary/90" : ""}
        asChild
      >
        <Link to="/report">Report</Link>
      </Button>
      <Button 
        variant={isActive('/guardian-connect') ? "default" : "ghost"}
        className={isActive('/guardian-connect') ? "bg-primary hover:bg-primary/90" : ""}
        asChild
      >
        <Link to="/guardian-connect">Guardian Connect</Link>
      </Button>
    </>
  );

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';

  return (
    <nav className="border-b border-border py-4 px-6 bg-card">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">Money Matters</span>
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

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 hover:text-amber-700 border-amber-500/20"
            asChild
          >
            <Link to="/subscription" className="flex items-center gap-1">
              <Crown className="h-4 w-4" />
              <span className="hidden sm:inline">Upgrade</span>
            </Link>
          </Button>
          
          <ThemeSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">
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
      </div>
    </nav>
  );
};

export default Navbar;
