import { Dictionary } from "./dictionary";
import { Exif } from "./exif";
import { Location } from "./location";
import { TopicSubmission } from "./topic-submission";
import { User } from "./user";

export interface Photo {
    "id": string;
    "created_at": string;
    "updated_at": string;
    "promoted_at": string;
    "width": number;
    "height": number;
    "color": string;
    "blur_hash": string;
    "description": null | string;
    "alt_description": string;
    "urls": {
        "raw": string;
        "full": string;
        "regular": string;
        "small": string;
        "thumb": string;
        "small_s3"?: string;
    },
    "links": {
        "self": string;
        "html": string;
        "download": string;
        "download_location": string;
    },
    "likes": number;
    "liked_by_user": false,
    "current_user_collections": [],
    "sponsorship": null,
    "topic_submissions": Dictionary<TopicSubmission>,
    "user": User,
    "exif": Exif,
    "location": Location,
    "views": number;
    "downloads": number;
}
