export interface UnsplashImage {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: any;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: ImageLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  topic_submissions: TopicSubmissions;
  user: User;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: Sponsor;
}

export interface Sponsor {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: any;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: any;
  links: Links;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface Links {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: any;
}

export interface TopicSubmissions {}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: any;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: any;
  links: Links;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UserProfile {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: any;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: any;
  links: Links;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
  followed_by_user: boolean;
  photos: Photo[];
  badge: Badge;
  tags: Tags;
  followers_count: number;
  following_count: number;
  allow_messages: boolean;
  numeric_id: number;
  downloads: number;
  meta: Meta;
}

export interface Photo {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  urls: Urls;
}

export interface Badge {
  title: string;
  primary: boolean;
  slug: string;
  link: any;
}

export interface Tags {
  custom: Custom[];
  aggregated: any[];
}

export interface Custom {
  type: string;
  title: string;
}


export interface SingleUnsplashImage {
  id: string
  slug: string
  created_at: string
  updated_at: string
  promoted_at: any
  width: number
  height: number
  color: string
  blur_hash: string
  description: any
  alt_description: string
  breadcrumbs: any[]
  urls: Urls
  links: Links
  likes: number
  liked_by_user: boolean
  current_user_collections: any[]
  sponsorship: Sponsorship
  topic_submissions: TopicSubmissions
  user: User
  exif: Exif
  location: Location
  meta: Meta
  public_domain: boolean
  tags: Tag[]
  tags_preview: TagsPreview[]
  views: number
  downloads: number
  topics: any[]
  related_collections: RelatedCollections
}

export interface Exif {
  make: any
  model: any
  name: any
  exposure_time: any
  aperture: any
  focal_length: any
  iso: any
}