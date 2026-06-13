import { ChevronRight, Home, ListTodo, LucideEqualApproximately, Monitor, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import profileImage from './assets/profile.jpeg';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "./components/ui/sidebar";
import PageLayout from "./custom_components/PageLayout";
import setTheme from "./functions/setTheme";
import GithubSearchPage from "./pages/GithubSearch";
import HomePage from "./pages/Home";
import { TodoPage } from "./pages/Todo";


const navData = [
  {
    sectionName: "Tools",
    actions: [
      {
        label: "Home",
        icon: <Home />,
        path: "/react-shadcn-ui/",
        page: <HomePage />,
      },
      {
        label: "Todo",
        icon: <ListTodo />,
        path: "/react-shadcn-ui/todo",
        page: <TodoPage />,
      },
      {
        label: "Github Search",
        icon: <Search />,
        path: "/react-shadcn-ui/github-search",
        page: <GithubSearchPage />
      },
      {
        label: "Components",
        icon: <LucideEqualApproximately />,
        collapsibleActions: [
          {
            label: "Buttons",
            path: "/react-shadcn-ui/components/buttons",
            page: <PageLayout title="Buttons" />
          },
          {
            label: "Dialogs",
            path: "/react-shadcn-ui/components/dialogs",
            page: <PageLayout title="Dialogs" />
          },
          {
            label: "Lists",
            path: "/react-shadcn-ui/components/lists",
            page: <PageLayout title="Lists" />
          },
        ]
      }
    ]
  },
];


export default function App() {
  let [mode, setMode] = useState(localStorage.getItem("web_app_theme_mode") ?? 'system')
  useEffect(() => {
    setTheme(mode)
  }, [mode])
  return <div className="">

    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="border p-2 rounded-[12px] flex gap-3 items-center group-data-[collapsible=icon]:p-0  group-data-[collapsible=icon]:border-0">
            <img src={profileImage} className="object-contain max-h-9  rounded-[8px] border"></img>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h1 className="font-medium text-[13px] truncate">Learning Account</h1>
              <h1 className="text-muted-foreground text-[11px] truncate">Only for learning</h1>
            </div>
          </div>

        </SidebarHeader>
        <SidebarContent>
          {/* Sections */}
          {navData.map(({ sectionName, actions }) =>
            <SidebarGroup key={sectionName}>
              <SidebarGroupLabel>{sectionName}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">

                  {/* with Collapsable items */}
                  {
                    actions.map(({ label, icon, collapsibleActions, path }) => {
                      if (collapsibleActions) {
                        return <Collapsible className="group/collapsible" key={label}> <SidebarMenuItem>

                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {icon}<span>{label}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>

                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {collapsibleActions.map(({ label, path }) => <SidebarMenuSubItem>
                                <NavLink to={path} key={path} end>
                                  {({ isActive }) => <SidebarMenuSubButton isActive={isActive}><span>{label}</span></SidebarMenuSubButton>}
                                </NavLink>

                              </SidebarMenuSubItem>)}
                            </SidebarMenuSub>

                          </CollapsibleContent>
                        </SidebarMenuItem>
                        </Collapsible>
                      }

                      // One item
                      return <SidebarMenuItem key={path} >
                        <NavLink to={path} end>
                          {({ isActive }) => <SidebarMenuButton isActive={isActive}>{icon}<span>{label}</span></SidebarMenuButton>}
                        </NavLink>
                      </SidebarMenuItem>
                    })
                  }
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

        </SidebarContent>

        {/* Theme Mode trigger */}
        <SidebarFooter>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton >
                  <SidebarMenuBadge className="opacity-50">{mode}</SidebarMenuBadge>
                  {
                    (() => {
                      if (mode == 'light') {
                        return <Sun />
                      } else if (mode == 'dark') {
                        return <Moon />
                      } else {
                        return <Monitor />
                      }
                    })()
                  }

                  <span>Theme Mode</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>


              <DropdownMenuContent side="left" className="min-w-max">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Select Theme Mode</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>

                    <DropdownMenuRadioItem value="light">
                      <Sun />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <Moon />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <Monitor />
                      System
                    </DropdownMenuRadioItem>

                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>


      <SidebarInset>
        {/* <SidebarTrigger /> */}

        <Routes>
          {
            navData.map(({ actions }) => {

              return (actions).map(({ path, page, collapsibleActions }) => {
                if (collapsibleActions) {
                  return collapsibleActions.map(({ path, page }) => {
                    return <Route path={path} element={page} key={path} />;
                  })
                }
                return <Route path={path} element={page} key={path} />;
              })
            })
          }
        </Routes>
      </SidebarInset>


    </SidebarProvider>
  </div>
}
