"use client"

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { useSearchStore } from "@/store/search.store";

export default function SearchBox() {
	const { query, results, isLoading, isOpen, activeIndex, setQuery, setIsOpen, setActiveIndex, reset } =
		useSearchStore();

	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

	const open = () => setIsOpen(true);

	const close = useCallback(() => {
		setIsOpen(false);
		setActiveIndex(-1);
	}, [setIsOpen, setActiveIndex]);

	const clear = () => {
		reset();
		inputRef.current?.focus();
	};

	const handleChange = (value: string) => {
		setQuery(value);

		if (!value.trim()) {
			setIsOpen(false);
			return;
		}

		setIsOpen(true);

		clearTimeout(debounceRef.current!);
		debounceRef.current = setTimeout(() => {
			// TODO: Firestore search — see TODO.md
			// For now, set empty results
		}, 300);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setActiveIndex(Math.min(activeIndex + 1, results.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setActiveIndex(Math.max(activeIndex - 1, -1));
				break;
			case "Enter":
				e.preventDefault();
				if (activeIndex >= 0 && results[activeIndex]) {
					close();
				}
				break;
			case "Escape":
				e.preventDefault();
				close();
				inputRef.current?.blur();
				break;
		}
	};

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				close();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [close]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	const hasQuery = query.trim().length > 0;

	return (
		<div ref={containerRef} className={`search-box ${isOpen ? "is-open" : ""}`}>
			<button
				className="search-box__trigger"
				onClick={open}
				aria-expanded={isOpen}
				aria-label="Search products"
			>
				<Search size={20} />
			</button>

			<div className="search-box__field">
				<input
					ref={inputRef}
					type="search"
					className="search-box__input"
					placeholder="Search products…"
					value={query}
					onChange={(e) => handleChange(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={open}
					role="combobox"
					aria-expanded={isOpen}
					aria-controls="search-dropdown"
					aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
					autoComplete="off"
				/>
				{hasQuery && (
					<button className="search-box__clear" onClick={clear} aria-label="Clear search">
						<X size={16} />
					</button>
				)}
			</div>

			{isOpen && hasQuery && (
				<div
					ref={dropdownRef}
					id="search-dropdown"
					className="search-box__dropdown"
					role="listbox"
					aria-label="Search results"
				>
					{isLoading && (
						<>
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="search-box__skeleton" aria-hidden="true">
									<div className="search-box__skeleton-thumb" />
									<div className="search-box__skeleton-text">
										<div className="search-box__skeleton-line" />
										<div className="search-box__skeleton-line" />
									</div>
								</div>
							))}
						</>
					)}

					{!isLoading && results.length === 0 && (
						<div className="search-box__empty" role="status" aria-live="polite">
							No results found for &ldquo;{query}&rdquo;
						</div>
					)}

					{!isLoading &&
						results.map((result, i) => (
							<Link
								key={result.id}
								id={`search-result-${i}`}
								href={`/product/${result.slug}`}
								className={`search-box__result ${i === activeIndex ? "is-active" : ""}`}
								role="option"
								aria-selected={i === activeIndex}
								onClick={close}
							>
								<img
									src={result.image}
									alt=""
									className="search-box__result-img"
									width={40}
									height={40}
								/>
								<div className="search-box__result-info">
									<div className="search-box__result-name">{result.name}</div>
									<div className="search-box__result-price">
										${result.price.toFixed(2)}
									</div>
								</div>
							</Link>
						))}

					{!isLoading && results.length > 0 && (
						<div className="search-box__footer">
							<Link href={`/shop?q=${encodeURIComponent(query)}`} onClick={close}>
								View all results
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
