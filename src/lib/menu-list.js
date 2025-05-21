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
          href: "",
          label: "Programas",
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/programas/mujer-vulnerable",
              label: "P. Mujer Vulnerable"
            },
            {
              href: "/admin/programas/semillero-innovacion",
              label: "Semillero de Innovacion"
            },
            {
              href: "/admin/programas/taller-steam",
              label: "Taller Steam"
            },
            {
              href: "/admin/programas/seguridad-alimentarias",
              label: "P. Seguridad Alimentaria"
            },
            {
              href: "/admin/programas/refuerzo-escolar",
              label: "P. Refuerzo Escolar"
            },
            {
              href: "/admin/programas/software-factory",
              label: "P. Factoria Software"
            },
            {
              href: "/admin/programas/voluntariado",
              label: "Voluntariado"
            },
            {
              href: "/admin/programas/cultural",
              label: "P. Cultural"
            },
            {
              href: "/admin/programas/economia-plateada",
              label: "Economia Plateada"
            },
          ]
        },

        
        
        // {
        //   href: "/admin/categorias",
        //   label: "Categorias",
        //   icon: Bookmark
        // },
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
