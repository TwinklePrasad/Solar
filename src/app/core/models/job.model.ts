export interface Job {
  id: string;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  is_active: boolean;
  created_at?: string;
}
