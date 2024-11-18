import { NavigationPath } from "layout/Navbar/types";

type link = {
    title: string
    url: string,
}

export const NAV_LINKS: link[] = [
    {
        title: "Recipes",
        url: NavigationPath.RECIPES
    },
    {
        title: 'Ingredients',
        url: NavigationPath.INGREDIENTS
    },
    {
        title: 'Products',
        url: NavigationPath.PRODUCTS
    },
    {
        title: 'Menu Items',
        url: NavigationPath.MENU
    },
    {
        title: 'Meal Planning',
        url: NavigationPath.PLAN
    },
]   