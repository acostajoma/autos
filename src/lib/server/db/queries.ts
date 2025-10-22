import { asc, eq, and } from "drizzle-orm";
import { color, fuel, traction, transmission, region, make, model, version } from "./schema";

type Db = App.Locals['db'];
export const colorsQuery = (db: Db) => db.select({
    value: color.id,
    label: color.name,
}).from(color).limit(100);

export const fuelsQuery = (db: Db) => db.select({
    value: fuel.id,
    label: fuel.name,
}).from(fuel);

export const transmissionsQuery = (db: Db) => db.select({
    value: transmission.id,
    label: transmission.name,
}).from(transmission);

export const tractionQuery = (db: Db) => db.select({
    value: traction.id,
    label: traction.name,
}).from(traction);

export const regionsQuery = (db: Db) => db.select({
    value: region.id,
    label: region.name,
}).from(region);

export const carMakesQuery = (db: Db) => db.select({
    value: make.id,
    label: make.name,
}).from(make)
.where(eq(make.approved, true))
.orderBy(asc(make.name));

export const carModelsQuery = (db: Db, makeId: number) => db.select({
    value: model.id,
    label: model.name,
}).from(model)
.where(and(eq(model.approved, true), eq(model.makeId, makeId)))
.orderBy(asc(model.name));

export const carVersionsQuery = (db: Db, modelId: number) => db.select({
    value: version.id,
    label: version.name,
}).from(version)
.where(and(eq(version.approved, true), eq(version.modelId, modelId)))
.orderBy(asc(version.name));

export const carOptionsQuery = async (db: Db) => {
    const [colors, fuels, transmissions, tractions, regions, makes] = await Promise.all([
        colorsQuery(db),
        fuelsQuery(db),
        transmissionsQuery(db),
        tractionQuery(db),
        regionsQuery(db),
        carMakesQuery(db),
    ]);
    return { colors, fuels, transmissions, tractions, regions, makes };
}

export type CarOptions = Awaited<ReturnType<typeof carOptionsQuery>>;