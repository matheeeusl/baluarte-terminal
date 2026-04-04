import { useState, useRef, useEffect } from "react";
import { useKeyboard } from "@/hooks/useKeyboard";
import { playInterface } from "@/lib/audio";

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface MenuListProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  onBack?: () => void;
}

export function MenuList({ items, onSelect, onBack }: MenuListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current?.querySelectorAll("li")[activeIndex] as
      | HTMLElement
      | undefined;
    el?.focus();
  }, [activeIndex]);

  useKeyboard({
    itemCount: items.length,
    activeIndex,
    onMove: (index) => {
      playInterface("keystroke");
      setActiveIndex(index);
    },
    onSelect: () => {
      const item = items[activeIndex];
      if (item && !item.disabled) {
        playInterface("keystroke");
        onSelect(item);
      }
    },
    onBack,
  });

  return (
    <ul ref={listRef} className="flex flex-col gap-1" role="menu">
      {items.map((item, i) => (
        <li
          key={item.id}
          role="menuitem"
          tabIndex={i === activeIndex ? 0 : -1}
          aria-disabled={item.disabled}
          onClick={() => {
            setActiveIndex(i);
            if (!item.disabled) {
              playInterface("keystroke");
              onSelect(item);
            }
          }}
          onFocus={() => setActiveIndex(i)}
          className={[
            "cursor-pointer select-none px-2 py-0.5 font-terminal",
            item.disabled
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-(--color-muted)",
            i === activeIndex ? "text-(--color-accent)" : "text-(--color-fg)",
          ].join(" ")}
        >
          <span aria-hidden="true" className="mr-2">
            {i === activeIndex ? "▸" : " "}
          </span>
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
