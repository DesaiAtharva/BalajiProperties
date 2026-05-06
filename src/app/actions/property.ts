'use server';
import { revalidatePath } from 'next/cache';
import { Property } from '@/components/PropertyCard';

// This is a temporary in-memory store for demonstration.
// IN PRODUCTION: Use Vercel Postgres or another database.
// To use Vercel Postgres:
// 1. Run: npm install @vercel/postgres
// 2. Uncomment the database code below and configure your .env
/*
import { sql } from '@vercel/postgres';

export async function createProperty(data: any) {
  try {
    await sql`
      INSERT INTO properties (title, price, location, area, type, bhk, bathrooms, sqft, image, status)
      VALUES (${data.title}, ${data.price}, ${data.location}, ${data.area}, ${data.type}, ${data.bhk}, ${data.bathrooms}, ${data.sqft}, ${data.image}, ${data.status})
    `;
    revalidatePath('/properties');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to create property' };
  }
}
*/

// Mocked storage for now (will only persist in the same server instance)
let mockProperties: Property[] = [];

export async function addProperty(formData: FormData) {
  const imageFile = formData.get('image') as File;
  let imageBase64 = '';

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imageBase64 = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  }

  const data: Property = {
    id: Math.random().toString(36).substr(2, 9),
    title: formData.get('title') as string,
    price: formData.get('price') as string,
    location: formData.get('location') as string,
    area: formData.get('area') as string,
    type: formData.get('type') as string,
    bhk: parseInt(formData.get('bhk') as string),
    bathrooms: parseInt(formData.get('bathrooms') as string),
    sqft: parseInt(formData.get('sqft') as string),
    image: imageBase64 || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    status: formData.get('status') as 'For Sale' | 'For Rent',
    featured: false,
  };

  console.log('Adding property with image size:', imageFile?.size);
  
  mockProperties.push(data);
  
  revalidatePath('/properties');
  revalidatePath('/');
  
  return { success: true };
}

// Function to get properties (merging static and dynamic)
export async function getProperties() {
  // In a real app, this would fetch from the database
  // return [...staticProperties, ...databaseProperties];
  return mockProperties;
}
