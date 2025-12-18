"use client";

/**
 * @author: @kokonutui
 * @description: A modern search bar component with action buttons and suggestions
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {useState, useEffect, useMemo, useCallback} from "react";
import {Input} from "@/components/ui/input";
import {motion, AnimatePresence} from "motion/react";
import {
  Search,
  Send,
  BarChart2,
  Video,
  PlaneTakeoff,
  AudioLines,
  LayoutGrid,
  Plus,
} from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {IoMdInformationCircleOutline} from "react-icons/io";
import {HiFolderAdd} from "react-icons/hi";
import {VscNewFolder} from "react-icons/vsc";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: React.ReactNode;
}

interface SearchResult {
  actions: Action[];
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: {opacity: 0, height: 0},
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {duration: 0.4},
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {duration: 0.3},
        opacity: {duration: 0.2},
      },
    },
  },
  item: {
    hidden: {opacity: 0, y: 20},
    show: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.3},
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {duration: 0.2},
    },
  },
} as const;

const allActionsSample = [
  {
    id: "1",
    label: "Book tickets",
    icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
    description: "",
    short: "",
    end: <Plus className="w-3.5 h-3.5" />,
  },
];

function LinkCategoryDropdown({
  actions = allActionsSample,
  defaultOpen = false,
}: {
  actions?: Action[];
  defaultOpen?: boolean;
}) {
  const [query, setQuery] = useState("");
  //   const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(defaultOpen);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions;

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return actions.filter((action) => {
      const searchableText = `${action.label} ${
        action.description || ""
      }`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, actions]);

  const result = useMemo<SearchResult | null>(() => {
    if (!isFocused) return null;
    return {actions: filteredActions};
  }, [filteredActions, isFocused]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setIsTyping(true);
      setActiveIndex(-1);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!result || result.actions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < result.actions.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : result.actions.length - 1
          );
          break;

        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) {
            setSelectedAction(result.actions[activeIndex]);
          }
          break;

        case "Escape":
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    },
    [result, activeIndex]
  );

  const handleActionClick = useCallback((action: Action) => {
    setSelectedAction(action);
  }, []);

  const handleFocus = useCallback(() => {
    setSelectedAction(null);
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
      setActiveIndex(-1);
    }, 200);
  }, []);

  return (
    <div className="w-full ">
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full  sticky top-0 bg-background z-10 pb-1">
          <label
            className="text-sm font-medium text-gray-500 dark:text-white mb-1 block"
            htmlFor="search"
          >
            {`Application Category`}
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Link category"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded={isFocused && !!result}
              aria-autocomplete="list"
              aria-activedescendant={
                activeIndex >= 0
                  ? `action-${result?.actions[activeIndex]?.id}`
                  : undefined
              }
              id="search"
              autoComplete="off"
              className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              {/* <AnimatePresence mode="popLayout">
                {query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 20, opacity: 0}}
                    transition={{duration: 0.2}}
                  >
                    <Plus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 20, opacity: 0}}
                    transition={{duration: 0.2}}
                  >
                    <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="hover:text-gray-100 hover:cursor-pointer text-gray-400 bg-transparent p-0 hover:bg-transparent"
                    size={"icon-xs"}
                    type="button"
                  >
                    <VscNewFolder className="text-zinc-500 h-4 w-4 scale-[1] origin-center" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="">Add to New Project</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence>
            {isFocused && result && !selectedAction && (
              <motion.div
                className="w-full border rounded-md shadow-xs overflow-hidden dark:border-gray-800 bg-white dark:bg-black mt-1"
                variants={ANIMATION_VARIANTS.container}
                role="listbox"
                aria-label="Search results"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul role="none">
                  {result.actions.map((action) => (
                    <motion.li
                      key={action.id}
                      id={`action-${action.id}`}
                      className={`px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer rounded-md ${
                        activeIndex === result.actions.indexOf(action)
                          ? "bg-gray-100 dark:bg-zinc-800"
                          : ""
                      }`}
                      variants={ANIMATION_VARIANTS.item}
                      layout
                      onClick={() => handleActionClick(action)}
                      role="option"
                      aria-selected={
                        activeIndex === result.actions.indexOf(action)
                      }
                    >
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500" aria-hidden="true">
                            {action.icon}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {action.label}
                          </span>
                          {action.description && (
                            <span className="text-xs text-gray-400">
                              {action.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {action.short && (
                          <span
                            className="text-xs text-gray-400"
                            aria-label={`Keyboard shortcut: ${action.short}`}
                          >
                            {action.short}
                          </span>
                        )}
                        {action.end && (
                          <span className="text-xs text-gray-400 text-right">
                            {action.end}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-2 px-3 py-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Press + on right for adding to respective Project
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default LinkCategoryDropdown;
