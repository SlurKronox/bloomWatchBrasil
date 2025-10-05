/*
  # Extended Plants and Regions Data for BloomWatch v1.1
  
  1. New Data
    - Adds 15 additional native Brazilian plants with detailed information
    - Adds 10 new regions across Brazil (Pantanal, Pampas, Cerrado areas, etc.)
    - Includes optimal conditions, bloom periods, and geographical data
  
  2. Data Quality
    - All plants include scientific names, families, and conservation status
    - Region data includes climate zones and biodiversity characteristics
    - Bloom periods based on actual botanical research
  
  3. Updates
    - Updates existing regions with new attributes
    - Updates existing plants with extended metadata
*/

-- Update existing regions with new attributes
UPDATE regioes SET 
  state = 'CE/PI',
  climate_zone = 'semi_arid',
  biodiversity_index = 8.2
WHERE nome = 'Sertão Central';

UPDATE regioes SET 
  state = 'CE/PI',
  climate_zone = 'semi_arid_transition',
  biodiversity_index = 8.7
WHERE nome = 'Serra da Ibiapaba';

UPDATE regioes SET 
  state = 'BA/PE',
  climate_zone = 'semi_arid',
  biodiversity_index = 8.5
WHERE nome = 'Vale do São Francisco';

-- Update existing plants with extended metadata
UPDATE plantas SET 
  family = 'Fabaceae',
  bloom_start = 11,
  bloom_end = 2,
  optimal_conditions = '{"temperature": [22, 32], "rainfall": [400, 800], "humidity": [50, 70], "soil": "dry"}'::jsonb,
  conservation_status = 'LC',
  image_url = 'https://images.pexels.com/photos/1048036/pexels-photo-1048036.jpeg'
WHERE nome = 'Catingueira';

UPDATE plantas SET 
  family = 'Cactaceae',
  bloom_start = 11,
  bloom_end = 1,
  optimal_conditions = '{"temperature": [22, 38], "rainfall": [300, 700], "humidity": [35, 55], "soil": "sandy"}'::jsonb,
  conservation_status = 'LC',
  image_url = 'https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg'
WHERE nome = 'Mandacaru';

UPDATE plantas SET 
  family = 'Rhamnaceae',
  bloom_start = 10,
  bloom_end = 2,
  optimal_conditions = '{"temperature": [24, 35], "rainfall": [300, 800], "humidity": [40, 60], "soil": "dry"}'::jsonb,
  conservation_status = 'LC',
  image_url = 'https://images.pexels.com/photos/1048036/pexels-photo-1048036.jpeg'
WHERE nome = 'Juazeiro';

-- Insert 10 additional regions
INSERT INTO regioes (nome, latitude, longitude, state, climate_zone, biodiversity_index, descricao) VALUES
  ('Pantanal Sul-Mato-Grossense', -19.5, -57.0, 'MS', 'tropical_wet_dry', 9.8, 'Maior planície alagável do mundo com biodiversidade excepcional. Pulso de inundação anual determina ciclos ecológicos.'),
  ('Pampas Gaúchos', -30.5, -54.0, 'RS', 'subtropical_humid', 8.5, 'Campos sulinos com vegetação campestre nativa. Rica em gramíneas e espécies herbáceas adaptadas ao frio.'),
  ('Floresta de Araucárias', -27.2, -50.5, 'SC', 'subtropical_highland', 9.2, 'Floresta ombrófila mista com pinheiro-brasileiro. Clima temperado com geadas frequentes no inverno.'),
  ('Restinga Fluminense', -22.9, -42.0, 'RJ', 'tropical_coastal', 8.8, 'Vegetação costeira de areias quartzosas. Adaptada a solos pobres, salinidade e ventos fortes.'),
  ('Cerrado do Tocantins', -10.2, -48.3, 'TO', 'tropical_savanna', 9.0, 'Cerrado de transição com o Amazonas. Grande diversidade de espécies lenhosas e herbáceas.'),
  ('Chapada dos Veadeiros', -14.1, -47.5, 'GO', 'tropical_altitude', 9.5, 'Cerrado de altitude com formações rupestres. Endemismo elevado e nascentes de importantes rios.'),
  ('Vale do Ribeira', -24.5, -48.0, 'SP', 'tropical_rainforest', 9.7, 'Maior remanescente contínuo de Mata Atlântica. Altíssima pluviosidade e biodiversidade.'),
  ('Caatinga do Seridó', -6.5, -37.0, 'RN', 'semi_arid', 7.8, 'Caatinga hiperxerófila com vegetação arbustiva densa. Adaptada a longos períodos de estiagem.'),
  ('Litoral Amazônico', 2.0, -50.5, 'AP', 'equatorial_coastal', 9.6, 'Transição entre Amazônia e manguezais. Influência de marés e rios amazônicos.'),
  ('Campos Rupestres', -18.5, -43.5, 'MG', 'tropical_altitude', 9.3, 'Vegetação sobre afloramentos rochosos em altitude. Alto endemismo e adaptações únicas.');

-- Get region IDs for inserting plants
DO $$
DECLARE
  cerrado_id uuid;
  pantanal_id uuid;
  caatinga_id uuid;
  pampas_id uuid;
  araucaria_id uuid;
  restinga_id uuid;
BEGIN
  SELECT id INTO cerrado_id FROM regioes WHERE nome = 'Cerrado do Tocantins';
  SELECT id INTO pantanal_id FROM regioes WHERE nome = 'Pantanal Sul-Mato-Grossense';
  SELECT id INTO caatinga_id FROM regioes WHERE nome = 'Caatinga do Seridó';
  SELECT id INTO pampas_id FROM regioes WHERE nome = 'Pampas Gaúchos';
  SELECT id INTO araucaria_id FROM regioes WHERE nome = 'Floresta de Araucárias';
  SELECT id INTO restinga_id FROM regioes WHERE nome = 'Restinga Fluminense';

  -- Insert 15 additional native plants
  INSERT INTO plantas (nome, nome_cientifico, family, bloom_start, bloom_end, descricao, optimal_conditions, conservation_status, image_url, cor_flor, regiao_id) VALUES
    ('Pau-santo', 'Kielmeyera coriacea', 'Calophyllaceae', 7, 9, 'Árvore do Cerrado com flores amarelas aromáticas, atraindo diversos polinizadores. Importante para a medicina tradicional.', '{"temperature": [18, 28], "rainfall": [1200, 1600], "humidity": [60, 75], "soil": "well-drained"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1048036/pexels-photo-1048036.jpeg', '🟡', cerrado_id),
    ('Barbatimão', 'Stryphnodendron adstringens', 'Fabaceae', 9, 11, 'Árvore medicinal com flores brancas em espigas. Casca rica em taninos, usada na medicina popular.', '{"temperature": [20, 30], "rainfall": [1000, 1500], "humidity": [55, 70], "soil": "acidic"}'::jsonb, 'NT', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg', '⚪', cerrado_id),
    ('Quaresmeira', 'Tibouchina granulosa', 'Melastomataceae', 2, 4, 'Árvore ornamental com flores roxas vistosas durante a Quaresma. Popular em paisagismo urbano.', '{"temperature": [15, 25], "rainfall": [1400, 2000], "humidity": [70, 85], "soil": "acidic"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg', '🟣', cerrado_id),
    ('Paratudo', 'Tabebuia aurea', 'Bignoniaceae', 6, 8, 'Árvore do Pantanal com flores amarelas douradas. Floresce na época seca, criando paisagens espetaculares.', '{"temperature": [22, 32], "rainfall": [1000, 1400], "humidity": [60, 80], "soil": "varied"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1166986/pexels-photo-1166986.jpeg', '🟡', pantanal_id),
    ('Piúva-rosa', 'Handroanthus impetiginosus', 'Bignoniaceae', 7, 9, 'Ipê rosa adaptado a regiões alagadas. Flores rosas a roxas em grande quantidade.', '{"temperature": [20, 30], "rainfall": [1200, 1800], "humidity": [65, 85], "soil": "flooded"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg', '🌸', pantanal_id),
    ('Aroeira-do-sertão', 'Myracrodruon urundeuva', 'Anacardiaceae', 8, 10, 'Árvore resistente à seca com flores branco-esverdeadas. Madeira valiosa e propriedades medicinais.', '{"temperature": [25, 36], "rainfall": [400, 900], "humidity": [40, 65], "soil": "rocky"}'::jsonb, 'EN', 'https://images.pexels.com/photos/1166986/pexels-photo-1166986.jpeg', '⚪', caatinga_id),
    ('Unha-de-gato', 'Acacia bonariensis', 'Fabaceae', 9, 11, 'Arbusto espinhoso com flores amarelas em pompons. Importante para fixação de nitrogênio.', '{"temperature": [12, 24], "rainfall": [1000, 1400], "humidity": [65, 80], "soil": "well-drained"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1048036/pexels-photo-1048036.jpeg', '🟡', pampas_id),
    ('Canela-do-brejo', 'Ocotea pulchella', 'Lauraceae', 10, 12, 'Árvore de matas ciliares com flores pequenas e aromáticas. Importante para fauna.', '{"temperature": [14, 22], "rainfall": [1200, 1600], "humidity": [70, 85], "soil": "humid"}'::jsonb, 'NT', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg', '🟢', pampas_id),
    ('Pinheiro-brasileiro', 'Araucaria angustifolia', 'Araucariaceae', 9, 11, 'Conífera nativa com estróbilos masculinos e femininos. Espécie-símbolo do Sul do Brasil.', '{"temperature": [12, 20], "rainfall": [1400, 2000], "humidity": [75, 90], "soil": "deep"}'::jsonb, 'CR', 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg', '🟤', araucaria_id),
    ('Imbuia', 'Ocotea porosa', 'Lauraceae', 10, 12, 'Árvore de madeira nobre com flores discretas. Crítica para o ecossistema da floresta de araucárias.', '{"temperature": [13, 21], "rainfall": [1500, 2200], "humidity": [75, 90], "soil": "fertile"}'::jsonb, 'EN', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg', '🟢', araucaria_id),
    ('Aroeira-da-praia', 'Schinus terebinthifolius', 'Anacardiaceae', 11, 1, 'Arbusto pioneiro de restingas com flores pequenas e frutos vermelhos. Resistente à salinidade.', '{"temperature": [20, 28], "rainfall": [1000, 1600], "humidity": [75, 90], "soil": "sandy"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1166986/pexels-photo-1166986.jpeg', '⚪', restinga_id),
    ('Clusia', 'Clusia fluminensis', 'Clusiaceae', 12, 2, 'Planta rupícola com flores brancas e rosadas. Adaptada a solos pobres e ventos litorâneos.', '{"temperature": [22, 30], "rainfall": [1200, 2000], "humidity": [70, 85], "soil": "poor"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg', '⚪', restinga_id),
    ('Pitanga-da-praia', 'Eugenia selloi', 'Myrtaceae', 10, 12, 'Arbusto de restinga com flores brancas e frutos comestíveis. Importante para aves.', '{"temperature": [20, 28], "rainfall": [1100, 1700], "humidity": [70, 85], "soil": "sandy"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1048036/pexels-photo-1048036.jpeg', '⚪', restinga_id),
    ('Ipê-amarelo-do-cerrado', 'Handroanthus ochraceus', 'Bignoniaceae', 6, 8, 'Ipê de pequeno porte típico do Cerrado. Flores amarelas vibrantes no período seco.', '{"temperature": [18, 30], "rainfall": [1000, 1600], "humidity": [55, 75], "soil": "well-drained"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1166986/pexels-photo-1166986.jpeg', '🟡', cerrado_id),
    ('Caliandra', 'Calliandra brevipes', 'Fabaceae', 9, 12, 'Arbusto com flores vermelhas em forma de pompons. Atrai beija-flores e borboletas.', '{"temperature": [18, 28], "rainfall": [1200, 1800], "humidity": [60, 80], "soil": "varied"}'::jsonb, 'LC', 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg', '🔴', cerrado_id);
END $$;