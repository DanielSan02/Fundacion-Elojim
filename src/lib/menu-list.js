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
          label: "Registros",
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
              href: "/admin/programas/seguridad-alimentaria",
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

                {
          href: "",
          label: "Eventos",
          icon: SquarePen,
          submenus: [
            {
              href: "",
              label: "P. Mujer Vulnerable",
              submenus: [
                  {
                  href: "/admin/eventos/mujer-vulnerable/todos",
                  label: "Todos los eventos",
                  },
                  {
                  href: "/admin/eventos/mujer-vulnerable/crear-evento",
                  label: "Agregar Evento",
                  }
              ]
            },
            {
              href: "",
              label: "Semillero de Innovación",
              submenus: [
                  {
                  href: "/admin/eventos/semillero-innovacion/todos",
                  label: "Todos los eventos",
                  },
                  {
                  href: "/admin/eventos/semillero-innovacion/crear-evento",
                  label: "Agregar Evento",
                  }
              ]
            },
            {
              href: "",
              label: "Taller Steam",
              submenus: [
                  {
                  href: "/admin/eventos/taller-steam/todos",
                  label: "Todos los eventos",
                  },
                  {
                  href: "/admin/eventos/taller-steam/crear-evento",
                  label: "Agregar Evento",
                  }
              ]
            },
            {
              href: "",
              label: "P. Cultural",
              submenus: [
                  {
                  href: "/admin/eventos/cultural/todos",
                  label: "Todos los eventos",
                  },
                  {
                  href: "/admin/eventos/cultural/crear-evento",
                  label: "Agregar Evento",
                  }
              ]
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
