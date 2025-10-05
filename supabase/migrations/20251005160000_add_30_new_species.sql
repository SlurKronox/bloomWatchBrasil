/*
  # Adição de 30 Novas Espécies Nativas Brasileiras

  ## Distribuição
    - 10 espécies do Cerrado
    - 10 espécies da Caatinga
    - 10 espécies da Mata Atlântica

  ## Campos Incluídos
    - Informações botânicas completas
    - Polinizadores específicos
    - Usos tradicionais e medicinais
    - Receitas e curiosidades
    - Importância ecológica
    - Condições ideais de cultivo
*/

-- ============================================
-- CERRADO (10 espécies)
-- ============================================

-- 1. PEQUI
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, image_url
) VALUES (
  'Pequi',
  'Caryocar brasiliense',
  'Caryocaraceae',
  9, 11,
  'Árvore símbolo do Cerrado, com flores amarelas visitadas por abelhas e morcegos. Fruto comestível rico em vitamina A, fundamental para a cultura e economia local. Madeira moderadamente pesada usada em construção civil.',
  'LC',
  '{"temperature": [22, 28], "rainfall": [1200, 1800], "humidity": [50, 70], "soil": "deep-well-drained"}'::jsonb,
  '🟡',
  'b37cd690-b4b4-43af-905e-36439a5258a9',
  ARRAY['Abelhas nativas', 'Morcegos', 'Beija-flores'],
  ARRAY['Alimentício', 'Medicinal', 'Óleo cosmético', 'Madeira'],
  'Novembro a Fevereiro',
  'Fundamental para fauna do Cerrado. Alimenta mais de 70 espécies de animais.',
  'https://br.pinterest.com/pin/27866091424279509/'
);

-- 2. JATOBÁ-DO-CERRADO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, image_url
) VALUES (
  'Jatobá-do-Cerrado',
  'Hymenaea stigonocarpa',
  'Fabaceae',
  10, 12,
  'Árvore de grande porte com flores brancas perfumadas que abrem à noite. Fruto com polpa farinácea comestível, rico em ferro e cálcio. Casca usada medicinalmente para afecções respiratórias.',
  'LC',
  '{"temperature": [20, 27], "rainfall": [1000, 1600], "humidity": [45, 65], "soil": "well-drained-clay"}'::jsonb,
  '⚪',
  '64d87f53-db12-40da-a1b7-c5bfdcf8a3f7',
  ARRAY['Morcegos', 'Mariposas noturnas'],
  ARRAY['Alimentício', 'Medicinal', 'Madeira de lei', 'Artesanato'],
  'Julho a Setembro',
  'Resina fossilizada forma copal. Espécie-chave para dispersão de sementes por antas e veados.',
  'https://images.pexels.com/photos/4505457/pexels-photo-4505457.jpeg'
);

-- 3. BARU
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, image_url
) VALUES (
  'Baru',
  'Dipteryx alata',
  'Fabaceae',
  8, 10,
  'Árvore majestosa com flores roxas aromáticas. Produz castanhas nutritivas (40% proteína) e óleo comestível de alta qualidade. Madeira extremamente dura e resistente a cupins.',
  'NT',
  '{"temperature": [22, 26], "rainfall": [1200, 1600], "humidity": [50, 70], "soil": "deep-fertile"}'::jsonb,
  '🟣',
  'b37cd690-b4b4-43af-905e-36439a5258a9',
  ARRAY['Abelhas mamangavas', 'Abelhas carpinteiras'],
  ARRAY['Alimentício', 'Óleo', 'Reflorestamento', 'Madeira nobre'],
  'Setembro a Novembro',
  'Castanhas com valor nutricional superior à amêndoa. Raízes fixam nitrogênio no solo.',
  'Castanha torrada, paçoca de baru, baru caramelizado, óleo para culinária gourmet',
  'https://i.ytimg.com/vi/1yEliUKsfew/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDObM1K_mrQH6ygbKta2jjmBxlBXw'
);

-- 4. ARATICUM
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, image_url
) VALUES (
  'Araticum',
  'Annona crassiflora',
  'Annonaceae',
  9, 11,
  'Arbusto com flores grandes e carnosas de aroma adocicado. Fruto de polpa cremosa e aromática, consumido in natura e em doces. Rico em vitamina C (25mg/100g) e compostos antioxidantes.',
  'LC',
  '{"temperature": [20, 28], "rainfall": [1000, 1500], "humidity": [50, 65], "soil": "sandy-acidic"}'::jsonb,
  '🟢',
  '64d87f53-db12-40da-a1b7-c5bfdcf8a3f7',
  ARRAY['Besouros', 'Abelhas'],
  ARRAY['Alimentício', 'Medicinal', 'Cosméticos'],
  'Janeiro a Março',
  'Polinização por besouros (cantarofilia). Sementes dispersas por lobos-guará e raposas.',
  'Sorvete de araticum, mousse, geleia, licor',
  'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg'
);

-- 5. MANGABA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, image_url
) VALUES (
  'Mangaba',
  'Hancornia speciosa',
  'Apocynaceae',
  9, 11,
  'Árvore de pequeno porte com flores brancas perfumadas. Fruto suculento e aromático, consumido in natura, em sucos e sorvetes. Látex usado na indústria de borracha e gomas.',
  'VU',
  '{"temperature": [22, 28], "rainfall": [800, 1400], "humidity": [50, 70], "soil": "sandy"}'::jsonb,
  '⚪',
  'b37cd690-b4b4-43af-905e-36439a5258a9',
  ARRAY['Abelhas', 'Borboletas', 'Mariposas'],
  ARRAY['Alimentício', 'Látex', 'Medicinal', 'Cosmético'],
  'Novembro a Janeiro',
  'Vulnerável devido ao extrativismo predatório. Importante fonte de renda para comunidades tradicionais.',
  'Suco de mangaba, sorvete, licor, doce em calda',
  'https://images.pexels.com/photos/5966428/pexels-photo-5966428.jpeg'
);

-- 6. CAGAITA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, image_url
) VALUES (
  'Cagaita',
  'Eugenia dysenterica',
  'Myrtaceae',
  8, 10,
  'Árvore com flores brancas delicadas e perfumadas. Fruto amarelo-alaranjado consumido fresco e em doces. Nome popular devido às propriedades laxativas quando consumido verde. Rico em vitamina C.',
  'LC',
  '{"temperature": [20, 26], "rainfall": [1200, 1600], "humidity": [50, 70], "soil": "acidic"}'::jsonb,
  '⚪',
  '64d87f53-db12-40da-a1b7-c5bfdcf8a3f7',
  ARRAY['Abelhas nativas', 'Abelhas europeias', 'Moscas'],
  ARRAY['Alimentício', 'Medicinal', 'Apícola'],
  'Outubro a Dezembro',
  'Excelente melífera. Flores produzem néctar abundante. Frutos importantes para avifauna.',
  'Geleia de cagaita, suco, picolé, licor',
  'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg'
);

-- 7. LOBEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Lobeira',
  'Solanum lycocarpum',
  'Solanaceae',
  10, 3,
  'Arbusto robusto com flores roxas vistosas. Fruto verde-amarelado, alimento principal do lobo-guará (daí o nome). Planta medicinal tradicional para diabetes, reumatismo e obesidade.',
  'LC',
  '{"temperature": [18, 26], "rainfall": [1000, 1500], "humidity": [50, 65], "soil": "sandy"}'::jsonb,
  '🟣',
  'b37cd690-b4b4-43af-905e-36439a5258a9',
  ARRAY['Mamangavas', 'Abelhas solitárias'],
  ARRAY['Medicinal', 'Alimentação fauna', 'Pesquisa farmacológica'],
  'Ano todo (pico Março-Junho)',
  'Relação simbiótica com lobo-guará: animal dispersa sementes que germinam melhor após passar pelo trato digestivo.',
  'Lobo-guará pode consumir até 50 frutos por dia. Sementes germinam 90% melhor após digestão pelo animal.',
  'https://images.pexels.com/photos/5743288/pexels-photo-5743288.jpeg'
);

-- 8. SUCUPIRA-BRANCA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, image_url
) VALUES (
  'Sucupira-Branca',
  'Pterodon emarginatus',
  'Fabaceae',
  8, 10,
  'Árvore com flores rosadas em cachos vistosos. Sementes oleaginosas com propriedades anti-inflamatórias comprovadas cientificamente. Madeira de lei resistente e durável.',
  'LC',
  '{"temperature": [20, 27], "rainfall": [1100, 1600], "humidity": [50, 70], "soil": "well-drained"}'::jsonb,
  '🌸',
  '64d87f53-db12-40da-a1b7-c5bfdcf8a3f7',
  ARRAY['Abelhas', 'Borboletas', 'Vespas'],
  ARRAY['Medicinal', 'Madeira', 'Óleo terapêutico', 'Fitoterapia'],
  'Maio a Agosto',
  'Óleo das sementes contém diterpenos com ação anti-inflamatória, analgésica e antirreumática.',
  'Tratamento de artrite, artrose, reumatismo, dores musculares. Óleo usado em massagens terapêuticas.',
  'https://images.pexels.com/photos/4750659/pexels-photo-4750659.jpeg'
);

-- 9. CAPITÃO-DO-MATO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, image_url
) VALUES (
  'Capitão-do-Mato',
  'Terminalia argentea',
  'Combretaceae',
  9, 11,
  'Árvore majestosa com folhas prateadas que brilham ao vento. Flores pequenas melíferas em espigas. Madeira de alta densidade (0,85 g/cm³) e resistência, usada em construção civil e naval.',
  'LC',
  '{"temperature": [22, 28], "rainfall": [1200, 1800], "humidity": [50, 70], "soil": "deep"}'::jsonb,
  '⚪',
  'b37cd690-b4b4-43af-905e-36439a5258a9',
  ARRAY['Abelhas nativas', 'Moscas', 'Vespas'],
  ARRAY['Madeira nobre', 'Reflorestamento', 'Medicinal', 'Paisagismo'],
  'Junho a Agosto',
  'Excelente para recuperação de áreas degradadas. Folhas argenteas reduzem transpiração. Sistema radicular profundo.',
  'https://images.pexels.com/photos/5490915/pexels-photo-5490915.jpeg'
);

-- 10. BARBATIMÃO (atualizar existente se houver, ou inserir)
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, image_url
) VALUES (
  'Barbatimão',
  'Stryphnodendron adstringens',
  'Fabaceae',
  10, 12,
  'Árvore com flores em espigas cilíndricas amarelas perfumadas. Casca com alto teor de tanino (20-30%), amplamente usada na medicina popular para cicatrização de feridas, úlceras e inflamações.',
  'LC',
  '{"temperature": [20, 26], "rainfall": [1000, 1500], "humidity": [50, 65], "soil": "acidic"}'::jsonb,
  '🟡',
  '64d87f53-db12-40da-a1b7-c5bfdcf8a3f7',
  ARRAY['Abelhas', 'Vespas'],
  ARRAY['Medicinal', 'Tanino', 'Reflorestamento', 'Fitoterapia'],
  'Maio a Julho',
  'Planta medicinal validada cientificamente. Ação cicatrizante, adstringente, antimicrobiana e anti-inflamatória.',
  'Cicatrização de feridas, úlceras gástricas, leucorreia, inflamações de garganta. Uso tópico e interno.',
  'https://images.pexels.com/photos/6157691/pexels-photo-6157691.jpeg'
) ON CONFLICT DO NOTHING;

-- ============================================
-- CAATINGA (10 espécies)
-- ============================================

-- 11. ANGICO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, image_url
) VALUES (
  'Angico',
  'Anadenanthera colubrina',
  'Fabaceae',
  9, 11,
  'Árvore de grande porte com flores brancas perfumadas em espigas globosas. Excelente para apicultura. Casca medicinal rica em taninos. Madeira nobre avermelhada, resistente e durável.',
  'LC',
  '{"temperature": [22, 30], "rainfall": [500, 1000], "humidity": [45, 65], "soil": "well-drained"}'::jsonb,
  '⚪',
  '731cffa5-6c58-4e2a-8649-c9ad21ba54dc',
  ARRAY['Abelhas', 'Borboletas', 'Besouros'],
  ARRAY['Medicinal', 'Madeira', 'Reflorestamento', 'Apícola', 'Tanino'],
  'Junho a Setembro',
  'Fixa nitrogênio no solo. Floração abundante atrai polinizadores. Mel de angico é premium. Madeira classe A.',
  'Casca para tosse, bronquite, inflamações. Goma para diarreias. Banhos para problemas de pele.',
  'https://images.pexels.com/photos/6157325/pexels-photo-6157325.jpeg'
);

-- 12. AROEIRA-DO-SERTÃO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, curiosidade, image_url
) VALUES (
  'Aroeira-do-Sertão',
  'Myracrodruon urundeuva',
  'Anacardiaceae',
  9, 10,
  'Árvore majestosa, madeira mais pesada do Brasil (1,2 g/cm³). Flores pequenas esverdeadas visitadas por abelhas. Casca medicinal com propriedades anti-inflamatórias e cicatrizantes. Ameaçada pela exploração madeireira.',
  'EN',
  '{"temperature": [24, 32], "rainfall": [400, 900], "humidity": [40, 60], "soil": "rocky"}'::jsonb,
  '🟢',
  'cb503cfc-28e0-4b4d-bb45-e408f4477f00',
  ARRAY['Abelhas nativas', 'Moscas'],
  ARRAY['Madeira nobre', 'Medicinal', 'Conservação', 'Construção'],
  'Agosto a Outubro',
  'Madeira praticamente indestrutível, resiste a cupins e umidade. Árvore símbolo do sertão. Ameaçada de extinção.',
  'Casca para úlceras, inflamações, leucorreia, problemas respiratórios. Banhos para doenças de pele.',
  'Madeira tão dura que é chamada de pau-ferro. Pode viver mais de 200 anos.',
  'https://images.pexels.com/photos/5490638/pexels-photo-5490638.jpeg'
);

-- 13. UMBUZEIRO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Umbuzeiro',
  'Spondias tuberosa',
  'Anacardiaceae',
  9, 11,
  'Árvore sagrada do sertão com raízes tuberosas gigantes que armazenam até 3.000 litros de água. Flores brancas aromáticas. Fruto ácido e suculento, essencial para economia familiar sertaneja.',
  'LC',
  '{"temperature": [24, 34], "rainfall": [300, 700], "humidity": [35, 55], "soil": "sandy-deep"}'::jsonb,
  '⚪',
  '45444965-bfe8-42f6-bdd2-3d060143fa54',
  ARRAY['Abelhas', 'Vespas'],
  ARRAY['Alimentício', 'Água (raízes)', 'Cultural', 'Econômico'],
  'Janeiro a Março',
  'Chamado de árvore sagrada do sertão e árvore da vida. Raízes armazenam água potável consumida por sertanejos e animais na seca.',
  'Umbuzada (umbu batido com leite), suco, geleia, compota, picolé, licor',
  'Uma única árvore pode produzir 300kg de frutos e suas raízes podem armazenar até 3 toneladas de água.',
  'https://images.pexels.com/photos/5966847/pexels-photo-5966847.jpeg'
);

-- 14. BARAÚNA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Baraúna',
  'Schinopsis brasiliensis',
  'Anacardiaceae',
  10, 12,
  'Árvore endêmica da Caatinga com madeira extremamente dura (1,1 g/cm³) e resistente. Flores pequenas melíferas. Espécie criticamente ameaçada pela exploração madeireira histórica.',
  'EN',
  '{"temperature": [24, 32], "rainfall": [400, 800], "humidity": [40, 60], "soil": "rocky-shallow"}'::jsonb,
  '🟢',
  'cb503cfc-28e0-4b4d-bb45-e408f4477f00',
  ARRAY['Abelhas nativas'],
  ARRAY['Madeira nobre', 'Conservação', 'Tanino'],
  'Maio a Julho',
  'Endêmica da Caatinga, quase extinta. Madeira tão dura que quebra machados. Alto teor de tanino na casca. Prioritária para conservação.',
  'Nome vem do tupi ibá-raúna (árvore preta). Madeira afunda na água devido à densidade.',
  'https://images.pexels.com/photos/5490729/pexels-photo-5490729.jpeg'
);

-- 15. MULUNGU
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, curiosidade, image_url
) VALUES (
  'Mulungu',
  'Erythrina velutina',
  'Fabaceae',
  8, 10,
  'Árvore com floração espetacular vermelha-alaranjada visitada por beija-flores. Cascas, flores e sementes com propriedades sedativas, calmantes e hipotensoras cientificamente comprovadas.',
  'LC',
  '{"temperature": [22, 30], "rainfall": [500, 1000], "humidity": [45, 65], "soil": "well-drained"}'::jsonb,
  '🔴',
  '45444965-bfe8-42f6-bdd2-3d060143fa54',
  ARRAY['Beija-flores', 'Abelhas mamangavas'],
  ARRAY['Medicinal', 'Ornamental', 'Sombra', 'Cerca viva'],
  'Setembro a Novembro',
  'Importante para beija-flores. Fixa nitrogênio no solo. Flores fornecem néctar abundante.',
  'Calmante natural, ansiedade, insônia, hipertensão. Chá da casca usado milenarmente por indígenas.',
  'Árvore sagrada para vários povos indígenas. Sementes vermelhas tóxicas usadas em artesanato.',
  'https://images.pexels.com/photos/4750437/pexels-photo-4750437.jpeg'
);

-- 16. CATINGUEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, image_url
) VALUES (
  'Catingueira',
  'Poincianella pyramidalis',
  'Fabaceae',
  11, 1,
  'Árvore típica da Caatinga com flores amarelas vistosas. Espécie indicadora do bioma - onde há catingueira, há Caatinga legítima. Folhagem forrageira importante para caprinos e ovinos na seca.',
  'LC',
  '{"temperature": [24, 32], "rainfall": [400, 800], "humidity": [40, 60], "soil": "shallow-rocky"}'::jsonb,
  '🟡',
  '731cffa5-6c58-4e2a-8649-c9ad21ba54dc',
  ARRAY['Abelhas', 'Borboletas'],
  ARRAY['Forrageiro', 'Lenha', 'Medicinal', 'Ecológico'],
  'Julho a Setembro',
  'Espécie indicadora da Caatinga. Folhas e vagens nutritivas para caprinos. Lenha de excelente qualidade.',
  'Casca para diarreias e infecções. Folhas para febre e dores.',
  'https://images.pexels.com/photos/6157588/pexels-photo-6157588.jpeg'
);

-- 17. QUIXABEIRA
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, curiosidade, image_url
) VALUES (
  'Quixabeira',
  'Sideroxylon obtusifolium',
  'Sapotaceae',
  10, 12,
  'Árvore de crescimento lento com madeira extremamente nobre e pesada. Flores pequenas esbranquiçadas muito melíferas. Fruto comestível doce apreciado pela fauna e população local.',
  'LC',
  '{"temperature": [24, 30], "rainfall": [500, 900], "humidity": [45, 60], "soil": "well-drained"}'::jsonb,
  '⚪',
  'cb503cfc-28e0-4b4d-bb45-e408f4477f00',
  ARRAY['Abelhas nativas'],
  ARRAY['Madeira nobre', 'Alimentício', 'Medicinal', 'Apícola'],
  'Janeiro a Março',
  'Madeira de lei usada em construção civil e naval. Mel de quixabeira é considerado medicinal.',
  'Pode viver mais de 150 anos. Madeira tão pesada que afunda na água.',
  'https://images.pexels.com/photos/5490851/pexels-photo-5490851.jpeg'
);

-- 18. IMBURANA-DE-CHEIRO
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, curiosidade, image_url
) VALUES (
  'Imburana-de-Cheiro',
  'Amburana cearensis',
  'Fabaceae',
  9, 11,
  'Árvore com madeira aromática (cumarina) usada em perfumaria, cachaça e artesanato. Flores brancas perfumadas. Casca medicinal tradicional para problemas respiratórios. Ameaçada de extinção.',
  'VU',
  '{"temperature": [24, 31], "rainfall": [500, 900], "humidity": [45, 65], "soil": "deep"}'::jsonb,
  '⚪',
  '45444965-bfe8-42f6-bdd2-3d060143fa54',
  ARRAY['Abelhas', 'Borboletas'],
  ARRAY['Medicinal', 'Aromática', 'Madeira', 'Cachaça especial'],
  'Agosto a Outubro',
  'Vulnerável pela extração de madeira para cachaça. Aroma doce característico de cumarina. Prioritária para conservação.',
  'Casca para tosse, bronquite, asma, rouquidão. Chá expectorante e broncodilatador.',
  'Madeira usada em tonéis para envelhecer cachaça premium, conferindo aroma doce e cor dourada.',
  'https://images.pexels.com/photos/6157844/pexels-photo-6157844.jpeg'
);

-- 19. MANDACARU (atualizar se existir)
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, receitas, curiosidade, image_url
) VALUES (
  'Mandacaru',
  'Cereus jamacaru',
  'Cactaceae',
  1, 3,
  'Cacto emblemático da Caatinga com flores brancas grandes (até 30cm) que abrem à noite. Fruto comestível vermelho-arroxeado. Cladódios forrageiros queimados para alimentação de gado na seca. Símbolo de resistência sertaneja.',
  'LC',
  '{"temperature": [25, 35], "rainfall": [300, 600], "humidity": [30, 50], "soil": "rocky-poor"}'::jsonb,
  '⚪',
  '731cffa5-6c58-4e2a-8649-c9ad21ba54dc',
  ARRAY['Morcegos', 'Mariposas', 'Abelhas'],
  ARRAY['Alimentício', 'Forrageiro', 'Ornamental', 'Cultural'],
  'Março a Maio',
  'Polinização noturna por morcegos e mariposas. Frutos e cladódios alimentam fauna na seca. Imortalizado na música de Luiz Gonzaga.',
  'Doce de mandacaru, suco do fruto',
  'Pode crescer até 10m de altura e viver mais de 100 anos. Floresce antes das primeiras chuvas, prevendo o fim da seca.',
  'https://images.pexels.com/photos/4505114/pexels-photo-4505114.jpeg'
) ON CONFLICT DO NOTHING;

-- 20. JUAZEIRO (atualizar se existir)
INSERT INTO plantas (
  nome, nome_cientifico, family, bloom_start, bloom_end, descricao,
  conservation_status, optimal_conditions, cor_flor, regiao_id,
  polinizadores, usos, epoca_frutificacao, importancia_ecologica, uso_medicinal, lenda, image_url
) VALUES (
  'Juazeiro',
  'Ziziphus joazeiro',
  'Rhamnaceae',
  11, 1,
  'Árvore sempre verde, símbolo de resistência da Caatinga. Flores pequenas amarelas muito visitadas por abelhas. Fruto rico em vitamina C. Casca e folhas com propriedades medicinais e saponáceas.',
  'LC',
  '{"temperature": [24, 32], "rainfall": [400, 800], "humidity": [40, 60], "soil": "rocky-shallow"}'::jsonb,
  '🟡',
  '45444965-bfe8-42f6-bdd2-3d060143fa54',
  ARRAY['Abelhas nativas', 'Abelhas africanizadas'],
  ARRAY['Alimentício', 'Medicinal', 'Forrageiro', 'Sabão natural'],
  'Março a Maio',
  'Única árvore que não perde folhas na seca. Fornece sombra e alimento para fauna o ano todo. Símbolo de esperança no sertão.',
  'Casca para problemas respiratórios, febre, reumatismo. Folhas como sabonete natural para cabelos.',
  'Dizem que debaixo de todo juazeiro há uma ossada, pois era árvore preferida para descanso dos viajantes no sertão.',
  'https://images.pexels.com/photos/4505930/pexels-photo-4505930.jpeg'
) ON CONFLICT DO NOTHING;

-- CONTINUA PARTE 2...