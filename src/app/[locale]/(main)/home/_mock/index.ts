import { TrendingItem } from "@/types/film.type";
import { id } from "zod/v4/locales";

const mockTrendingItem: TrendingItem = {
    id: "1",
    title: "Inception",
    release_year: 2010,
    maturity_rating: "PG-13",
    genres: ["Action", "Sci-Fi"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    vertical_poster: "/images/home/inception-vertical.jpg",
    horizontal_poster: "/images/home/inception-horizontal.jpg",
    rank: 1,
};

export const mockTrendingItems: TrendingItem[] = Array(10)
    .fill(mockTrendingItem)
    .map((item, index) => ({
        ...item,
        id: (index + 1).toString() + "mockTrendingItems",
        rank: index + 1,
    }));
