import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, SectionHeading],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class Services implements OnInit {
  private readonly seo = inject(SeoService);

  readonly services = [
    {
      title: 'Residential Solar',
      points: [
        'Roof assessment and system design',
        'High-efficiency panels and inverters',
        'Battery storage options',
        'Monitoring setup and owner training',
      ],
    },
    {
      title: 'Commercial Solar',
      points: [
        'Energy usage analysis for businesses',
        'Scalable arrays for large roofs and lots',
        'Permit and utility coordination',
        'Performance reporting for stakeholders',
      ],
    },
    {
      title: 'Maintenance & Support',
      points: [
        'Scheduled inspections and cleaning',
        'Performance troubleshooting',
        'Warranty support guidance',
        'System upgrades and expansions',
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.setPage(
      'Services',
      'Residential solar, commercial solar, and maintenance services from OM SAI SOLAR.',
    );
  }
}
