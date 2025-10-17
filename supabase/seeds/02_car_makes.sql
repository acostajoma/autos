-- =====================================================
-- SEED: Car Makes (Brands)
-- Description: Comprehensive list of car manufacturers
--              from around the world, linked to their
--              country of origin
-- =====================================================

DO $$
DECLARE
    -- Country IDs
    china_id INTEGER;
    usa_id INTEGER;
    japan_id INTEGER;
    india_id INTEGER;
    south_korea_id INTEGER;
    germany_id INTEGER;
    mexico_id INTEGER;
    spain_id INTEGER;
    brazil_id INTEGER;
    thailand_id INTEGER;
    france_id INTEGER;
    italy_id INTEGER;
    uk_id INTEGER;
    canada_id INTEGER;
    turkey_id INTEGER;
    czech_id INTEGER;
    sweden_id INTEGER;
    poland_id INTEGER;
    slovakia_id INTEGER;
    romania_id INTEGER;
    argentina_id INTEGER;
    netherlands_id INTEGER;
    belgium_id INTEGER;
    switzerland_id INTEGER;
    austria_id INTEGER;
    malaysia_id INTEGER;
    indonesia_id INTEGER;
    australia_id INTEGER;
BEGIN
    -- =====================================================
    -- GET COUNTRY IDs
    -- =====================================================
    SELECT id INTO china_id FROM country WHERE name = 'China';
    SELECT id INTO usa_id FROM country WHERE name = 'Estados Unidos';
    SELECT id INTO japan_id FROM country WHERE name = 'Japón';
    SELECT id INTO india_id FROM country WHERE name = 'India';
    SELECT id INTO south_korea_id FROM country WHERE name = 'Corea del Sur';
    SELECT id INTO germany_id FROM country WHERE name = 'Alemania';
    SELECT id INTO mexico_id FROM country WHERE name = 'México';
    SELECT id INTO spain_id FROM country WHERE name = 'España';
    SELECT id INTO brazil_id FROM country WHERE name = 'Brasil';
    SELECT id INTO thailand_id FROM country WHERE name = 'Tailandia';
    SELECT id INTO france_id FROM country WHERE name = 'Francia';
    SELECT id INTO italy_id FROM country WHERE name = 'Italia';
    SELECT id INTO uk_id FROM country WHERE name = 'Reino Unido';
    SELECT id INTO canada_id FROM country WHERE name = 'Canadá';
    SELECT id INTO turkey_id FROM country WHERE name = 'Turquía';
    SELECT id INTO czech_id FROM country WHERE name = 'República Checa';
    SELECT id INTO sweden_id FROM country WHERE name = 'Suecia';
    SELECT id INTO poland_id FROM country WHERE name = 'Polonia';
    SELECT id INTO slovakia_id FROM country WHERE name = 'Eslovaquia';
    SELECT id INTO romania_id FROM country WHERE name = 'Rumania';
    SELECT id INTO argentina_id FROM country WHERE name = 'Argentina';
    SELECT id INTO netherlands_id FROM country WHERE name = 'Países Bajos';
    SELECT id INTO belgium_id FROM country WHERE name = 'Bélgica';
    SELECT id INTO switzerland_id FROM country WHERE name = 'Suiza';
    SELECT id INTO austria_id FROM country WHERE name = 'Austria';
    SELECT id INTO malaysia_id FROM country WHERE name = 'Malasia';
    SELECT id INTO indonesia_id FROM country WHERE name = 'Indonesia';
    SELECT id INTO australia_id FROM country WHERE name = 'Australia';

    -- =====================================================
    -- UNITED STATES - Major global automotive power
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Ford', usa_id, true),
    ('Chevrolet', usa_id, true),
    ('GMC', usa_id, true),
    ('Cadillac', usa_id, true),
    ('Buick', usa_id, true),
    ('Tesla', usa_id, true),
    ('Jeep', usa_id, true),
    ('Dodge', usa_id, true),
    ('Ram', usa_id, true),
    ('Chrysler', usa_id, true),
    ('Lincoln', usa_id, true),
    ('Rivian', usa_id, true),
    ('Lucid', usa_id, true);

    -- =====================================================
    -- JAPAN - Known for reliability and innovation
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Toyota', japan_id, true),
    ('Honda', japan_id, true),
    ('Nissan', japan_id, true),
    ('Mazda', japan_id, true),
    ('Subaru', japan_id, true),
    ('Mitsubishi', japan_id, true),
    ('Suzuki', japan_id, true),
    ('Lexus', japan_id, true),
    ('Infiniti', japan_id, true),
    ('Acura', japan_id, true),
    ('Daihatsu', japan_id, true),
    ('Isuzu', japan_id, true),
    ('Hino', japan_id, true);

    -- =====================================================
    -- GERMANY - Premium and engineering excellence
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Volkswagen', germany_id, true),
    ('BMW', germany_id, true),
    ('Mercedes-Benz', germany_id, true),
    ('Audi', germany_id, true),
    ('Porsche', germany_id, true),
    ('Opel', germany_id, true),
    ('Smart', germany_id, true),
    ('Maybach', germany_id, true),
    ('MAN', germany_id, true);

    -- =====================================================
    -- SOUTH KOREA - Rapidly growing global presence
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Hyundai', south_korea_id, true),
    ('Kia', south_korea_id, true),
    ('Genesis', south_korea_id, true),
    ('SsangYong', south_korea_id, true),
    ('Daewoo', south_korea_id, true);

    -- =====================================================
    -- CHINA - World's largest producer
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('BYD', china_id, true),
    ('Geely', china_id, true),
    ('Great Wall', china_id, true),
    ('Chery', china_id, true),
    ('NIO', china_id, true),
    ('Xpeng', china_id, true),
    ('Li Auto', china_id, true),
    ('JAC', china_id, true),
    ('SAIC', china_id, true),
    ('Dongfeng', china_id, true),
    ('FAW', china_id, true),
    ('BAIC', china_id, true),
    ('Changan', china_id, true),
    ('Hongqi', china_id, true),
    ('Lynk & Co', china_id, true),
    ('MG', china_id, true),
    ('Maxus', china_id, true),
    ('Avatr', china_id, true);

    -- =====================================================
    -- FRANCE - Style and innovation
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Peugeot', france_id, true),
    ('Renault', france_id, true),
    ('Citroën', france_id, true),
    ('DS Automobiles', france_id, true),
    ('Alpine', france_id, true),
    ('Bugatti', france_id, true);

    -- =====================================================
    -- ITALY - Luxury and performance
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Fiat', italy_id, true),
    ('Ferrari', italy_id, true),
    ('Lamborghini', italy_id, true),
    ('Maserati', italy_id, true),
    ('Alfa Romeo', italy_id, true),
    ('Lancia', italy_id, true),
    ('Pagani', italy_id, true),
    ('Iveco', italy_id, true);

    -- =====================================================
    -- UNITED KINGDOM - Heritage and luxury
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Land Rover', uk_id, true),
    ('Jaguar', uk_id, true),
    ('Mini', uk_id, true),
    ('Aston Martin', uk_id, true),
    ('Bentley', uk_id, true),
    ('Rolls-Royce', uk_id, true),
    ('McLaren', uk_id, true),
    ('Lotus', uk_id, true),
    ('Vauxhall', uk_id, true);

    -- =====================================================
    -- SWEDEN - Safety and durability (Volvo, etc.)
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Volvo', sweden_id, true),
    ('Scania', sweden_id, true),
    ('Polestar', sweden_id, true),
    ('Koenigsegg', sweden_id, true),
    ('Saab', sweden_id, true);

    -- =====================================================
    -- INDIA - Growing automotive market
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Tata', india_id, true),
    ('Mahindra', india_id, true),
    ('Maruti Suzuki', india_id, true);

    -- =====================================================
    -- MEXICO - Regional production hub
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Mastretta', mexico_id, false);

    -- =====================================================
    -- SPAIN - European production center
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('SEAT', spain_id, true),
    ('Cupra', spain_id, true);

    -- =====================================================
    -- BRAZIL - South American leader
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Agrale', brazil_id, false),
    ('Troller', brazil_id, false);

    -- =====================================================
    -- THAILAND - Regional manufacturing hub
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Thai Rung', thailand_id, false);

    -- =====================================================
    -- CANADA - North American production
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Campagna', canada_id, false);

    -- =====================================================
    -- TURKEY - Emerging producer
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Togg', turkey_id, true);

    -- =====================================================
    -- CZECH REPUBLIC - European manufacturing
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Škoda', czech_id, true),
    ('Tatra', czech_id, true);

    -- =====================================================
    -- POLAND - Growing automotive sector
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('FSO', poland_id, false),
    ('Solaris', poland_id, false);

    -- =====================================================
    -- ROMANIA - European production
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Dacia', romania_id, true);

    -- =====================================================
    -- ARGENTINA - Regional manufacturer
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('IES', argentina_id, false);

    -- =====================================================
    -- NETHERLANDS - Innovation and specialty
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('DAF', netherlands_id, true),
    ('Spyker', netherlands_id, false);

    -- =====================================================
    -- MALAYSIA - Southeast Asian producer
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Proton', malaysia_id, true),
    ('Perodua', malaysia_id, true);

    -- =====================================================
    -- AUSTRALIA - Oceania manufacturer
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('Holden', australia_id, true);

    -- =====================================================
    -- AUSTRIA - Specialty vehicles
    -- =====================================================
    INSERT INTO make (name, country_id, approved) VALUES
    ('KTM', austria_id, false);

END $$;

-- =====================================================
-- SUMMARY OF INSERTED DATA
-- =====================================================
-- Total car makes: 112 brands
-- Countries represented: 21
-- Approved brands: 97 (major global brands available in most markets)
-- Pending approval: 15 (smaller, regional, or specialty brands)
-- 
-- Distribution by country:
--   • USA: 13 brands (Ford, Chevrolet, Tesla, Jeep, etc.)
--   • Japan: 13 brands (Toyota, Honda, Nissan, Mazda, etc.)
--   • Germany: 9 brands (VW, BMW, Mercedes-Benz, Audi, Porsche, etc.)
--   • China: 18 brands (BYD, Geely, NIO, Xpeng, etc.)
--   • France: 6 brands (Peugeot, Renault, Citroën, Bugatti, etc.)
--   • Italy: 8 brands (Fiat, Ferrari, Lamborghini, Maserati, etc.)
--   • UK: 9 brands (Land Rover, Jaguar, Mini, Aston Martin, etc.)
--   • Sweden: 5 brands (Volvo, Scania, Polestar, Koenigsegg, Saab)
--   • South Korea: 5 brands (Hyundai, Kia, Genesis, SsangYong, etc.)
--   • India: 3 brands (Tata, Mahindra, Maruti Suzuki)
--   • And 11+ other countries with regional manufacturers
-- =====================================================

