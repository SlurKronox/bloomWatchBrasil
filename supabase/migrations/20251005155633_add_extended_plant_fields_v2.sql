/*
  # Expansão do Schema de Plantas v2.0

  ## Novos Campos Adicionados

  ### 1. Tabela `plantas`
    - `polinizadores` (text[]): Array de polinizadores (abelhas, beija-flores, etc)
    - `usos` (text[]): Array de usos (alimentício, medicinal, madeira, etc)
    - `epoca_frutificacao` (text): Período de frutificação
    - `importancia_ecologica` (text): Descrição da importância ecológica
    - `uso_medicinal` (text): Descrição de usos medicinais tradicionais
    - `receitas` (text): Receitas e usos culinários
    - `curiosidade` (text): Curiosidades e informações interessantes
    - `lenda` (text): Lendas e histórias culturais
    - `images` (jsonb): Múltiplas imagens (flor, folha, fruto, árvore, habitat)

  ### 2. Índices
    - Índice GIN para arrays de polinizadores e usos
    - Índice GIN para busca em campos de texto

  ## Notas
    - Todos os campos são opcionais (NULL permitido)
    - Arrays permitem busca eficiente
    - JSONB permite estrutura flexível para imagens
*/

-- Adicionar novos campos à tabela plantas
DO $$ 
BEGIN
  -- Polinizadores (array)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'polinizadores'
  ) THEN
    ALTER TABLE plantas ADD COLUMN polinizadores text[];
  END IF;

  -- Usos (array)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'usos'
  ) THEN
    ALTER TABLE plantas ADD COLUMN usos text[];
  END IF;

  -- Época de frutificação
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'epoca_frutificacao'
  ) THEN
    ALTER TABLE plantas ADD COLUMN epoca_frutificacao text;
  END IF;

  -- Importância ecológica
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'importancia_ecologica'
  ) THEN
    ALTER TABLE plantas ADD COLUMN importancia_ecologica text;
  END IF;

  -- Uso medicinal
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'uso_medicinal'
  ) THEN
    ALTER TABLE plantas ADD COLUMN uso_medicinal text;
  END IF;

  -- Receitas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'receitas'
  ) THEN
    ALTER TABLE plantas ADD COLUMN receitas text;
  END IF;

  -- Curiosidade
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'curiosidade'
  ) THEN
    ALTER TABLE plantas ADD COLUMN curiosidade text;
  END IF;

  -- Lenda
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'lenda'
  ) THEN
    ALTER TABLE plantas ADD COLUMN lenda text;
  END IF;

  -- Múltiplas imagens (JSONB)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'plantas' AND column_name = 'images'
  ) THEN
    ALTER TABLE plantas ADD COLUMN images jsonb DEFAULT '{}';
  END IF;
END $$;

-- Criar índices para melhor performance

-- Índice GIN para arrays (permite busca eficiente em arrays)
CREATE INDEX IF NOT EXISTS idx_plantas_polinizadores 
  ON plantas USING gin(polinizadores);

CREATE INDEX IF NOT EXISTS idx_plantas_usos 
  ON plantas USING gin(usos);

-- Índice GIN para busca full-text em campos de texto
CREATE INDEX IF NOT EXISTS idx_plantas_importancia_ecologica 
  ON plantas USING gin(to_tsvector('portuguese', coalesce(importancia_ecologica, '')));

CREATE INDEX IF NOT EXISTS idx_plantas_uso_medicinal 
  ON plantas USING gin(to_tsvector('portuguese', coalesce(uso_medicinal, '')));

-- Comentários nas colunas
COMMENT ON COLUMN plantas.polinizadores IS 'Array de polinizadores (ex: Abelhas, Beija-flores, Morcegos)';
COMMENT ON COLUMN plantas.usos IS 'Array de usos (ex: Alimentício, Medicinal, Madeira)';
COMMENT ON COLUMN plantas.epoca_frutificacao IS 'Período de frutificação (ex: Março a Junho)';
COMMENT ON COLUMN plantas.importancia_ecologica IS 'Descrição da importância ecológica da espécie';
COMMENT ON COLUMN plantas.uso_medicinal IS 'Usos medicinais tradicionais e validados';
COMMENT ON COLUMN plantas.receitas IS 'Receitas e usos culinários';
COMMENT ON COLUMN plantas.curiosidade IS 'Curiosidades e fatos interessantes';
COMMENT ON COLUMN plantas.lenda IS 'Lendas, mitos e histórias culturais';
COMMENT ON COLUMN plantas.images IS 'JSON com múltiplas URLs de imagens {flor, folha, fruto, arvore, habitat}';