import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-careers',
  imports: [RouterLink, SectionHeading],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly supabase = inject(SupabaseService);

  readonly jobs = signal<Job[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.seo.setPage(
      'Careers',
      'Browse open positions at OM SAI SOLAR or submit a general job application.',
    );
    void this.loadJobs();
  }

  private async loadJobs(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');
    try {
      const jobs = await this.supabase.getActiveJobs();
      this.jobs.set(jobs);
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Unable to load open positions.',
      );
    } finally {
      this.loading.set(false);
    }
  }
}
