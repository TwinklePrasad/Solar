import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly menuOpen = signal(false);

  readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/services', label: 'Services', exact: false },
    { path: '/how-it-works', label: 'How It Works', exact: false },
    { path: '/faq', label: 'FAQ', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/careers', label: 'Careers', exact: false },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
