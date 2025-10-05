/*
  # Atualização de Coordenadas das Regiões v2.0

  ## Alterações
    - Atualização de coordenadas precisas para todas as 13 regiões
    - Adição de informações de estado e bioma
    - Coordenadas baseadas em pontos geográficos reais

  ## Regiões Atualizadas
    1. Sertão Central do Ceará - Caatinga
    2. Serra da Ibiapaba - Transição
    3. Vale do São Francisco - Caatinga
    4. Pantanal Sul-Mato-Grossense
    5. Pampas Gaúchos
    6. Floresta de Araucárias
    7. Restinga Fluminense
    8. Cerrado do Tocantins
    9. Chapada dos Veadeiros
    10. Vale do Ribeira
    11. Caatinga do Seridó
    12. Litoral Amazônico
    13. Campos Rupestres
*/

-- Atualizar coordenadas e informações das regiões existentes

-- Sertão Central
UPDATE regioes 
SET 
  nome = 'Sertão Central do Ceará',
  latitude = -5.0892,
  longitude = -39.3208,
  state = 'Ceará',
  descricao = 'Região semiárida com vegetação de caatinga arbustiva-arbórea típica. Espécies adaptadas à seca prolongada.'
WHERE nome LIKE '%Sertão Central%';

-- Serra da Ibiapaba
UPDATE regioes 
SET 
  nome = 'Serra da Ibiapaba',
  latitude = -3.6547,
  longitude = -40.9158,
  state = 'Ceará',
  descricao = 'Área de transição entre Caatinga e Cerrado com altitude elevada e microclima úmido.'
WHERE nome LIKE '%Ibiapaba%';

-- Vale do São Francisco
UPDATE regioes 
SET 
  nome = 'Vale do São Francisco',
  latitude = -9.3889,
  longitude = -40.5056,
  state = 'Bahia/Pernambuco',
  descricao = 'Vale fértil do Rio São Francisco com caatinga ripária e áreas irrigadas.'
WHERE nome LIKE '%São Francisco%';

-- Pantanal Sul-Mato-Grossense
UPDATE regioes 
SET 
  latitude = -19.0019,
  longitude = -57.6525,
  state = 'Mato Grosso do Sul',
  descricao = 'Maior planície alagável do mundo com vegetação diversificada e ciclos de cheia e seca.'
WHERE nome LIKE '%Pantanal%';

-- Pampas Gaúchos
UPDATE regioes 
SET 
  latitude = -30.8813,
  longitude = -55.5497,
  state = 'Rio Grande do Sul',
  descricao = 'Campos naturais com vegetação herbácea e arbustiva, clima subtropical.'
WHERE nome LIKE '%Pampas%' OR nome LIKE '%Pampa%';

-- Floresta de Araucárias
UPDATE regioes 
SET 
  latitude = -26.2389,
  longitude = -50.5792,
  state = 'Paraná/Santa Catarina',
  descricao = 'Floresta Ombrófila Mista com predominância de Araucaria angustifolia, clima subtropical úmido.'
WHERE nome LIKE '%Araucária%';

-- Restinga Fluminense
UPDATE regioes 
SET 
  latitude = -22.9068,
  longitude = -43.1729,
  state = 'Rio de Janeiro',
  descricao = 'Vegetação de restinga costeira com formações herbáceas, arbustivas e arbóreas adaptadas a solos arenosos.'
WHERE nome LIKE '%Restinga%';

-- Cerrado do Tocantins
UPDATE regioes 
SET 
  latitude = -10.1753,
  longitude = -48.2982,
  state = 'Tocantins',
  descricao = 'Savana tropical com árvores tortuosas, rica biodiversidade e estações bem definidas.'
WHERE nome LIKE '%Cerrado%' AND nome LIKE '%Tocantins%';

-- Chapada dos Veadeiros
UPDATE regioes 
SET 
  latitude = -14.1411,
  longitude = -47.5219,
  state = 'Goiás',
  descricao = 'Chapada de altitude com cerrado rupestre, campos limpos e nascentes de rios importantes.'
WHERE nome LIKE '%Veadeiros%';

-- Vale do Ribeira
UPDATE regioes 
SET 
  latitude = -24.5078,
  longitude = -47.8433,
  state = 'São Paulo/Paraná',
  descricao = 'Maior remanescente contínuo de Mata Atlântica do Brasil com alta biodiversidade e espécies endêmicas.'
WHERE nome LIKE '%Ribeira%';

-- Caatinga do Seridó
UPDATE regioes 
SET 
  latitude = -6.6642,
  longitude = -36.7853,
  state = 'Rio Grande do Norte',
  descricao = 'Região semiárida com caatinga hiperxerófila, solos rasos e clima quente e seco.'
WHERE nome LIKE '%Seridó%';

-- Litoral Amazônico
UPDATE regioes 
SET 
  latitude = -0.0347,
  longitude = -51.0694,
  state = 'Amapá',
  descricao = 'Faixa costeira amazônica com manguezais, várzeas e floresta de terra firme.'
WHERE nome LIKE '%Litoral%' AND nome LIKE '%Amazônico%';

-- Campos Rupestres
UPDATE regioes 
SET 
  nome = 'Campos Rupestres da Bahia',
  latitude = -12.4639,
  longitude = -41.3858,
  state = 'Bahia',
  descricao = 'Vegetação de altitude sobre afloramentos rochosos com alto endemismo e plantas adaptadas a solos pobres.'
WHERE nome LIKE '%Campos Rupestres%';

-- Adicionar comentário
COMMENT ON TABLE regioes IS 'Regiões biogeográficas do Brasil com coordenadas precisas e informações climáticas';