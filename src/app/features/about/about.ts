import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, SectionHeading],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage(
      'About',
      'Learn about OM SAI SOLAR, our service area, and how to contact our team.',
    );
  }
}
