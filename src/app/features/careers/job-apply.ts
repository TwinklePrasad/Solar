import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { resumeFileValidator } from '../../shared/validators/file.validators';

const ROLE_OPTIONS = [
  'General',
  'Solar Panel Installer',
  'Licensed Electrician',
  'Sales Consultant',
  'Project Manager',
];

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SectionHeading],
  templateUrl: './job-apply.html',
  styleUrls: ['./job-apply.scss'],
})
export class JobApply implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly supabase = inject(SupabaseService);

  readonly roleOptions = ROLE_OPTIONS;
  readonly submitting = signal(false);
  readonly success = signal(false);
  readonly errorMessage = signal('');
  readonly jobId = signal<string | null>(null);
  readonly pageTitle = signal('General application');
  readonly resumeName = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    role: ['General', Validators.required],
    years_experience: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
    message: [''],
    resume: [null as File | null, [resumeFileValidator()]],
  });

  ngOnInit(): void {
    void this.initFromRoute();
  }

  async initFromRoute(): Promise<void> {
    const jobId = this.route.snapshot.paramMap.get('jobId');
    this.jobId.set(jobId);

    if (!jobId) {
      this.seo.setPage('Apply', 'Submit a general job application to OM SAI SOLAR.');
      return;
    }

    const job = await this.supabase.getJobById(jobId);
    if (job) {
      this.pageTitle.set(job.title);
      this.form.patchValue({ role: job.title });
      this.seo.setPage(`Apply: ${job.title}`, `Apply for ${job.title} at OM SAI SOLAR.`);
    } else {
      this.pageTitle.set('Role application');
      this.seo.setPage('Apply', 'Submit a job application to OM SAI SOLAR.');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.form.controls.resume.setValue(file);
    this.form.controls.resume.markAsTouched();
    this.resumeName.set(file?.name ?? '');
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');
    this.success.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const resume = value.resume;
    if (!resume) {
      return;
    }

    this.submitting.set(true);
    try {
      await this.supabase.submitJobApplication(
        {
          job_id: this.jobId(),
          name: value.name,
          email: value.email,
          phone: value.phone,
          role: value.role,
          years_experience: Number(value.years_experience),
          message: value.message || undefined,
        },
        resume,
      );
      this.success.set(true);
      this.form.reset({
        role: this.jobId() ? value.role : 'General',
        years_experience: 0,
        message: '',
        resume: null,
      });
      this.resumeName.set('');
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Unable to submit your application.',
      );
    } finally {
      this.submitting.set(false);
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.touched && control.hasError(error));
  }
}
