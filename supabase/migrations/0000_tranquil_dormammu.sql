CREATE TABLE "advertising" (
	"id" serial PRIMARY KEY NOT NULL,
	"advertising_type_id" integer NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text NOT NULL,
	CONSTRAINT "advertising_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "advertising" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "advertising_feature" (
	"advertising_id" integer NOT NULL,
	"feature_id" integer NOT NULL,
	CONSTRAINT "pk_advertising_feature" PRIMARY KEY("advertising_id","feature_id")
);
--> statement-breakpoint
ALTER TABLE "advertising_feature" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "advertising_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_alt" text,
	"image_url" text,
	"description" text NOT NULL,
	"type" text NOT NULL,
	CONSTRAINT "advertising_type_type_unique" UNIQUE("type")
);
--> statement-breakpoint
ALTER TABLE "advertising_type" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "car" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"city_id" integer NOT NULL,
	"version_id" integer NOT NULL,
	"technical_revision_up_to_date" boolean DEFAULT false NOT NULL,
	"fuel_id" integer NOT NULL,
	"motor_size" integer NOT NULL,
	"kilometers" integer NOT NULL,
	"permission_up_to_date" boolean DEFAULT false NOT NULL,
	"plate_number" text NOT NULL,
	"doors_number" integer NOT NULL,
	"horse_power" integer NOT NULL,
	"year" integer NOT NULL,
	"transmission_id" integer NOT NULL,
	"traction_id" integer NOT NULL,
	"condition" text NOT NULL,
	"color_id" integer NOT NULL,
	CONSTRAINT "car_year_check" CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
	CONSTRAINT "car_kilometers_check" CHECK (kilometers >= 0),
	CONSTRAINT "car_horse_power_check" CHECK (horse_power >= 0),
	CONSTRAINT "car_doors_number_check" CHECK (doors_number BETWEEN 2 AND 6),
	CONSTRAINT "car_motor_size_check" CHECK (motor_size >= 0)
);
--> statement-breakpoint
ALTER TABLE "car" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "car_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"image_alt" text NOT NULL,
	"image_order" integer NOT NULL,
	CONSTRAINT "car_image_image_order_check" CHECK (image_order >= 0)
);
--> statement-breakpoint
ALTER TABLE "car_image" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_id" integer,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "city" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "color" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"hex" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "color" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "country" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"currency_symbol" text NOT NULL,
	"currency" text NOT NULL,
	"phone_code" text NOT NULL,
	CONSTRAINT "country_currency_unique" UNIQUE("currency")
);
--> statement-breakpoint
ALTER TABLE "country" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "equipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "equipment" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "equipment_to_car" (
	"equipment_id" integer NOT NULL,
	"car_id" uuid NOT NULL,
	CONSTRAINT "pk_equipment_to_car" PRIMARY KEY("equipment_id","car_id")
);
--> statement-breakpoint
ALTER TABLE "equipment_to_car" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "favorite" (
	"user_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pk_favorite" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "favorite" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "feature" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"text_value" text,
	"number_value" numeric(10, 2)
);
--> statement-breakpoint
ALTER TABLE "feature" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "fuel" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fuel" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "make" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country_id" integer,
	"approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "make" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "model" (
	"id" serial PRIMARY KEY NOT NULL,
	"make_id" integer,
	"name" text NOT NULL,
	"type_id" integer,
	"approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "model" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text NOT NULL,
	"is_price_negotiable" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expiration_date" timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '90 days' NOT NULL,
	"deleted_at" timestamp,
	"views" integer DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"state" text NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "post_price_check" CHECK (price > 0)
);
--> statement-breakpoint
ALTER TABLE "post" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post_to_advertising" (
	"post_id" uuid NOT NULL,
	"advertising_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expiration_date" timestamp,
	CONSTRAINT "pk_post_to_advertising" PRIMARY KEY("post_id","advertising_id")
);
--> statement-breakpoint
ALTER TABLE "post_to_advertising" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "region" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "region" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "traction" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "traction" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "transmission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transmission" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "type" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"phone" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "version" (
	"id" serial PRIMARY KEY NOT NULL,
	"model_id" integer,
	"name" text NOT NULL,
	"approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "version" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "advertising" ADD CONSTRAINT "advertising_advertising_type_id_advertising_type_id_fk" FOREIGN KEY ("advertising_type_id") REFERENCES "public"."advertising_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advertising_feature" ADD CONSTRAINT "advertising_feature_advertising_id_advertising_id_fk" FOREIGN KEY ("advertising_id") REFERENCES "public"."advertising"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advertising_feature" ADD CONSTRAINT "advertising_feature_feature_id_feature_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."feature"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_version_id_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."version"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_fuel_id_fuel_id_fk" FOREIGN KEY ("fuel_id") REFERENCES "public"."fuel"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_transmission_id_transmission_id_fk" FOREIGN KEY ("transmission_id") REFERENCES "public"."transmission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_traction_id_traction_id_fk" FOREIGN KEY ("traction_id") REFERENCES "public"."traction"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car" ADD CONSTRAINT "car_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_image" ADD CONSTRAINT "car_image_car_id_car_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "equipment_to_car" ADD CONSTRAINT "equipment_to_car_equipment_id_equipment_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "equipment_to_car" ADD CONSTRAINT "equipment_to_car_car_id_car_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "make" ADD CONSTRAINT "make_country_id_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."country"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "model" ADD CONSTRAINT "model_make_id_make_id_fk" FOREIGN KEY ("make_id") REFERENCES "public"."make"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "model" ADD CONSTRAINT "model_type_id_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_id_car_id_fk" FOREIGN KEY ("id") REFERENCES "public"."car"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_to_advertising" ADD CONSTRAINT "post_to_advertising_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_to_advertising" ADD CONSTRAINT "post_to_advertising_advertising_id_advertising_id_fk" FOREIGN KEY ("advertising_id") REFERENCES "public"."advertising"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "region" ADD CONSTRAINT "region_country_id_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."country"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "version" ADD CONSTRAINT "version_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "advertising_advertising_type_id_idx" ON "advertising" USING btree ("advertising_type_id");--> statement-breakpoint
CREATE INDEX "car_city_id_idx" ON "car" USING btree ("city_id");--> statement-breakpoint
CREATE INDEX "car_version_id_idx" ON "car" USING btree ("version_id");--> statement-breakpoint
CREATE INDEX "car_fuel_id_idx" ON "car" USING btree ("fuel_id");--> statement-breakpoint
CREATE INDEX "car_transmission_id_idx" ON "car" USING btree ("transmission_id");--> statement-breakpoint
CREATE INDEX "car_traction_id_idx" ON "car" USING btree ("traction_id");--> statement-breakpoint
CREATE INDEX "car_year_idx" ON "car" USING btree ("year");--> statement-breakpoint
CREATE INDEX "car_kilometers_year_idx" ON "car" USING btree ("kilometers");--> statement-breakpoint
CREATE INDEX "car_image_car_id_idx" ON "car_image" USING btree ("car_id");--> statement-breakpoint
CREATE INDEX "city_region_id_idx" ON "city" USING btree ("region_id");--> statement-breakpoint
CREATE INDEX "equipment_to_car_equipment_id_idx" ON "equipment_to_car" USING btree ("equipment_id");--> statement-breakpoint
CREATE INDEX "equipment_to_car_car_id_idx" ON "equipment_to_car" USING btree ("car_id");--> statement-breakpoint
CREATE INDEX "favorite_user_id_idx" ON "favorite" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "favorite_post_id_idx" ON "favorite" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "feature_name_idx" ON "feature" USING btree ("name");--> statement-breakpoint
CREATE INDEX "feature_text_value_idx" ON "feature" USING btree ("text_value");--> statement-breakpoint
CREATE INDEX "feature_number_value_idx" ON "feature" USING btree ("number_value");--> statement-breakpoint
CREATE INDEX "make_name_idx" ON "make" USING btree ("name");--> statement-breakpoint
CREATE INDEX "make_approved_idx" ON "make" USING btree ("approved");--> statement-breakpoint
CREATE INDEX "model_make_id_idx" ON "model" USING btree ("make_id");--> statement-breakpoint
CREATE INDEX "model_type_id_idx" ON "model" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "model_name_idx" ON "model" USING btree ("name");--> statement-breakpoint
CREATE INDEX "post_user_id_idx" ON "post" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "post_price_idx" ON "post" USING btree ("price");--> statement-breakpoint
CREATE INDEX "post_state_idx" ON "post" USING btree ("state");--> statement-breakpoint
CREATE INDEX "post_expiration_date_idx" ON "post" USING btree ("expiration_date","deleted_at");--> statement-breakpoint
CREATE INDEX "post_price_currency_idx" ON "post" USING btree ("price","currency");--> statement-breakpoint
CREATE INDEX "post_created_at_idx" ON "post" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "post_to_advertising_post_id_idx" ON "post_to_advertising" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_to_advertising_advertising_id_idx" ON "post_to_advertising" USING btree ("advertising_id");--> statement-breakpoint
CREATE INDEX "post_to_advertising_expiration_date_idx" ON "post_to_advertising" USING btree ("expiration_date");--> statement-breakpoint
CREATE INDEX "version_model_id_idx" ON "version" USING btree ("model_id");--> statement-breakpoint
CREATE INDEX "version_approved_idx" ON "version" USING btree ("approved");--> statement-breakpoint
CREATE POLICY "Anyone can read advertising" ON "advertising" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read advertising feature" ON "advertising_feature" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read advertising type" ON "advertising_type" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Authenticated can update own car" ON "car" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = (select auth.uid()));--> statement-breakpoint
CREATE POLICY "Authenticated can insert own car" ON "car" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (user_id = (select auth.uid()));--> statement-breakpoint
CREATE POLICY "Anyone can read a car" ON "car" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Authenticated can insert own car image" ON "car_image" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can update own car image" ON "car_image" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can delete own car image" ON "car_image" AS PERMISSIVE FOR DELETE TO "authenticated" USING (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Anyone can read a car image" ON "car_image" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a city" ON "city" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a color" ON "color" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a country" ON "country" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a equipment" ON "equipment" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Authenticated can insert own equipment to car" ON "equipment_to_car" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can update own equipment to car" ON "equipment_to_car" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Authenticated can delete own equipment to car" ON "equipment_to_car" AS PERMISSIVE FOR DELETE TO "authenticated" USING (car_id IN (SELECT id FROM car WHERE user_id = (select auth.uid())));--> statement-breakpoint
CREATE POLICY "Anyone can read a equipment to car" ON "equipment_to_car" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Authenticated can favorite post" ON "favorite" AS PERMISSIVE FOR ALL TO "authenticated" USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));--> statement-breakpoint
CREATE POLICY "Anyone can read a feature" ON "feature" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a fuel" ON "fuel" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a make" ON "make" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can insert a make if is authenticated and approved is false" ON "make" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (approved = false);--> statement-breakpoint
CREATE POLICY "Anyone can read a model" ON "model" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can insert a model if is authenticated and approved is false" ON "model" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (approved = false);--> statement-breakpoint
CREATE POLICY "Authenticated can edit own post" ON "post" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (user_id = (select auth.uid()));--> statement-breakpoint
CREATE POLICY "Anyone can read a post" ON "post" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone authenticated can insert a post" ON "post" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a post to advertising" ON "post_to_advertising" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a region" ON "region" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a traction" ON "traction" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a transmission" ON "transmission" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can read a type" ON "type" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Authenticated can edit own user" ON "user" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (id = (select auth.uid()));--> statement-breakpoint
CREATE POLICY "Anyone can read a version" ON "version" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Anyone can insert a version if is authenticated and approved is false" ON "version" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (approved = false);