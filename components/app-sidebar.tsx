"use client";

import { Clock3, FolderClosed, ListTodo, Users, ClipboardMinus, CreditCard, LayoutDashboard} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Définition des éléments du menu
const menuItems = [
  { title: "Dashboard", url: "#", icon: <LayoutDashboard /> },
  { title: "Time", url: "#", icon: <Clock3 /> },
  { title: "Expenses", url: "#", icon:  <FolderClosed /> },
  { title: "Task", url: "#", icon: <ListTodo/> },
  { title: "Teams", url: "#", icon: <Users/> },
  { title: "Reports", url: "#", icon: <ClipboardMinus/> },
  { title: "Invoices", url: "#", icon: <CreditCard/> },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                               return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-blue-100">
                      <a href={item.url} className="flex items-center gap-4 font-sans ">
                        <span className={`${item.title=== "Dashboard" ? "text-blue-600" : "text-black/70"}`}>{item.icon}</span>
                        <span className={`${item.title=== "Dashboard" ? "text-blue-600" : "text-black/70"}`}>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
