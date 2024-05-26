"use client";

import Link from "next/link";
import { Plus, Presentation } from "lucide-react";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
  FilePlus,
  MessageCircle,
  Video,
  CalendarDays,
  Github,
  Boxes,
  Home,
  PencilRuler,
  Workflow
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>

      <div className="mt-4">
        <Link href="https://synclab-demo.vercel.app/documents" target="_blank">
          <div className="flex items-center">
            <FilePlus className="h-4 w-4" />
            <div className="ml-2">taskify</div>
          </div>
        </Link>
      </div>
      <Accordion type="multiple">
      </Accordion>

      <div className="mt-4">
        <Link href="https://dotread.netlify.app/" target="_blank">
          <div className="flex items-center">
            <Github className="h-4 w-4" />
            <div className="ml-2">dotRead</div>
          </div>
        </Link>
      </div>

      <div className="mt-4">
        <Link href="https://dotpackages.netlify.app/" target="_blank">
          <div className="flex items-center">
            <Boxes className="h-4 w-4" />
            <div className="ml-2">dotPackages</div>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="https://next-draw.vercel.app/" target="_blank">
          <div className="flex items-center">
            <Presentation className="h-4 w-4" />
            <div className="ml-2">nextDraw</div>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="https://erasor-clone.vercel.app/" target="_blank">
          <div className="flex items-center">
            <PencilRuler className="h-4 w-4" />
            <div className="ml-2">vanishMark</div>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="https://localhost:3000/workflows" target="-blank">
          <div className="flex items-center">
            <Workflow className="h-4 w-4" />
            <div className="ml-2">fuzzie</div>
          </div>
        </Link>
      </div>

      <div className="mt-4">
        <Link href="https://calendar.google.com/calendar" target="_blank">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4" />
            <div className="ml-2">calendar</div>
          </div>
        </Link>
      </div>
    </>
  );
};
