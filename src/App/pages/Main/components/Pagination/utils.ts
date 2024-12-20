export const createPagination = (currentPage: number, totalRecipes: number, setPages: (callback: ()=> (string | number)[])=> void) => {
    const countPage = Math.ceil(totalRecipes / 9);
    if (Number(currentPage) === 1 || Number(currentPage) === 2) {
      setPages(() => [1, 2, 3, "...", countPage]);
    } else if (
      Number(currentPage) === countPage ||
      Number(currentPage) === countPage - 1
    ) {
      setPages(() => [1, "...", countPage - 2, countPage - 1, countPage]);
    } else if (Number(currentPage) === 3) {
      setPages(() => [1, 2, 3, 4, "...", countPage]);
    } else if (Number(currentPage) === countPage - 2) {
      setPages(() => [
        1,
        "...",
        countPage - 3,
        countPage - 2,
        countPage - 1,
        countPage,
      ]);
    } else {
      setPages(() => [
        1,
        "...",
        Number(currentPage) - 1,
        Number(currentPage),
        Number(currentPage) + 1,
        "...",
        countPage,
      ]);
    }
  };