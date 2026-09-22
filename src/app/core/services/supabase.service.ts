import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Job } from '../models/job.model';
import { QuoteRequest } from '../models/quote-request.model';
import { JobApplication } from '../models/job-application.model';

const SEED_JOBS: Job[] = [
  {
    id: 'seed-installer',
    title: 'Solar Panel Installer',
    location: 'Local Service Area',
    employment_type: 'Full-time',
    description:
      'Install residential and commercial solar panel systems. Experience with roof work and electrical basics preferred. Training provided for the right candidate.',
    is_active: true,
  },
  {
    id: 'seed-electrician',
    title: 'Licensed Electrician',
    location: 'Local Service Area',
    employment_type: 'Full-time',
    description:
      'Perform electrical work for solar installations including inverters, wiring, and grid interconnection. Valid electrician license required.',
    is_active: true,
  },
  {
    id: 'seed-sales',
    title: 'Sales Consultant',
    location: 'Local Service Area / Hybrid',
    employment_type: 'Full-time',
    description:
      'Help homeowners and businesses understand solar benefits, prepare quotes, and guide customers through the buying process.',
    is_active: true,
  },
  {
    id: 'seed-pm',
    title: 'Project Manager',
    location: 'Local Service Area',
    employment_type: 'Full-time',
    description:
      'Coordinate installations from site survey through activation. Manage schedules, permits, crews, and customer communication.',
    is_active: true,
  },
];

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly client: SupabaseClient | null;
  readonly isConfigured: boolean;

  constructor() {
    this.isConfigured = Boolean(environment.supabaseUrl && environment.supabaseAnonKey);
    this.client = this.isConfigured
      ? createClient(environment.supabaseUrl, environment.supabaseAnonKey)
      : null;
  }

  async getActiveJobs(): Promise<Job[]> {
    if (!this.client) {
      return SEED_JOBS;
    }

    const { data, error } = await this.client
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Failed to load jobs from Supabase, using seed data.', error.message);
      return SEED_JOBS;
    }

    return (data as Job[])?.length ? (data as Job[]) : SEED_JOBS;
  }

  async getJobById(id: string): Promise<Job | null> {
    const jobs = await this.getActiveJobs();
    return jobs.find((job) => job.id === id) ?? null;
  }

  async submitQuoteRequest(payload: QuoteRequest): Promise<void> {
    if (!this.client) {
      console.info('Demo mode: quote request accepted', payload);
      return;
    }

    const { error } = await this.client.from('quote_requests').insert(payload);
    if (error) {
      throw new Error(error.message);
    }
  }

  async submitJobApplication(payload: JobApplication, resumeFile: File): Promise<void> {
    if (!this.client) {
      console.info('Demo mode: job application accepted', {
        ...payload,
        resumeName: resumeFile.name,
      });
      return;
    }

    const safeName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${Date.now()}-${safeName}`;

    const { error: uploadError } = await this.client.storage
      .from('resumes')
      .upload(path, resumeFile, { contentType: resumeFile.type, upsert: false });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Store the storage path (bucket is private; download from Supabase dashboard).
    const jobId = this.isUuid(payload.job_id) ? payload.job_id : null;

    const { error } = await this.client.from('job_applications').insert({
      ...payload,
      job_id: jobId,
      resume_url: path,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  private isUuid(value?: string | null): boolean {
    if (!value) {
      return false;
    }
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }
}
