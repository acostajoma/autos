-- =====================================================
-- SEED: Vehicle Specifications
-- Description: Simplified fuel types, transmission types,
--              traction systems, and color options
--              User-friendly data optimized for Costa Rica
-- =====================================================

-- =====================================================
-- FUEL TYPES - Available in Costa Rica
-- =====================================================
INSERT INTO fuel (name) VALUES
-- Traditional fuels (most common in Costa Rica)
('Gasolina Regular'),           -- Regular gasoline (87 octane)
('Gasolina Super'),             -- Super gasoline (91+ octane)
('Diesel'),                     -- Diesel fuel

-- Electric and hybrid (growing in Costa Rica)
('Eléctrico'),                  -- Pure electric (EV)
('Híbrido'),                    -- Hybrid (gasoline + electric)
('Híbrido Enchufable');         -- Plug-in hybrid (PHEV)

-- =====================================================
-- TRANSMISSION TYPES - Simplified for users
-- =====================================================
INSERT INTO transmission (name) VALUES
-- Main transmission types
('Manual'),                     -- Manual transmission (any speed)
('Automática'),                 -- Automatic transmission (including DCT, DSG, Tiptronic)
('CVT');                        -- Continuously variable transmission

-- =====================================================
-- TRACTION SYSTEMS - Simplified for users
-- =====================================================
INSERT INTO traction (name) VALUES
-- Simple options for easy understanding
('Delantera (FWD)'),            -- Front-wheel drive
('Trasera (RWD)'),              -- Rear-wheel drive
('4x2'),                         -- 4x2 (two-wheel drive)
('4x4'),                         -- 4x4 / Four-wheel drive
('AWD (Integral)');             -- All-wheel drive / AWD

-- =====================================================
-- COLORS - Simplified palette with hex codes
-- =====================================================
INSERT INTO color (name, hex) VALUES
-- Neutral colors (most common)
('Blanco', '#FFFFFF'),
('Negro', '#000000'),
('Gris', '#808080'),
('Plateado', '#C0C0C0'),
('Beige', '#F5F5DC'),

-- Primary colors
('Rojo', '#DC143C'),
('Azul', '#1E90FF'),
('Amarillo', '#FFD700'),

-- Secondary colors
('Verde', '#228B22'),
('Naranja', '#FF8C00'),
('Morado', '#8B008B'),

-- Additional popular colors
('Café', '#8B4513'),
('Dorado', '#D4AF37'),
('Vino', '#722F37'),
('Azul Marino', '#000080'),
('Verde Oliva', '#556B2F'),
('Rosa', '#FF69B4'),
('Turquesa', '#40E0D0'),
('Bronce', '#CD7F32'),
('Borgoña', '#800020');

-- =====================================================
-- SUMMARY OF INSERTED DATA
-- =====================================================
-- Fuel Types: 6 types (Available in Costa Rica)
--   • Traditional: Gasolina Regular, Gasolina Super, Diesel
--   • Electric/Hybrid: Eléctrico, Híbrido, Híbrido Enchufable
--
-- Transmission Types: 3 types (Simplified)
--   • Manual (all speeds grouped)
--   • Automática (includes DCT, DSG, Tiptronic, etc.)
--   • CVT
--
-- Traction Systems: 5 types (Easy to understand)
--   • Delantera (FWD)
--   • Trasera (RWD)
--   • 4x2
--   • 4x4
--   • AWD (Integral)
--
-- Colors: 19 colors with hex codes (Simplified palette)
--   • Neutral: Blanco, Negro, Gris, Plateado, Beige
--   • Primary: Rojo, Azul, Amarillo
--   • Secondary: Verde, Naranja, Morado
--   • Popular: Café, Dorado, Vino, Azul Marino, Verde Oliva, 
--              Rosa, Turquesa, Bronce, Borgoña
--
-- All data in Spanish for Costa Rican market
-- Simplified for easy user selection and search
-- User-friendly naming without technical jargon
-- Complete hex color codes for visual representation
-- =====================================================

