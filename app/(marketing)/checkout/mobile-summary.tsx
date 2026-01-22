import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface MobileAccordionProps {
      children: React.ReactNode;
      isOpen: boolean;
      onToggle: () => void;
      subtotal: string;
}

// Custom mobile accordion component (Kept for specific mobile layout functionality)
export const MobileOrderSummaryToggle: React.FC<MobileAccordionProps> = ({ children, isOpen, onToggle, subtotal }) => (
      <div className="border-t border-b border-gray-200 lg:hidden bg-gray-50">
            <Button
                  variant="ghost"
                  onClick={onToggle}
                  className="flex w-full items-center justify-between py-4 px-4 text-sm bg-gray-50 hover:bg-gray-100 h-auto"
            >
                  <span className="flex items-center gap-2 text-black hover:text-black">
                        <span className="font-medium">Show order summary</span>
                        <ChevronDown
                              size={16}
                              className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                  </span>
                  <span className="font-medium text-black">{subtotal}</span>
            </Button>
            <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                        isOpen ? "max-h-96" : "max-h-0"
                  }`}
            >
                  <div className="p-4 pt-2 border-t border-gray-200">{children}</div>
            </div>
      </div>
);
