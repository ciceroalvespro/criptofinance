"use client"

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Mercado</DropdownMenuItem>
              <DropdownMenuItem>Portfólio</DropdownMenuItem>
              <DropdownMenuItem>Análises</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center text-2xl font-bold">
            <span className="text-[#0070f3]">Cripto</span>
            <span className="text-[#f97316]">Finance</span>
          </div>
        </div>
      </div>
    </nav>
  )
} 