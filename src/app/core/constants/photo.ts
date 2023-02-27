/* eslint-disable max-len */
import { Photo } from "@core/models";

/**
 * An example of data from {@link https://unsplash.com/documentation#get-a-random-photo| [Unsplash] Random image endpoint}
 * to be used for local development instead of actual API calls.
 */
export const PHOTOS_MOCK: Photo[] = [
    {
        id: "id-1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00",
        promoted_at: "2023-01-01T00:00:00",
        width: 3000,
        height: 2000,
        color: "#000000",
        blur_hash: "blur_hash",
        description: null,
        alt_description: "Alt description of the photo",
        urls: {
            raw: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
            full: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
            regular: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
            small: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
            thumb: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
            small_s3: "/assets/images/ariel-schmunck-mVlCVxsDogo-unsplash.jpg",
        },
        links: {
            self: "self link",
            html: "html link",
            download: "download link",
            download_location: "download_location link"
        },
        likes: 123,
        liked_by_user: false,
        current_user_collections: [],
        sponsorship: null,
        topic_submissions: {},
        user: {
            id: "user-id-1",
            updated_at: "2023-01-01T00:00:00Z",
            username: "test_user_1",
            name: "Test User",
            first_name: "Test",
            last_name: "User",
            twitter_username: null,
            portfolio_url: null,
            bio: "Bio...",
            location: "Location",
            links: {
                self: "self",
                html: "html",
                photos: "photos",
                likes: "likes",
                portfolio: "portfolio",
                following: "following",
                followers: "followers"
            },
            profile_image: {
                small: "profile image small",
                medium: "profile image medium",
                large: "profile image large"
            },
            instagram_username: "instagram username",
            total_collections: 123,
            total_likes: 456,
            total_photos: 789,
            accepted_tos: true,
            for_hire: true,
            social: {
                instagram_username: "instagram username",
                portfolio_url: null,
                twitter_username: null,
                paypal_email: null
            }
        },
        exif: {
            make: "make",
            model: "model",
            name: "name",
            exposure_time: null,
            aperture: null,
            focal_length: null,
            iso: null
        },
        location: {
            name: null,
            city: null,
            country: null,
            position: {
                latitude: 0.0,
                longitude: 0.0
            }
        },
        views: 12345,
        downloads: 6789
    }
];
