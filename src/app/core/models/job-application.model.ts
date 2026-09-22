export interface JobApplication {
  job_id?: string | null;
  name: string;
  email: string;
  phone: string;
  role: string;
  years_experience: number;
  message?: string;
  resume_url?: string;
}
