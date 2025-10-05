/*
  # BloomWatch Extended Schema v1.1
  
  1. New Tables
    - `users` - User accounts with email authentication
    - `subscriptions` - Email notification subscriptions
    - `bloom_history` - Historical bloom tracking records
    - `nasa_data_cache` - Cache for NASA API environmental data
    - `predictions` - ML-based bloom predictions
    - `api_keys` - Public API access keys
    - `analytics_events` - Usage analytics tracking
  
  2. Extended Existing Tables
    - Adds new columns to plantas table (family, conservation_status, etc.)
    - Adds new columns to regioes table (climate_zone, biodiversity_index, etc.)
    - Creates indexes for performance optimization
  
  3. Security
    - RLS enabled on all new tables
    - Appropriate policies for authenticated and public access
    - API keys table secured for users only
*/

-- Add new columns to existing plantas table
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS family text DEFAULT '';
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS bloom_start integer DEFAULT 1;
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS bloom_end integer DEFAULT 12;
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS optimal_conditions jsonb DEFAULT '{}'::jsonb;
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS conservation_status text DEFAULT 'LC';
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS image_url text DEFAULT '';
ALTER TABLE plantas ADD COLUMN IF NOT EXISTS regiao_id uuid REFERENCES regioes(id);

-- Add new columns to existing regioes table
ALTER TABLE regioes ADD COLUMN IF NOT EXISTS state text DEFAULT '';
ALTER TABLE regioes ADD COLUMN IF NOT EXISTS climate_zone text DEFAULT 'semi_arid';
ALTER TABLE regioes ADD COLUMN IF NOT EXISTS biodiversity_index numeric(3, 1) DEFAULT 7.0;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  planta_id uuid REFERENCES plantas(id) ON DELETE CASCADE,
  regiao_id uuid REFERENCES regioes(id) ON DELETE CASCADE,
  notification_type text NOT NULL DEFAULT 'email',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_notification_type CHECK (notification_type IN ('email', 'push', 'sms'))
);

-- Create bloom_history table
CREATE TABLE IF NOT EXISTS bloom_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  planta_id uuid NOT NULL REFERENCES plantas(id) ON DELETE CASCADE,
  regiao_id uuid NOT NULL REFERENCES regioes(id) ON DELETE CASCADE,
  bloom_start_date date NOT NULL,
  bloom_end_date date,
  intensity numeric(3, 1) DEFAULT 5.0,
  environmental_conditions jsonb DEFAULT '{}'::jsonb,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_intensity CHECK (intensity >= 0 AND intensity <= 10)
);

-- Create NASA data cache table
CREATE TABLE IF NOT EXISTS nasa_data_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  regiao_id uuid NOT NULL REFERENCES regioes(id) ON DELETE CASCADE,
  data_type text NOT NULL,
  measurement_date date NOT NULL,
  data_values jsonb NOT NULL,
  quality_flag text DEFAULT 'good',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_data_type CHECK (data_type IN ('ndvi', 'temperature', 'precipitation', 'humidity')),
  CONSTRAINT valid_quality CHECK (quality_flag IN ('good', 'fair', 'poor', 'missing')),
  UNIQUE(regiao_id, data_type, measurement_date)
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  planta_id uuid NOT NULL REFERENCES plantas(id) ON DELETE CASCADE,
  regiao_id uuid NOT NULL REFERENCES regioes(id) ON DELETE CASCADE,
  predicted_bloom_date date NOT NULL,
  confidence_score numeric(4, 3) DEFAULT 0.5,
  model_version text NOT NULL,
  input_features jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_confidence CHECK (confidence_score >= 0 AND confidence_score <= 1)
);

-- Create API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key_hash text UNIQUE NOT NULL,
  name text NOT NULL,
  is_active boolean DEFAULT true,
  rate_limit integer DEFAULT 1000,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloom_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE nasa_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions"
  ON subscriptions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for bloom_history (public read)
CREATE POLICY "Public can read bloom history"
  ON bloom_history FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can add bloom history"
  ON bloom_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for NASA data cache (public read)
CREATE POLICY "Public can read NASA data"
  ON nasa_data_cache FOR SELECT
  TO public
  USING (true);

-- RLS Policies for predictions (public read)
CREATE POLICY "Public can read predictions"
  ON predictions FOR SELECT
  TO public
  USING (true);

-- RLS Policies for API keys
CREATE POLICY "Users can view own API keys"
  ON api_keys FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own API keys"
  ON api_keys FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys"
  ON api_keys FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys"
  ON api_keys FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for analytics (restrictive - only service role)
CREATE POLICY "Only service role can manage analytics"
  ON analytics_events FOR ALL
  TO authenticated
  USING (false);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_planta ON subscriptions(planta_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_regiao ON subscriptions(regiao_id);
CREATE INDEX IF NOT EXISTS idx_bloom_history_planta ON bloom_history(planta_id);
CREATE INDEX IF NOT EXISTS idx_bloom_history_regiao ON bloom_history(regiao_id);
CREATE INDEX IF NOT EXISTS idx_bloom_history_date ON bloom_history(bloom_start_date);
CREATE INDEX IF NOT EXISTS idx_nasa_cache_regiao_type_date ON nasa_data_cache(regiao_id, data_type, measurement_date);
CREATE INDEX IF NOT EXISTS idx_predictions_planta_regiao ON predictions(planta_id, regiao_id);
CREATE INDEX IF NOT EXISTS idx_predictions_date ON predictions(predicted_bloom_date);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);