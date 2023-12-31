import type Stripe from "stripe";

export interface AttendanceRecord {
  id: string;
  date: Date;
  student_id: string;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Student {
  id: string;
  full_name?: string;
  pool?: string;
  lessons_left?: number;
  swimmer_level: "beginner" | "advanced" | "pro";
  // active?: boolean;
  medical_certificate_path?: string;
  parent_id?: string;
  phone_number?: string;
  parent_name?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  student_id?: string;
  prices?: Price;
}

export interface UserDetails {
  id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  phone?: string;
  parent_id?: string;
  role?: string;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
  billing_address?: Stripe.Address;
  completed_registration?: boolean;
}
