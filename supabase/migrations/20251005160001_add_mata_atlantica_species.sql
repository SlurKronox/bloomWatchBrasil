/*
  # Adição de 10 Espécies da Mata Atlântica

  ## Espécies Incluídas
    21-30: Espécies endêmicas e características da Mata Atlântica
*/

-- ============================================
-- MATA ATLÂNTICA (10 espécies)
-- ============================================

-- 21. IPÊ-AMARELO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, curiosidade, image_url
) VALUES (
  'Ipê-Amarelo',
  'Handroanthus chrysotrichus',
  'Bignoniaceae',
  8, 10,
  'Árvore icônica com floração espetacular amarelo-dourada que ocorre antes das folhas. Madeira nobre de alta densidade e resistência. Importante símbolo nacional e para paisagismo urbano.',
  'LC',
  '{"temperature": [18, 26], "rainfall": [1200, 2000], "humidity": [60, 80], "soil": "well-drained-fertile"}'::jsonb,
  '🟡',
  'c2163fd1-70c4-42d9-bcc2-2d7cabee2b2b',
  ARRAY['Abelhas', 'Borboletas', 'Beija-flores'],
  ARRAY['Madeira nobre', 'Ornamental', 'Paisagismo', 'Medicinal'],
  'Setembro a Novembro',
  'Floração marca mudança de estações. Madeira classe A para construção civil e naval. Resistente a cupins.',
  'Casca com propriedades anticancerígenas (lapachol). Antibiótico natural.',
  'Floresce no inverno quando está sem folhas, criando espetáculo visual dourado. Árvore símbolo do Brasil.',
  'https://images.pexels.com/photos/4750592/pexels-photo-4750592.jpeg'
);

-- 22. QUARESMEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Quaresmeira',
  'Tibouchina granulosa',
  'Melastomataceae',
  2, 5,
  'Árvore de floração roxa intensa durante a Quaresma (fevereiro-abril). Excelente para arborização urbana e restauração ecológica. Flores muito visitadas por abelhas nativas e beija-flores.',
  'LC',
  '{"temperature": [16, 24], "rainfall": [1400, 2200], "humidity": [65, 85], "soil": "acidic-moist"}'::jsonb,
  '🟣',
  '67b0ab0a-6fbb-4884-8abb-23f64782e017',
  ARRAY['Abelhas nativas', 'Beija-flores', 'Borboletas'],
  ARRAY['Ornamental', 'Reflorestamento', 'Melífera', 'Paisagismo'],
  'Maio a Julho',
  'Pioneira em áreas degradadas. Crescimento rápido. Excelente para recuperação de encostas e APP.',
  'Nome popular devido à floração durante a Quaresma. Uma das árvores mais plantadas em arborização urbana brasileira.',
  'https://images.pexels.com/photos/4750713/pexels-photo-4750713.jpeg'
);

-- 23. PAU-BRASIL
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Pau-Brasil',
  'Paubrasilia echinata',
  'Fabaceae',
  9, 11,
  'Árvore nacional do Brasil, quase extinta pela exploração colonial. Flores amarelas perfumadas em cachos. Madeira vermelha (brasilina) usada em instrumentos musicais de alta qualidade (violinos, arcos).',
  'EN',
  '{"temperature": [20, 26], "rainfall": [1000, 1600], "humidity": [70, 85], "soil": "well-drained"}'::jsonb,
  '🟡',
  '67b0ab0a-6fbb-4884-8abb-23f64782e017',
  ARRAY['Abelhas', 'Borboletas'],
  ARRAY['Madeira nobre', 'Histórico', 'Conservação', 'Instrumentos musicais'],
  'Dezembro a Fevereiro',
  'Endêmica da Mata Atlântica. Quase extinta pela extração colonial. Símbolo nacional. Protegida por lei desde 1961.',
  'Deu nome ao país. Madeira era mais valiosa que ouro no século XVI. Produz corante vermelho natural (brasilina).',
  'https://images.pexels.com/photos/5490947/pexels-photo-5490947.jpeg'
);

-- 24. PALMITO-JUÇARA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Palmito-Juçara',
  'Euterpe edulis',
  'Arecaceae',
  10, 2,
  'Palmeira endêmica da Mata Atlântica, criticamente ameaçada pela extração ilegal de palmito. Flores pequenas em cachos. Palmito comestível nobre e frutos roxos (juçara) para alimentação de fauna e suco.',
  'VU',
  '{"temperature": [18, 24], "rainfall": [1600, 3000], "humidity": [75, 90], "soil": "moist-fertile"}'::jsonb,
  '⚪',
  'c2163fd1-70c4-42d9-bcc2-2d7cabee2b2b',
  ARRAY['Abelhas', 'Besouros'],
  ARRAY['Alimentício', 'Conservação', 'Reflorestamento', 'Açaí da Mata Atlântica'],
  'Abril a Agosto',
  'Vulnerável pela extração ilegal. Frutos alimentam mais de 70 espécies de aves e mamíferos. Essencial para dispersão de sementes.',
  'Suco de juçara (açaí da Mata Atlântica), sorvete, creme',
  'Morre após extração do palmito. Fruto semelhante ao açaí amazônico. Manejo sustentável produz mais do que extração predatória.',
  'https://images.pexels.com/photos/4505625/pexels-photo-4505625.jpeg'
);

-- 25. ARAUCÁRIA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Araucária',
  'Araucaria angustifolia',
  'Araucariaceae',
  9, 11,
  'Conífera símbolo do Sul do Brasil, criticamente ameaçada. Árvore dioica (sexos separados). Pinhão comestível de alto valor nutricional e cultural. Pode viver mais de 500 anos e alcançar 50m de altura.',
  'CR',
  '{"temperature": [12, 20], "rainfall": [1400, 2000], "humidity": [70, 85], "soil": "deep-well-drained"}'::jsonb,
  '🟢',
  'cd7442d5-3745-4df6-a4b9-8ea89e523005',
  ARRAY['Vento (anemofilia)'],
  ARRAY['Alimentício', 'Madeira', 'Conservação', 'Cultural'],
  'Março a Junho',
  'Criticamente ameaçada (90% das florestas destruídas). Pinhão alimenta dezenas de espécies. Árvore símbolo do Paraná.',
  'Pinhão cozido, assado, entrevero, risoto, farofa, paçoca, bolo',
  'Parente dos dinossauros - existe há 200 milhões de anos. Madeira nobre explorada quase à extinção. Corte proibido desde 2001.',
  'https://images.pexels.com/photos/4505808/pexels-photo-4505808.jpeg'
);

-- 26. CAMBUCI
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Cambuci',
  'Campomanesia phaea',
  'Myrtaceae',
  9, 11,
  'Árvore endêmica da Mata Atlântica paulista, criticamente ameaçada. Flores brancas delicadas. Fruto verde aromático único com sabor intenso e cítrico, usado em gastronomia gourmet.',
  'CR',
  '{"temperature": [16, 24], "rainfall": [1400, 2000], "humidity": [70, 85], "soil": "acidic-organic"}'::jsonb,
  '⚪',
  'c2163fd1-70c4-42d9-bcc2-2d7cabee2b2b',
  ARRAY['Abelhas nativas'],
  ARRAY['Alimentício', 'Gastronômico', 'Conservação', 'Cosmético'],
  'Janeiro a Março',
  'Criticamente ameaçada - restrita a poucas localidades. Redescoberta pela gastronomia. Cultivo sustentável pode salvá-la da extinção.',
  'Geleia de cambuci, suco, sorvete, licor, molhos gourmet, cerveja artesanal',
  'Redescoberta por chefs paulistanos. Sabor único descrito como limão + abacaxi + goiaba. Virou símbolo da gastronomia paulista.',
  'https://images.pexels.com/photos/5966539/pexels-photo-5966539.jpeg'
);

-- 27. JABUTICABEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Jabuticabeira',
  'Plinia cauliflora',
  'Myrtaceae',
  8, 10,
  'Árvore com flores e frutos caulifloros (nascem direto no tronco e galhos). Fruto negro-roxo muito apreciado, polpa branca doce. Alta concentração de antioxidantes (antocianinas). Árvore longeva (70+ anos produzindo).',
  'LC',
  '{"temperature": [18, 26], "rainfall": [1200, 1800], "humidity": [65, 80], "soil": "deep-fertile-acidic"}'::jsonb,
  '⚪',
  '67b0ab0a-6fbb-4884-8abb-23f64782e017',
  ARRAY['Abelhas', 'Moscas'],
  ARRAY['Alimentício', 'Medicinal', 'Ornamental', 'Cosmético'],
  'Setembro a Novembro (até 4 safras/ano)',
  'Rica em antioxidantes (antocianinas). Casca com taninos. Pode produzir múltiplas safras por ano.',
  'Geleia, licor, vinho, suco, sorvete - frutos devem ser consumidos em 48h após colhidos',
  'Único no mundo - frutos nascem direto no tronco. Pode produzir até 4 safras por ano. Árvore pode viver 100+ anos.',
  'https://images.pexels.com/photos/4750864/pexels-photo-4750864.jpeg'
);

-- 28. IMBUIA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Imbuia',
  'Ocotea porosa',
  'Lauraceae',
  10, 12,
  'Árvore de madeira nobre ameaçada de extinção. Flores pequenas amarelo-esverdeadas aromáticas. Madeira amarelo-parda de alta densidade, resistente e durável, usada em móveis finos, instrumentos musicais e construção naval.',
  'EN',
  '{"temperature": [14, 22], "rainfall": [1400, 2000], "humidity": [70, 85], "soil": "deep-well-drained"}'::jsonb,
  '🟢',
  'cd7442d5-3745-4df6-a4b9-8ea89e523005',
  ARRAY['Abelhas', 'Besouros'],
  ARRAY['Madeira nobre', 'Conservação', 'Móveis de luxo', 'Instrumentos'],
  'Fevereiro a Abril',
  'Ameaçada pela exploração madeireira. Madeira de lei classe A. Crescimento lento (50 anos para maturidade). Corte proibido.',
  'Madeira considerada uma das mais belas do Brasil. Usada em móveis de luxo e pianos. Proibido corte desde 1992.',
  'https://images.pexels.com/photos/5491063/pexels-photo-5491063.jpeg'
);

-- 29. GUABIROBA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, receitas, image_url
) VALUES (
  'Guabiroba',
  'Campomanesia xanthocarpa',
  'Myrtaceae',
  9, 11,
  'Árvore de pequeno porte com flores brancas perfumadas e vistosas. Fruto amarelo aromático consumido in natura. Folhas e frutos com propriedades medicinais (anti-inflamatória, antioxidante, hipoglicemiante).',
  'LC',
  '{"temperature": [16, 24], "rainfall": [1200, 1800], "humidity": [65, 80], "soil": "well-drained"}'::jsonb,
  '⚪',
  'cd7442d5-3745-4df6-a4b9-8ea89e523005',
  ARRAY['Abelhas'],
  ARRAY['Alimentício', 'Medicinal', 'Reflorestamento', 'Apícola'],
  'Dezembro a Fevereiro',
  'Excelente melífera. Frutos importantes para avifauna. Propriedades antidiabéticas comprovadas cientificamente.',
  'Chá das folhas para diabetes, hipertensão, problemas urinários. Frutos antioxidantes.',
  'Geleia de guabiroba, suco, licor, sorvete',
  'https://images.pexels.com/photos/6157972/pexels-photo-6157972.jpeg'
);

-- 30. PITANGUEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, receitas, curiosidade, image_url
) VALUES (
  'Pitangueira',
  'Eugenia uniflora',
  'Myrtaceae',
  8, 10,
  'Árvore de pequeno porte com flores brancas delicadas e perfumadas. Fruto vermelho (ou laranja, amarelo, preto) rico em vitamina C (25mg/100g), vitamina A e licopeno. Amplamente cultivada em quintais.',
  'LC',
  '{"temperature": [18, 28], "rainfall": [1000, 1800], "humidity": [60, 80], "soil": "fertile"}'::jsonb,
  '⚪',
  '67b0ab0a-6fbb-4884-8abb-23f64782e017',
  ARRAY['Abelhas', 'Borboletas'],
  ARRAY['Alimentício', 'Medicinal', 'Ornamental', 'Cerca viva'],
  'Novembro a Janeiro',
  'Muito cultivada em áreas urbanas. Atrai avifauna. Folhas repelem insetos. Frutifica abundantemente.',
  'Folhas para pressão alta, febre, reumatismo, diarreias. Chá digestivo e antioxidante.',
  'Suco, geleia, sorvete, licor, mousse - frutos devem ser consumidos maduros',
  'Frutos podem ser vermelhos, alaranjados, amarelos ou pretos (mais raros). Folhas aromáticas espantam mosquitos.',
  'https://images.pexels.com/photos/4751015/pexels-photo-4751015.jpeg'
);

-- Criar índices adicionais para melhor performance
CREATE INDEX IF NOT EXISTS idx_plantas_familia ON plantas(family);
CREATE INDEX IF NOT EXISTS idx_plantas_conservacao ON plantas(conservation_status);
CREATE INDEX IF NOT EXISTS idx_plantas_bloom_period ON plantas(bloom_start, bloom_end);

-- Atualizar estatísticas
ANALYZE plantas;
ANALYZE regioes;