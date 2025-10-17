-- =====================================================
-- SEED: Initial Locations and Countries Data
-- Description: Main vehicle producer countries (including
--              popular brands in Costa Rica like Volvo, 
--              British brands, etc.) and Costa Rica complete
--              territorial division (provinces and cantons)
-- =====================================================

-- =====================================================
-- VEHICLE PRODUCING COUNTRIES AND POPULAR BRANDS
-- =====================================================

INSERT INTO country (name, currency, currency_symbol, phone_code) VALUES
-- Top 10 vehicle producers in the world
('China', 'CNY', '¥', '+86'),
('Estados Unidos', 'USD', '$', '+1'),
('Japón', 'JPY', '¥', '+81'),
('India', 'INR', '₹', '+91'),
('Corea del Sur', 'KRW', '₩', '+82'),
('Alemania', 'EUR', '€', '+49'),
('México', 'MXN', '$', '+52'),
('España', 'EUR', '€', '+34'),
('Brasil', 'BRL', 'R$', '+55'),
('Tailandia', 'THB', '฿', '+66'),
-- Other important producers
('Francia', 'EUR', '€', '+33'),
('Italia', 'EUR', '€', '+39'),
('Reino Unido', 'GBP', '£', '+44'),
('Canadá', 'CAD', '$', '+1'),
('Turquía', 'TRY', '₺', '+90'),
('República Checa', 'CZK', 'Kč', '+420'),
('Suecia', 'SEK', 'kr', '+46'),
('Polonia', 'PLN', 'zł', '+48'),
('Eslovaquia', 'EUR', '€', '+421'),
('Rumania', 'RON', 'lei', '+40'),
-- Other countries with popular brands in Costa Rica
('Argentina', 'ARS', '$', '+54'),
('Países Bajos', 'EUR', '€', '+31'),
('Bélgica', 'EUR', '€', '+32'),
('Suiza', 'CHF', 'Fr', '+41'),
('Austria', 'EUR', '€', '+43'),
('Malasia', 'MYR', 'RM', '+60'),
('Indonesia', 'IDR', 'Rp', '+62'),
('Australia', 'AUD', '$', '+61'),
-- Costa Rica (with complete territorial data)
('Costa Rica', 'CRC', '₡', '+506');

-- =====================================================
-- COSTA RICA - PROVINCES (REGIONS)
-- =====================================================

-- Get Costa Rica's ID for relationships
DO $$
DECLARE
    costa_rica_id INTEGER;
    
    -- IDs for provinces
    san_jose_id INTEGER;
    alajuela_id INTEGER;
    cartago_id INTEGER;
    heredia_id INTEGER;
    puntarenas_id INTEGER;
    guanacaste_id INTEGER;
    limon_id INTEGER;
BEGIN
    -- Get Costa Rica's ID
    SELECT id INTO costa_rica_id FROM country WHERE name = 'Costa Rica';
    
    -- Insert provinces
    INSERT INTO region (country_id, name) VALUES
    (costa_rica_id, 'San José'),
    (costa_rica_id, 'Alajuela'),
    (costa_rica_id, 'Cartago'),
    (costa_rica_id, 'Heredia'),
    (costa_rica_id, 'Puntarenas'),
    (costa_rica_id, 'Guanacaste'),
    (costa_rica_id, 'Limón');
    
    -- Get the IDs of each province
    SELECT id INTO san_jose_id FROM region WHERE name = 'San José' AND country_id = costa_rica_id;
    SELECT id INTO alajuela_id FROM region WHERE name = 'Alajuela' AND country_id = costa_rica_id;
    SELECT id INTO cartago_id FROM region WHERE name = 'Cartago' AND country_id = costa_rica_id;
    SELECT id INTO heredia_id FROM region WHERE name = 'Heredia' AND country_id = costa_rica_id;
    SELECT id INTO puntarenas_id FROM region WHERE name = 'Puntarenas' AND country_id = costa_rica_id;
    SELECT id INTO guanacaste_id FROM region WHERE name = 'Guanacaste' AND country_id = costa_rica_id;
    SELECT id INTO limon_id FROM region WHERE name = 'Limón' AND country_id = costa_rica_id;
    
    -- =====================================================
    -- PROVINCE: SAN JOSÉ (20 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (san_jose_id, 'San José'),
    (san_jose_id, 'Escazú'),
    (san_jose_id, 'Desamparados'),
    (san_jose_id, 'Puriscal'),
    (san_jose_id, 'Tarrazú'),
    (san_jose_id, 'Aserrí'),
    (san_jose_id, 'Mora'),
    (san_jose_id, 'Goicoechea'),
    (san_jose_id, 'Santa Ana'),
    (san_jose_id, 'Alajuelita'),
    (san_jose_id, 'Vázquez de Coronado'),
    (san_jose_id, 'Acosta'),
    (san_jose_id, 'Tibás'),
    (san_jose_id, 'Moravia'),
    (san_jose_id, 'Montes de Oca'),
    (san_jose_id, 'Turrubares'),
    (san_jose_id, 'Dota'),
    (san_jose_id, 'Curridabat'),
    (san_jose_id, 'Pérez Zeledón'),
    (san_jose_id, 'León Cortés');
    
    -- =====================================================
    -- PROVINCE: ALAJUELA (16 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (alajuela_id, 'Alajuela'),
    (alajuela_id, 'San Ramón'),
    (alajuela_id, 'Grecia'),
    (alajuela_id, 'San Mateo'),
    (alajuela_id, 'Atenas'),
    (alajuela_id, 'Naranjo'),
    (alajuela_id, 'Palmares'),
    (alajuela_id, 'Poás'),
    (alajuela_id, 'Orotina'),
    (alajuela_id, 'San Carlos'),
    (alajuela_id, 'Zarcero'),
    (alajuela_id, 'Sarchí'),
    (alajuela_id, 'Upala'),
    (alajuela_id, 'Los Chiles'),
    (alajuela_id, 'Guatuso'),
    (alajuela_id, 'Río Cuarto');
    
    -- =====================================================
    -- PROVINCE: CARTAGO (8 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (cartago_id, 'Cartago'),
    (cartago_id, 'Paraíso'),
    (cartago_id, 'La Unión'),
    (cartago_id, 'Jiménez'),
    (cartago_id, 'Turrialba'),
    (cartago_id, 'Alvarado'),
    (cartago_id, 'Oreamuno'),
    (cartago_id, 'El Guarco');
    
    -- =====================================================
    -- PROVINCE: HEREDIA (10 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (heredia_id, 'Heredia'),
    (heredia_id, 'Barva'),
    (heredia_id, 'Santo Domingo'),
    (heredia_id, 'Santa Bárbara'),
    (heredia_id, 'San Rafael'),
    (heredia_id, 'San Isidro'),
    (heredia_id, 'Belén'),
    (heredia_id, 'Flores'),
    (heredia_id, 'San Pablo'),
    (heredia_id, 'Sarapiquí');
    
    -- =====================================================
    -- PROVINCE: PUNTARENAS (13 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (puntarenas_id, 'Puntarenas'),
    (puntarenas_id, 'Esparza'),
    (puntarenas_id, 'Buenos Aires'),
    (puntarenas_id, 'Montes de Oro'),
    (puntarenas_id, 'Osa'),
    (puntarenas_id, 'Quepos'),
    (puntarenas_id, 'Golfito'),
    (puntarenas_id, 'Coto Brus'),
    (puntarenas_id, 'Parrita'),
    (puntarenas_id, 'Corredores'),
    (puntarenas_id, 'Garabito'),
    (puntarenas_id, 'Monteverde'),
    (puntarenas_id, 'Puerto Jiménez');
    
    -- =====================================================
    -- PROVINCE: GUANACASTE (11 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (guanacaste_id, 'Liberia'),
    (guanacaste_id, 'Nicoya'),
    (guanacaste_id, 'Santa Cruz'),
    (guanacaste_id, 'Bagaces'),
    (guanacaste_id, 'Carrillo'),
    (guanacaste_id, 'Cañas'),
    (guanacaste_id, 'Abangares'),
    (guanacaste_id, 'Tilarán'),
    (guanacaste_id, 'Nandayure'),
    (guanacaste_id, 'La Cruz'),
    (guanacaste_id, 'Hojancha');
    
    -- =====================================================
    -- PROVINCE: LIMÓN (6 cantons)
    -- =====================================================
    INSERT INTO city (region_id, name) VALUES
    (limon_id, 'Limón'),
    (limon_id, 'Pococí'),
    (limon_id, 'Siquirres'),
    (limon_id, 'Talamanca'),
    (limon_id, 'Matina'),
    (limon_id, 'Guácimo');
    
END $$;

-- =====================================================
-- SUMMARY OF INSERTED DATA
-- =====================================================
-- Countries: 27 (26 producers + Costa Rica)
--   • Top 10 vehicle producers in the world
--   • European producers (Sweden/Volvo, UK, France, Italy, etc.)
--   • Emerging and specialized producers
--   • Costa Rica with complete territorial structure
-- Provinces of Costa Rica: 7
-- Cantons of Costa Rica: 84
-- =====================================================

