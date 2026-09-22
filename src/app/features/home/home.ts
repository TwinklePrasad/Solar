import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SectionHeading],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  private readonly seo = inject(SeoService);

  readonly services = [
    {
      title: 'Residential Solar',
      text: 'Custom rooftop systems designed to lower your home energy bills and increase property value.',
    },
    {
      title: 'Commercial Solar',
      text: 'Scalable installations for offices, warehouses, and retail sites with long-term ROI.',
    },
    {
      title: 'Maintenance',
      text: 'Inspections, cleaning, and performance checks to keep your system running efficiently.',
    },
  ];

  readonly steps = [
    { title: 'Consultation', text: 'We review your energy needs and goals.' },
    { title: 'Design', text: 'Our team plans a system tailored to your property.' },
    { title: 'Install', text: 'Certified crews complete a clean, professional install.' },
  ];

  readonly stats = [
    { value: '10+', label: 'Years experience' },
    { value: '1,200+', label: 'Installations' },
    { value: '98%', label: 'Customer satisfaction' },
    { value: '24/7', label: 'Support options' },
  ];

  ngOnInit(): void {
    this.seo.setPage(
      'Home',
      'OM SAI SOLAR installs residential and commercial solar systems. Get a free quote or join our team.',
    );
  }
}
