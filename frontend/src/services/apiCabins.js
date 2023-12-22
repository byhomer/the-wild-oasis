import { tr } from 'date-fns/locale';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be fetched from the database');
  }

  return data;
}

export async function createOrEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );
  //https://affejlibtxiccjhrqlak.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create / Edit cabin in the database
  let query = supabase.from('cabins');
  //a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //b) edit
  else query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  //2. Add PhotoFile to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if the image upload failed
  if (storageError) {
    console.log(storageError);
    await deleteCabin(data.id);
    throw new Error('Cabin image could not be uploaded');
  }
  return data;
}

export async function deleteCabin(id) {
  console.log('deleteCabin', id);
  let { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted from the database');
  }

  return true;
}
