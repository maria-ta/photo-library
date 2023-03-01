export interface User {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: null | string;
    twitter_username: null | string;
    portfolio_url: null | string;
    bio: null | string;
    location: null | string;
    links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        following: string;
        followers: string;
    },
    profile_image: {
        small: string;
        medium: string;
        large: string;
    },
    instagram_username: null | string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
        instagram_username: null | string;
        portfolio_url: null | string;
        twitter_username: null | string;
        paypal_email: null | string;
    }
}
