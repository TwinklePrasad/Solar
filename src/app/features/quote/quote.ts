import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [ReactiveFormsModule, SectionHeading],
  templateUrl: './quote.html',
  styleUrls: ['./quote.scss'],
})
export class Quote implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);
  private readonly supabase = inject(SupabaseService);

  readonly submitting = signal(false);
  readonly success = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    property_type: ['residential' as 'residential' | 'commercial', Validators.required],
    monthly_bill: [null as number | null],
    message: [''],
  });

  ngOnInit(): void {
    this.seo.setPage(
      'Get a Quote',
      'Request a free solar installation quote from OM SAI SOLAR.',
    );
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');
    this.success.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    try {
      const value = this.form.getRawValue();
      await this.supabase.submitQuoteRequest({
        name: value.name,
        email: value.email,
        phone: value.phone,
        address: value.address,
        property_type: value.property_type,
        monthly_bill: value.monthly_bill,
        message: value.message || undefined,
      });
      this.success.set(true);
      this.form.reset({ property_type: 'residential', monthly_bill: null, message: '' });
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Unable to submit your request. Please try again.',
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
