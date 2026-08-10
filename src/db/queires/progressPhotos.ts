import { desc, eq } from "drizzle-orm";
import { db } from "../client";
import { NewProgressPhoto, progressPhotos } from "../schema";

export const getAllProgressPhotos = () => {
  return db
    .select()
    .from(progressPhotos)
    .orderBy(desc(progressPhotos.createdAt));
};

export const insertProgressPhoto = (photo: NewProgressPhoto) => {
  return db
    .insert(progressPhotos)
    .values(photo);
};

export const deleteProgressPhoto = (id: string) => {
  return db
    .delete(progressPhotos)
    .where(eq(progressPhotos.id, id));
};