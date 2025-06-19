export interface Category {
  id: number;
  name: string;
  description: string | null;
  color: string;
}

export interface NewCategoryDto {
  name: string;
  description?: string | null;
  color: string;
}
