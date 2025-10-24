import { pool } from './connection';

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS purchase_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    date date NOT NULL,
    order_number text NOT NULL UNIQUE,
    party_name text NOT NULL,
    broker text,
    mill text,
    weight numeric,
    bags integer,
    product text,
    rate numeric,
    terms_and_conditions text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS idx_po_order_number ON purchase_orders(order_number);
  CREATE INDEX IF NOT EXISTS idx_po_date ON purchase_orders(date);
  CREATE INDEX IF NOT EXISTS idx_po_party_name ON purchase_orders(party_name);

  CREATE TABLE IF NOT EXISTS company_profile (
    id integer PRIMARY KEY DEFAULT 1,
    company_name text NOT NULL,
    company_logo text,
    address text,
    phone text,
    email text,
    gst_number text,
    bank_name text,
    bank_account_number text,
    ifsc_code text,
    branch_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT company_profile_single_row CHECK (id = 1)
  );
`;

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('Initializing database...');
    await client.query(createTableSQL);
    console.log('✓ Database initialized successfully');
    return true;
  } catch (err) {
    console.error('✗ Database initialization failed:', err);
    throw err;
  } finally {
    client.release();
  }
}
