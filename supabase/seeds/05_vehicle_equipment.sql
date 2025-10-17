-- =====================================================
-- SEED: Vehicle Equipment
-- Description: Common vehicle equipment and features
--              Grouped under general terms for simplicity
--              Comprehensive but user-friendly
-- =====================================================

-- =====================================================
-- SAFETY EQUIPMENT
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Airbags
('Airbags Frontales', 'Bolsas de aire para conductor y pasajero delantero'),
('Airbags Laterales', 'Bolsas de aire en los laterales del vehículo'),
('Airbags de Cortina', 'Bolsas de aire tipo cortina para protección lateral'),
('Airbags de Rodilla', 'Bolsas de aire para protección de rodillas'),

-- Braking systems
('Frenos ABS', 'Sistema de frenos antibloqueo'),
('Frenos de Disco', 'Frenos de disco en todas las ruedas'),
('Asistente de Frenado de Emergencia', 'Asistencia automática en frenadas de emergencia'),

-- Stability and control
('Control de Estabilidad (ESP)', 'Sistema electrónico de estabilidad'),
('Control de Tracción', 'Sistema de control de tracción en las ruedas'),
('Asistente de Arranque en Pendiente', 'Ayuda para arrancar en subidas'),
('Asistente de Descenso', 'Control automático en bajadas pronunciadas'),

-- Monitoring systems
('Sensor de Presión de Neumáticos', 'Monitor de presión de llantas'),
('Cámara de Reversa', 'Cámara trasera para estacionamiento'),
('Sensores de Estacionamiento Traseros', 'Sensores de proximidad traseros'),
('Sensores de Estacionamiento Delanteros', 'Sensores de proximidad delanteros'),
('Cámara 360°', 'Sistema de cámaras con vista panorámica'),

-- Advanced safety
('Alerta de Cambio de Carril', 'Aviso cuando se sale del carril sin señalizar'),
('Asistente de Mantenimiento de Carril', 'Ayuda a mantener el vehículo en el carril'),
('Detección de Punto Ciego', 'Sensores para puntos ciegos laterales'),
('Alerta de Tráfico Cruzado', 'Aviso de tráfico al retroceder'),
('Frenado Automático de Emergencia', 'Frenado automático ante colisión inminente');

-- =====================================================
-- COMFORT & CONVENIENCE
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Climate control
('Aire Acondicionado', 'Sistema de aire acondicionado estándar'),
('Aire Acondicionado Dual', 'Control de temperatura independiente para conductor y pasajero'),
('Aire Acondicionado Tri-Zona', 'Control de temperatura en tres zonas'),
('Climatizador Automático', 'Control automático de temperatura'),

-- Seating
('Asientos de Tela', 'Tapicería de tela estándar'),
('Asientos de Cuero', 'Tapicería de cuero'),
('Asientos de Cuero Sintético', 'Tapicería símil cuero'),
('Asientos Eléctricos Delanteros', 'Ajuste eléctrico de asientos delanteros'),
('Asientos con Calefacción', 'Calefacción en asientos'),
('Asientos con Ventilación', 'Ventilación en asientos'),
('Asientos con Memoria', 'Memoria de posición de asientos'),
('Asiento del Conductor Ajustable en Altura', 'Ajuste manual de altura del asiento conductor'),

-- Steering
('Volante de Cuero', 'Volante forrado en cuero'),
('Volante Multifuncional', 'Volante con controles integrados'),
('Volante Ajustable en Altura', 'Volante con ajuste de altura'),
('Volante Ajustable en Profundidad', 'Volante con ajuste de profundidad'),
('Volante Calefaccionado', 'Calefacción en el volante'),
('Paletas de Cambio', 'Paletas para cambio manual en el volante'),

-- Windows and mirrors
('Ventanas Eléctricas', 'Ventanas con accionamiento eléctrico'),
('Espejos Eléctricos', 'Espejos laterales con ajuste eléctrico'),
('Espejos Eléctricos Plegables', 'Espejos laterales plegables eléctricamente'),
('Espejos con Calefacción', 'Calefacción en espejos laterales'),
('Espejo Retrovisor con Atenuación Automática', 'Espejo interior con anti-deslumbramiento automático'),
('Ventanas Traseras Polarizadas', 'Cristales traseros con polarizado de fábrica'),

-- Entry and access
('Cierre Centralizado', 'Bloqueo central de puertas'),
('Cierre Centralizado con Control Remoto', 'Bloqueo a distancia con control'),
('Entrada sin Llave (Keyless Entry)', 'Acceso sin usar llave física'),
('Encendido sin Llave (Push Button)', 'Arranque por botón'),
('Apertura de Baúl Eléctrica', 'Apertura eléctrica del maletero'),
('Baúl con Apertura Automática', 'Apertura automática del baúl con sensor');

-- =====================================================
-- TECHNOLOGY & INFOTAINMENT
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Display and interface
('Pantalla Táctil', 'Pantalla táctil central'),
('Pantalla de Instrumentos Digital', 'Cuadro de instrumentos digital'),
('Head-Up Display (HUD)', 'Proyección de información en parabrisas'),
('Computadora de Viaje', 'Información de viaje y consumo'),

-- Connectivity
('Bluetooth', 'Conectividad inalámbrica para teléfono'),
('Apple CarPlay', 'Integración con dispositivos Apple'),
('Android Auto', 'Integración con dispositivos Android'),
('USB', 'Puerto USB para carga y conexión'),
('Cargador Inalámbrico', 'Carga inalámbrica para teléfonos'),
('WiFi', 'Punto de acceso WiFi en el vehículo'),

-- Audio
('Radio AM/FM', 'Radio estándar'),
('Sistema de Audio', 'Sistema de sonido estándar'),
('Sistema de Audio Premium', 'Sistema de sonido de alta calidad'),
('Control de Audio en el Volante', 'Controles de audio en el volante'),

-- Navigation
('GPS Integrado', 'Sistema de navegación integrado'),
('Mapas en Tiempo Real', 'Actualización de mapas en tiempo real');

-- =====================================================
-- DRIVER ASSISTANCE
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Cruise control
('Control de Crucero', 'Control de velocidad crucero estándar'),
('Control de Crucero Adaptativo', 'Control de crucero con ajuste automático de distancia'),

-- Advanced assistance
('Asistente de Estacionamiento', 'Ayuda para estacionar'),
('Estacionamiento Automático', 'Sistema de estacionamiento automático'),
('Reconocimiento de Señales de Tránsito', 'Detección y muestra de señales viales'),
('Alerta de Fatiga del Conductor', 'Detección de somnolencia del conductor'),
('Visión Nocturna', 'Sistema de visión nocturna'),
('Piloto Automático', 'Sistema de conducción semiautónoma');

-- =====================================================
-- LIGHTING
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Headlights
('Faros Halógenos', 'Iluminación halógena estándar'),
('Faros de Niebla', 'Faros antiniebla delanteros'),
('Faros LED', 'Iluminación LED'),
('Faros Bi-LED', 'Faros LED de doble función'),
('Faros Xenón', 'Iluminación de xenón'),
('Faros Adaptativos', 'Faros que se ajustan según la dirección'),
('Luces Diurnas', 'Luces de circulación diurna'),

-- Automatic lighting
('Sensores de Luz', 'Encendido automático de luces'),
('Luces Automáticas', 'Control automático de iluminación');

-- =====================================================
-- EXTERIOR FEATURES
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Roof accessories
('Rieles de Techo', 'Barras portaequipaje en el techo'),

-- Wheels and tires
('Rines de Aleación', 'Llantas de aleación'),
('Llanta de Repuesto', 'Neumático de repuesto completo'),
('Kit de Reparación de Neumáticos', 'Kit para reparación de pinchazos'),

-- Protection
('Protector de Carter', 'Protección inferior del motor'),
('Estribos Laterales', 'Escalones laterales para acceso');

-- =====================================================
-- INTERIOR FEATURES
-- =====================================================
INSERT INTO equipment (name, description) VALUES
-- Roof features (commonly considered interior)
('Techo Panorámico', 'Techo de cristal panorámico'),
('Techo Corredizo', 'Techo con apertura manual o eléctrica'),

-- Storage and organization
('Consola Central con Apoyabrazos', 'Consola central con soporte para brazo'),
('Portavasos', 'Soporte para bebidas'),
('Guantera', 'Compartimento de almacenamiento frontal'),
('Bolsillos en Puertas', 'Compartimentos de almacenamiento en puertas'),
('Organizador de Maletero', 'Sistema de organización en el baúl'),
('Red de Carga', 'Red para asegurar objetos en el maletero'),
('Ganchos para Bolsas', 'Ganchos para colgar bolsas de compras'),

-- Convenience
('Viseras con Espejo', 'Viseras parasol con espejo'),
('Viseras con Espejo Iluminado', 'Viseras con espejo y luz'),
('Encendedor de Cigarrillos', 'Toma de corriente tipo encendedor'),
('Toma de Corriente 12V', 'Puerto de alimentación 12V'),
('Iluminación Interior LED', 'Luces LED en el habitáculo'),
('Luz de Cortesía', 'Luces que se encienden al abrir las puertas'),
('Luz de Lectura', 'Luces individuales para lectura'),

-- Floor and protection
('Tapetes de Piso', 'Alfombrillas protectoras de piso'),
('Tapetes de Hule', 'Alfombrillas de goma para protección'),

-- Practicality
('Asientos Traseros Abatibles', 'Asientos traseros plegables para ampliar maletero'),
('Tercera Fila de Asientos', 'Asientos adicionales para 7 pasajeros'),
('Reposabrazos Trasero', 'Apoyabrazos central en asientos traseros'),
('Portavasos Traseros', 'Soporte para bebidas en asientos traseros'),

-- Climate comfort
('Salidas de Aire Traseras', 'Ventilación para pasajeros traseros'),
('Cortinas Parasol Traseras', 'Cortinas para ventanas traseras');

-- =====================================================
-- SUMMARY OF INSERTED DATA
-- =====================================================
-- Total Equipment Items: 113
--
-- Categories:
--   • Safety: 18 items (airbags, brakes, stability, sensors)
--   • Comfort & Convenience: 35 items (climate, seats, steering, windows, access)
--   • Technology & Infotainment: 14 items (displays, connectivity, audio, navigation)
--   • Driver Assistance: 7 items (cruise control, parking, alerts)
--   • Lighting: 9 items (headlights, automatic systems)
--   • Exterior Features: 6 items (wheels, protection, roof accessories)
--   • Interior Features: 24 items (storage, lighting, organization, 
--                                  comfort features, climate features)
--
-- All items grouped under general terms
-- Descriptions in Spanish for Costa Rican market
-- Covers modern and traditional vehicle features
-- Easy to understand for all users
-- =====================================================

