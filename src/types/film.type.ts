export type MovieDetail = {
    id: string;
    title: string;
    releaseYear: number;
    maturityRating: string;
    genres: string[];
    description: string;
    thumbnailUrl: string;
    backdropUrl?: string;
    trailerUrl?: string;
    link: string;
};
