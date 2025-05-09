import { useSearchRestaurants } from "../api/RestaurantApi";
import CuisineFilter from "../components/CuisineFilter";
import PaginationSelector from "../components/PaginationSelector";
import { SearchForm } from "../components/SearchBar";
import SearchBarSP from "../components/SearchBarSP";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultInfo from "../components/SearchResultInfo";
import SortOptionDropdown from "../components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) =>
    setSearchState((prev) => ({ ...prev, sortOption, page: 1 }));

  const setSelectedCuisines = (selectedCuisines: string[]) =>
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));

  const setPage = (page: number) =>
    setSearchState((prev) => ({ ...prev, page }));

  const setSearchQuery = (searchFormData: SearchForm) =>
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));

  const resetSearch = () =>
    setSearchState((prev) => ({ ...prev, searchQuery: "", page: 1 }));

  // --- Loading state render ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  // --- No results or invalid city ---
  if (!results?.data || !city) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="text-lg font-semibold">No results found</span>
      </div>
    );
  }

  return (
    <div className="space-between">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
          <CuisineFilter
            selectedCuisines={searchState.selectedCuisines}
            onChange={setSelectedCuisines}
            isExpanded={isExpanded}
            onExpandedClick={() => setIsExpanded((prev) => !prev)}
          />
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBarSP
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
            placeHolder="Search by Cuisine or Restaurant Name"
            onReset={resetSearch}
          />
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultInfo total={results.pagination.total} city={city} />
            <SortOptionDropdown
              sortOption={searchState.sortOption}
              onChange={setSortOption}
            />
          </div>

          {results.data.map((restaurant) => (
            <SearchResultCard
              key={restaurant._id} // <-- Using _id as the unique key
              restaurant={restaurant}
            />
          ))}

          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bg-green-700 text-white py-6 rounded-2xl mb-4 mt-16"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div
            className="text-center md:text-left mb-4 md:mb-0 cursor-pointer"
            onClick={() => (window.location.href = "/")}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h1 className="text-2xl font-bold mb-2 transition-transform transform duration-300 hover:text-white-100 hover:scale-105">
              QuickBite.com
            </h1>
            <p>&copy; 2024 QuickBite. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row mb-4 md:mb-0">
            <a
              href="/about-us"
              className="px-4 py-2 transition-transform transition-colors transform duration-300 ease-in hover:text-white-100 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              About Us
            </a>
            <a
              href="/faqs"
              className="px-4 py-2 transition-transform transition-colors transform duration-300 ease-in hover:text-white-100 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              FAQs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
