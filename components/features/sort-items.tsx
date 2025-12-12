import { IconChevronDown } from "@tabler/icons-react";
import { SortOption } from "@/lib/types";

// SortDropdown (Using raw select for simplicity, but with Shadcn styling)
export const SortDropdown: React.FC<{
      sort: SortOption;
      setSort: React.Dispatch<React.SetStateAction<SortOption>>;
}> = ({ sort, setSort }) => {
      const options: { value: SortOption; label: string }[] = [
            { value: "relevance", label: "Sort by: Relevance" },
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "rating-desc", label: "Top Rated" },
      ];

      return (
            <div className="relative inline-block text-left">
                  <select
                        value={sort}
                        onChange={(e) =>
                              setSort((prevParams) => ({ ...prevParams, sort: e.target.value as SortOption }))
                        }
                        className="appearance-none block w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-black cursor-pointer transition-colors"
                  >
                        {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                    {option.label}
                              </option>
                        ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <IconChevronDown size={16} />
                  </div>
            </div>
      );
};
