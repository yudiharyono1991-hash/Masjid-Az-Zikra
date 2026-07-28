import React, { useState, useRef, useEffect } from 'react';

export function AccountCombobox({
  value,
  onChange,
  options,
  placeholder = "Ketik kode/nama akun...",
  className = "w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
  listClassName = "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto top-full left-0",
  itemClassName = "px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 text-gray-800 border-b border-gray-50 last:border-0"
}: {
  value: string;
  onChange: (id: string, label: string) => void;
  options: { id: string; label: string }[];
  placeholder?: string;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
}) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initialize search with selected option label if it exists
  useEffect(() => {
    const selected = options.find(o => o.id === value);
    if (selected) {
      setSearch(selected.label);
    } else if (value && options.length === 0) {
      // If options are not loaded yet but we have a value
      setSearch(value);
    } else {
      setSearch('');
    }
  }, [value, options]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setSearch(''); // Clear search on focus for easier new search
          setIsOpen(true);
        }}
        className={className}
      />
      {isOpen && (
        <ul className={listClassName}>
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500 italic">Tidak ada hasil</li>
          ) : (
            filtered.map(opt => (
              <li
                key={opt.id}
                className={itemClassName}
                onClick={() => {
                  setSearch(opt.label);
                  onChange(opt.id, opt.label);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
