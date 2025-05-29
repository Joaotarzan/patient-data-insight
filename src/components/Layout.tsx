
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Heart, Bell, Settings, Activity } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Header with ECG-inspired design */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {/* New VivaCore Logo with heart and ECG wave */}
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="h-8 w-8 text-white fill-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    VivaCore
                  </h1>
                  <p className="text-sm text-slate-600 leading-none font-medium">
                    Sistema de Pesquisa Cardíaca
                  </p>
                </div>
              </div>
              
              {/* ECG Wave decoration */}
              <div className="hidden lg:flex items-center space-x-1 opacity-30">
                <Activity className="h-4 w-4 text-red-500" />
                <div className="flex items-end space-x-0.5">
                  {[2, 8, 4, 12, 6, 3, 7, 5].map((height, index) => (
                    <div
                      key={index}
                      className="w-0.5 bg-red-400 rounded-full animate-pulse"
                      style={{ 
                        height: `${height}px`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-red-600 hover:bg-red-50">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-red-50 px-4 py-3 rounded-xl">
                    <Avatar className="h-10 w-10 border-2 border-red-200">
                      <AvatarFallback className="bg-gradient-to-br from-red-100 to-red-200 text-red-700 text-sm font-bold">
                        {getUserInitials(user?.name || '')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500 capitalize">
                        {user?.type === 'patient' ? 'Paciente' : 'Pesquisador'}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-sm border-red-100">
                  <DropdownMenuLabel className="text-slate-900">Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-red-100" />
                  <DropdownMenuItem className="hover:bg-red-50">
                    <User className="mr-3 h-4 w-4 text-red-600" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-red-50">
                    <Settings className="mr-3 h-4 w-4 text-red-600" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-red-100" />
                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"></div>
        </div>
        
        <div className="space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
