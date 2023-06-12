export interface Post {
  id?: string;
  name?: string;
  description?: string;
  comments?: string;
  posted_by?: string;
  date_posted?: string;
}

export interface Profile {
  id?: string;
  name?: string;
  description?: string;
  link?: string;
  date_added?: string;
  posts?: Post[];
}

export interface ProfilesData {
     profiles?: Profile[];
  }
  
