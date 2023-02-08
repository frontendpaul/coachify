export type User = {
  id: string;
  name: string;
  role: 'stundent' | 'creator';
  avatar_url?: string;
  description?: string;
};

export type Product = {
  id?: string; // autogenerated
  user_id?: string; // references user.id
  free?: boolean;
  price?: number;
  old_price?: number;
  category?: string; // references category.id
  state?: 'published' | 'unlisted' | 'draft';
  rank_score?: number; // participants * rating
  created_at?: string; // timestampz autogenerated
  updated_at?: string; // timestampz
  //
  owner?: User;
  metadata?: ProductMetadata;
};

export type ProductMetadata = {
  id: string; // references product.id
  title?: string;
  description?: string;
  short_description?: string;
  cover_img: string;
  rating?: number;
  participants?: number;
  duration?: number;
  language?: Language;
  level?: Level;
  tags?: string[];
};

export type ProductContent = {
  id: string; // references product.id
};

export type Section = {
  id?: string; // autogenerated
  content_id: string; // references product_content.id
  title?: string;
};

export type Chapter = {
  id?: string; // autogenerated
  section_id: string; // references section.id
  title?: string;
  description?: string; // reach text
  video_id: string; // references video.id
};

export type Video = {
  id?: string; // autogenerated
  duration: number; // seconds
  src: string;
  name?: string;
  description?: string;
  created_at?: string; // timestampz autogenerated
  updated_at?: string; // timestampz
};

export type Resource = {
  id?: string; // autogenerated
  name: string;
  size: number; // bytes
  src: string;
  type?: 'image' | 'pdf' | 'text' | 'zip' | 'other';
  created_at?: string; // timestampz autogenerated
  updated_at?: string; // timestampz
};

export type Category = {
  id?: string; // autogenerated
  name?: string;
  cover_img?: string;
};

export type Review = {
  id?: string; // autogenerated
  product_id: string; // references product.id
  user_id: string; // references user.id
  rating: number; // min 1 max 5
  body: string;
  created_at?: string; // timestampz autogenerated
  updated_at?: string; // timestampz
};

export type Level = 'All levels' | 'Beginner' | 'Intermediate' | 'Expert';
export type Language = 'English' | 'German';
