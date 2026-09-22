import { Component, OnInit, inject, signal } from '@angular/core';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [SectionHeading],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq implements OnInit {
  private readonly seo = inject(SeoService);
  readonly openIndex = signal<number | null>(0);

  readonly items: FaqItem[] = [
    {
      question: 'How much does a solar installation cost?',
      answer:
        'Cost depends on system size, roof type, and equipment choices. After a free consultation we provide a clear quote with available incentives.',
    },
    {
      question: 'How long does installation take?',
      answer:
        'Most residential installs are completed in one to three days once permits are approved. Commercial timelines vary by project size.',
    },
    {
      question: 'What warranties are included?',
      answer:
        'Panels and inverters typically include manufacturer warranties, and we stand behind our workmanship. Exact terms are listed in your proposal.',
    },
    {
      question: 'What is net metering?',
      answer:
        'Net metering credits you for excess electricity your system sends to the grid, which can reduce your utility bill over time.',
    },
    {
      question: 'Do solar panels need maintenance?',
      answer:
        'Systems are low maintenance. Occasional cleaning and periodic inspections help maintain performance, and we offer maintenance plans.',
    },
  ];

  ngOnInit(): void {
    this.seo.setPage('FAQ', 'Answers to common questions about solar installation and costs.');
  }

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
