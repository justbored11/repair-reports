import FilterMenu from "./FilterMenu";

type Filter = {
  category: string;
  option: string;
};

type FilterMenuContainerProps = {
  categories: Map<string, Set<string>>;

  onFiltersChangeCallback?: (updateFilters: Filter[]) => void;
};

export default function FilterMenuContainer({
  onFiltersChangeCallback,
  categories,
}: FilterMenuContainerProps) {
  const filterCategories = Array.from(categories.keys());
  const filterOptionsMap = categories;

  function handleFilterChange(updatedFilters: Filter[]) {
    if (onFiltersChangeCallback) {
      onFiltersChangeCallback(updatedFilters);
    }
  }

  return (
    <div>
      <ul></ul>
      <FilterMenu
        onFilterChangeCallback={handleFilterChange}
        filterCategories={filterCategories}
        filterCategoryOptions={filterOptionsMap}
      />
    </div>
  );
}
