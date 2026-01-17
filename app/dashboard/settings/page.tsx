import { IconSettingsCancel } from "@tabler/icons-react";
// import { ArrowUpRightIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function UserSettings() {
      return (
            <Empty>
                  <EmptyHeader>
                        <EmptyMedia variant="icon">
                              <IconSettingsCancel />
                        </EmptyMedia>
                        <EmptyTitle>No Settings Yet</EmptyTitle>
                        <EmptyDescription>
                              This page is still under development. It will be available soon.
                        </EmptyDescription>
                  </EmptyHeader>
            </Empty>
      );
}
