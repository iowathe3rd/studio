"use client";

import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { useSidebar } from "@/components/ui/sidebar";
import { useWindowSize } from "usehooks-ts";
import { PlusIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface StudioHeaderProps {
  title?: string;
  showNewButton?: boolean;
}

function PureStudioHeader({ title = "Projects", showNewButton = true }: StudioHeaderProps) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2 border-b border-border">
      <SidebarToggle />

      {/* Title */}
      <h1 className="text-lg font-semibold">{title}</h1>

      {/* New Project Button */}
      {showNewButton && (!open || windowWidth < 768) && (
        <Button
          className="ml-auto h-8 px-2 md:h-fit md:px-2"
          onClick={() => {
            router.push("/studio/new");
          }}
          variant="outline"
        >
          <PlusIcon />
          <span className="md:sr-only">New Project</span>
        </Button>
      )}
    </header>
  );
}

export const StudioHeader = memo(PureStudioHeader, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.showNewButton === nextProps.showNewButton
  );
});
