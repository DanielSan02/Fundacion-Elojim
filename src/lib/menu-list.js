import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid
} from "lucide-react";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Admin",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contenido",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/posts",
              label: "Todos los Posts"
            },
            {
              href: "/admin/posts/new",
              label: "Nuevo Post"
            }
          ]
        },
        {
          href: "/admin/categorias",
          label: "Categorias",
          icon: Bookmark
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   icon: Tag
        // }
      ]
    },
    // {
    //   groupLabel: "Configuraciones",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/cuenta",
    //       label: "Cuenta",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}
