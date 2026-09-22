export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  property_type: 'residential' | 'commercial';
  monthly_bill?: number | null;
  message?: string;
}
