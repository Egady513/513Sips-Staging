-- Supabase Database Setup for 513 Sips
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,
    event_date DATE NOT NULL,
    guest_count INTEGER DEFAULT 0,
    service_hours INTEGER DEFAULT 3,
    services_description TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2) NOT NULL,
    balance_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'signed' CHECK (status IN ('draft', 'sent', 'signed', 'deposit_paid', 'completed', 'paid_full', 'cancelled')),
    signed_contract_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts Receivable entries
CREATE TABLE IF NOT EXISTS ar_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('deposit', 'balance', 'full')),
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'overdue')),
    due_date DATE,
    received_at TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions (for misc income/expenses)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for contracts (run this in Supabase Dashboard > Storage)
-- Bucket name: contracts
-- Public access: true (for viewing contracts)
-- Allowed file types: .pdf

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_ar_entries_event ON ar_entries(event_id);
CREATE INDEX IF NOT EXISTS idx_ar_entries_status ON ar_entries(status);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Vendors table (for AP)
CREATE TABLE IF NOT EXISTS vendors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    payment_terms TEXT DEFAULT 'Net 30',
    default_category TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts Payable entries
CREATE TABLE IF NOT EXISTS ap_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    category TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for AP
CREATE INDEX IF NOT EXISTS idx_ap_entries_vendor ON ap_entries(vendor_id);
CREATE INDEX IF NOT EXISTS idx_ap_entries_status ON ap_entries(status);
CREATE INDEX IF NOT EXISTS idx_ap_entries_due_date ON ap_entries(due_date);

-- Enable RLS for new tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ap_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since using anon key)
-- WARNING: In production, restrict this to authenticated users only
CREATE POLICY "Allow all" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON ar_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON vendors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON ap_entries FOR ALL USING (true) WITH CHECK (true);