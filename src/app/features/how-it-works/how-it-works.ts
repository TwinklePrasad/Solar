import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-how-it-works',
  imports: [RouterLink, SectionHeading],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks implements OnInit {
  private readonly seo = inject(SeoService);

  readonly steps = [
    {
      title: 'Consultation',
      text: 'Share your energy goals and utility bills. We explain options, incentives, and expected savings.',
    },
    {
      title: 'Site survey',
      text: 'Our team evaluates roof condition, shading, electrical capacity, and installation access.',
    },
    {
      title: 'Design & permits',
      text: 'We create a custom system design and handle permits and utility paperwork on your behalf.',
    },
    {
      title: 'Installation',
      text: 'Certified installers complete the work with minimal disruption and a clean job site.',
    },
    {
      title: 'Activation & support',
      text: 'We activate your system, set up monitoring, and remain available for questions and maintenance.',
    },
  ];

  ngOnInit(): void {
    this.seo.setPage(
      'How It Works',
      'Learn the OM SAI SOLAR installation process from consultation to activation.',
    );
  }
}
