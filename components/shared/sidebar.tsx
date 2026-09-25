"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Database,
  Download,
  FlaskConical,
  Grid2X2,
  Menu,
  Settings2,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SignOutButton } from "../ui/signout-button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavItem[] = [
  {
    title: "Dashboard Ringkasan",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    title: "Data Siswa",
    href: "/dashboard/siswa",
    icon: Users,
  },
  {
    title: "Modules",
    href: "/dashboard/modules",
    icon: BarChart3,
  },
  // {
  //   title: "Bank Data Penelitian",
  //   href: "/dashboard/data",
  //   icon: Database,
  // },
  // {
  //   title: "Ekspor Data (.CSV)",
  //   href: "/dashboard/export",
  //   icon: Download,
  // },
  // {
  //   title: "Pengaturan",
  //   href: "/dashboard/pengaturan",
  //   icon: Settings2,
  // },
];

interface ResearchSidebarProps {
  className?: string;
  session: Awaited<ReturnType<typeof import("@/lib/auth/auth").auth.api.getSession>>;
}

export const Sidebar = ({ className, session }: ResearchSidebarProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const NavigationContent = () => (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="border-b-4 border-border bg-primary">
          <div className="flex items-center gap-3 px-3 py-4">
            <div
              className="
                flex size-10 shrink-0 items-center justify-center
                border-2 border-border
                bg-foreground
                text-background
                shadow-[3px_3px_0_var(--border)]
              "
            >
              <FlaskConical className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="font-heading text-lg font-black uppercase leading-none tracking-tight">
                Etnosains
              </p>

              <p className="mt-1 font-heading text-[11px] font-bold uppercase leading-none tracking-wider">
                Sasak Physics Lab
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            flex h-10 shrink-0 items-center justify-between
            border-b-2 border-border
            bg-secondary
            px-3
          "
        >
          {session?.user && (
            <div className="flex items-center gap-4">
              <div className="min-w-0">
                <p className="font-heading text-sm font-bold leading-none tracking-tight">
                  {session.user.name || "Pengguna"}
                </p>

                <p className="mt-1 text-xs font-medium leading-none tracking-tight text-muted-foreground">
                  {session.user.role || "Role"}
                </p>
              </div>
            </div>
          )}
        </div>

        <nav className="overflow-y-auto px-3 py-5">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex min-h-12 items-center gap-3",
                      "border-2 border-transparent",
                      "px-3 py-2",
                      "font-heading text-sm font-semibold",
                      "outline-none transition-none",
                      "focus-visible:border-border",
                      "focus-visible:ring-2 focus-visible:ring-ring",

                      isActive
                        ? [
                          "border-border",
                          "bg-primary",
                          "text-primary-foreground",
                          "shadow-[4px_4px_0_var(--border)]",
                        ]
                        : [
                          "text-muted-foreground",
                          "hover:bg-secondary",
                          "hover:text-foreground",
                        ]
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />

                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="shrink-0 border-t-4 border-border bg-secondary px-3 py-4">
        <SignOutButton />
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden lg:flex",
          "sticky top-0 h-screen w-[280px] shrink-0",
          "flex-col",
          "border-r-4 border-border",
          "bg-background",
          className
        )}
      >
        <NavigationContent />
      </aside>

      <header
        className="
          sticky top-0 z-40
          flex h-16 items-center justify-between
          border-b-4 border-border
          bg-primary
          px-4
          lg:hidden
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex size-9 items-center justify-center
              border-2 border-border
              bg-foreground
              text-background
              shadow-[3px_3px_0_var(--border)]
            "
          >
            <FlaskConical className="size-4" />
          </div>

          <div>
            <p className="font-heading text-sm font-black uppercase leading-none">
              Etnosains
            </p>

            <p className="mt-1 font-heading text-[9px] font-bold uppercase tracking-wider">
              Sasak Physics Lab
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu"
          className="
            flex size-10 items-center justify-center
            border-2 border-border
            bg-background
            text-foreground
            shadow-[3px_3px_0_var(--border)]
            active:translate-x-0.5
            active:translate-y-0.5
            active:shadow-none
          "
        >
          <Menu className="size-5" />
        </button>
      </header>

      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="
            fixed inset-0 z-40
            bg-foreground/40
            lg:hidden
          "
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50",
          "flex w-72 max-w-[85vw] flex-col",
          "border-r-4 border-border",
          "bg-background",
          "transition-transform duration-200 ease-in-out",
          "lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          className="
            flex h-16 shrink-0 items-center justify-between
            border-b-4 border-border
            bg-primary
            px-3
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex size-9 items-center justify-center
                border-2 border-border
                bg-foreground
                text-background
                shadow-[3px_3px_0_var(--border)]
              "
            >
              <FlaskConical className="size-4" />
            </div>

            <div>
              <p className="font-heading text-sm font-black uppercase leading-none">
                Etnosains
              </p>

              <p className="mt-1 font-heading text-[9px] font-bold uppercase tracking-wider">
                Sasak Physics Lab
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
            className="
              flex size-9 items-center justify-center
              border-2 border-border
              bg-background
              shadow-[2px_2px_0_var(--border)]
              active:translate-x-px
              active:translate-y-px
              active:shadow-none
            "
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavigationContent />
        </div>
      </aside>
    </>
  );
};
