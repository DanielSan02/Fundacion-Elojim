"use client";

import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

export function Menu({ isOpen }) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <nav className="mt-8 h-full w-full">
        <div className="flex flex-col items-start px-2">
          {menuList.map(({ groupLabel, menus }, groupIndex) => (
            <div className="w-full mb-8" key={groupIndex}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <div className="text-sm font-medium text-muted-foreground px-4 py-3 max-w-[248px] truncate">
                  {groupLabel}
                </div>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full py-3">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="py-3"></div>
              )}
              <ul className="flex flex-col w-full space-y-2">
                {menus.map(({ href, label, icon: Icon, active, submenus }, menuIndex) => (
                  <li className="w-full" key={menuIndex}>
                    {!submenus || submenus.length === 0 ? (
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined && pathname.startsWith(href)) || active
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start h-10"
                              asChild
                            >
                              <Link href={href}>
                                <span className={cn(isOpen === false ? "" : "mr-4")}>
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </ScrollArea>
  );
}