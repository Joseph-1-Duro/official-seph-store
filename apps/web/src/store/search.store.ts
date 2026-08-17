import { create } from "zustand";

export interface SearchResult {
	id: string;
	name: string;
	price: number;
	image: string;
	slug: string;
}

interface SearchState {
	query: string;
	results: SearchResult[];
	isLoading: boolean;
	isOpen: boolean;
	activeIndex: number;

	setQuery: (query: string) => void;
	setResults: (results: SearchResult[]) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsOpen: (isOpen: boolean) => void;
	setActiveIndex: (activeIndex: number) => void;
	reset: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
	query: "",
	results: [],
	isLoading: false,
	isOpen: false,
	activeIndex: -1,

	setQuery: (query) => set({ query }),
	setResults: (results) => set({ results }),
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsOpen: (isOpen) => set({ isOpen, activeIndex: -1 }),
	setActiveIndex: (activeIndex) => set({ activeIndex }),
	reset: () =>
		set({ query: "", results: [], isLoading: false, isOpen: false, activeIndex: -1 }),
}));
