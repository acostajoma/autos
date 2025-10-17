<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Form, Input, Textarea, Select, Checkbox, Button } from '$lib/components';
	import { createCarPostWithoutImages } from '$lib/helpers/validation/carPost';
	import { CAR_POST_FORM_ID } from '$lib/constants/forms';

	const formId = CAR_POST_FORM_ID;

	// Placeholder options - these should ideally come from a database or API
	const colorOptions = [
		{ value: 1, label: 'Negro' },
		{ value: 2, label: 'Blanco' },
		{ value: 3, label: 'Gris' },
		{ value: 4, label: 'Rojo' },
		{ value: 5, label: 'Azul' }
	];

	const fuelOptions = [
		{ value: 1, label: 'Gasolina' },
		{ value: 2, label: 'Diésel' },
		{ value: 3, label: 'Eléctrico' },
		{ value: 4, label: 'Híbrido' }
	];

	const transmissionOptions = [
		{ value: 1, label: 'Manual' },
		{ value: 2, label: 'Automática' },
		{ value: 3, label: 'CVT' }
	];

	const tractionOptions = [
		{ value: 1, label: 'Delantera' },
		{ value: 2, label: 'Trasera' },
		{ value: 3, label: '4x4' }
	];

	const conditionOptions = [
		{ value: 'nuevo', label: 'Nuevo' },
		{ value: 'usado', label: 'Usado' },
		{ value: 'seminuevo', label: 'Seminuevo' }
	];

	const currencyOptions = [
		{ value: 'USD', label: 'Dólares (USD)' },
		{ value: 'EUR', label: 'Euros (EUR)' },
		{ value: 'CLP', label: 'Pesos Chilenos (CLP)' }
	];

	const stateOptions = [
		{ value: 'draft', label: 'Borrador' },
		{ value: 'published', label: 'Publicado' },
		{ value: 'archived', label: 'Archivado' }
	];

	const cityOptions = [
		{ value: '1', label: 'Ciudad 1' },
		{ value: '2', label: 'Ciudad 2' },
		{ value: '3', label: 'Ciudad 3' }
	];

	const stateLocationOptions = [
		{ value: '1', label: 'Estado 1' },
		{ value: '2', label: 'Estado 2' },
		{ value: '3', label: 'Estado 3' }
	];

	const makeOptions = [
		{ value: '1', label: 'Toyota' },
		{ value: '2', label: 'Ford' },
		{ value: '3', label: 'Chevrolet' }
	];
	const modelOptions = [
		{ value: '1', label: 'Corolla' },
		{ value: '2', label: 'Camry' },
		{ value: '3', label: 'Accord' }
	];
	const versionOptions = [
		{ value: '1', label: '2020' },
		{ value: '2', label: '2021' },
		{ value: '3', label: '2022' }
	];
	const regionOptions = [
		{ value: '1', label: 'Region 1' },
		{ value: '2', label: 'Region 2' },
		{ value: '3', label: 'Region 3' }
	];
</script>

<div class="mx-auto max-w-4xl p-4 md:p-6">
	<h1 class="mb-8 text-3xl font-bold">Crear Publicación de Vehículo</h1>

	<Form action="?/" id={formId} validationSchema={createCarPostWithoutImages}>
		<!-- Post Information Section -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Información de la Publicación</h2>

				<div class="grid grid-cols-2 gap-6">
					<div class="col-span-2">
						<Input
							type="text"
							label="Título"
							name="title"
							{formId}
							placeholder="Ej: Toyota Corolla 2020 en excelente estado"
						/>
					</div>

					<div class="col-span-2">
						<Textarea
							label="Descripción"
							name="description"
							{formId}
							rows={6}
							placeholder="Describe detalladamente el vehículo..."
						/>
					</div>

					<div class="col-span-2 md:col-span-1">
						<Input type="number" label="Precio" name="price" {formId} placeholder="15000" />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Select label="Moneda" name="currency" {formId} options={currencyOptions} />
					</div>

					<div class="col-span-2">
						<Checkbox label="El precio es negociable" name="isPriceNegotiable" {formId} />
					</div>
				</div>
			</div>
		</div>

		<!-- Basic Vehicle Information Section -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Información Básica del Vehículo</h2>

				<div class="grid grid-cols-2 gap-6">
					<div class="col-span-2 md:col-span-1">
						<!-- Aux select to make the request to the API to get the makes -->
						<Select label="Marca" name="makeId" {formId} options={makeOptions} auxSelect />
					</div>
					<div class="col-span-2 md:col-span-1">
						<!-- Aux select to make the request to the API to get the models -->
						<Select label="Modelo" name="modelId" {formId} options={modelOptions} auxSelect />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Select label="Versión" name="versionId" {formId} options={versionOptions} />
					</div>

					<div class="col-span-2 md:col-span-1">
						<Input type="number" label="Año" name="year" {formId} placeholder="2020" />
					</div>

					<div class="col-span-2 md:col-span-1">
						<Select label="Color" name="colorId" {formId} options={colorOptions} />
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Specifications Section -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Especificaciones Técnicas</h2>

				<div class="grid grid-cols-2 gap-6">
					<div class="col-span-2 md:col-span-1">
						<Select label="Tipo de Combustible" name="fuelId" {formId} options={fuelOptions} />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Select
							label="Transmisión"
							name="transmissionId"
							{formId}
							options={transmissionOptions}
						/>
					</div>

					<div class="col-span-2 md:col-span-1">
						<Select label="Tracción" name="tractionId" {formId} options={tractionOptions} />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Input
							type="number"
							label="Tamaño del Motor (cc)"
							name="motorSize"
							{formId}
							placeholder="1600"
						/>
					</div>
					<div class="col-span-2 md:col-span-1">
						<Input
							type="number"
							label="Caballos de Fuerza"
							name="horsePower"
							{formId}
							placeholder="120"
						/>
					</div>
					<div class="col-span-2 md:col-span-1">
						<Input
							type="number"
							label="Kilometraje"
							name="kilometers"
							{formId}
							placeholder="50000"
						/>
					</div>
					<div class="col-span-2 md:col-span-1">
						<Input
							type="number"
							label="Número de Puertas"
							name="doorsNumber"
							{formId}
							placeholder="4"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Condition and Documentation Section -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Estado y Documentación</h2>

				<div class="grid grid-cols-2 gap-6">
					<div class="col-span-2 md:col-span-1">
						<Select
							label="Condición del Vehículo"
							name="condition"
							{formId}
							options={conditionOptions}
						/>
					</div>

					<div class="col-span-2 md:col-span-1">
						<Input
							type="text"
							label="Número de Placa"
							name="plateNumber"
							{formId}
							placeholder="ABC-1234"
						/>
					</div>

					<div class="col-span-2 md:col-span-1">
						<Checkbox label="Revisión técnica al día" name="technicalRevisionUpToDate" {formId} />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Checkbox label="Permisos al día" name="permissionUpToDate" {formId} />
					</div>
				</div>
			</div>
		</div>

		<!-- Location Section -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Ubicación</h2>
				
				<div class="grid grid-cols-2 gap-6">
					<div class="col-span-2 md:col-span-1">
						<Select label="Región" name="regionId" {formId} options={regionOptions} auxSelect />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Select label="Estado" name="stateId" {formId} options={stateLocationOptions} auxSelect />
					</div>
					<div class="col-span-2 md:col-span-1">
						<Select label="Ciudad" name="cityId" {formId} options={cityOptions}  />
					</div>
				</div>
			</div>
		</div>

		<!-- Images Section - Simplified for now -->
		<div class="card mb-6 card-border">
			<div class="card-body">
				<h2 class="card-title">Imágenes</h2>
				<p class="mb-4 text-sm text-base-content/70">
					La funcionalidad de carga de imágenes se implementará próximamente
				</p>
				<!-- TODO: Implement image upload component -->
			</div>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-end gap-4">
			<Button type="submit" class="btn-primary" {formId}>Crear Publicación</Button>
		</div>
	</Form>
</div>
