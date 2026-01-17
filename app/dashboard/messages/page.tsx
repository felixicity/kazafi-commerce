import { IconFolderCode, IconMessageCancel } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function UserSettings() {
      return (
            <Empty>
                  <EmptyHeader>
                        <EmptyMedia variant="icon">
                              <IconMessageCancel />
                        </EmptyMedia>
                        <EmptyTitle>No Messages Yet</EmptyTitle>
                        <EmptyDescription>
                              This page is still under development. It will be available soon.
                        </EmptyDescription>
                  </EmptyHeader>
            </Empty>
      );
}
