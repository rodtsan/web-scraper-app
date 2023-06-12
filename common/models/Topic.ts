export interface SymanticSearch {
  index?: number;
  text?: string;
  embedding?: string;
  similarities?: string;
}

export interface SymanticSearchData {
  symantic_search?: SymanticSearch[];
}

export interface Topic {
  id?: number;
  title?: string;
  csv_file?: string;
  embedding?: string;
  search_title?: string;
  search_text?: string;
}

export interface TopicsData {
  topics?: Topic[];
}
