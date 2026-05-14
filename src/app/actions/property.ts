'use server';
import { revalidatePath } from 'next/cache';

const DJANGO_API_URL = 'https://balajiproperties-backend.onrender.com';

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    // Extract number
    const numbers = priceStr.replace(',', '').match(/[-+]?\d*\.\d+|\d+/);
    if (!numbers) return 0;
    const val = parseFloat(numbers[0]);
    
    if (priceStr.includes('Cr')) {
        return val * 10000000;
    } else if (priceStr.includes('L')) {
        return val * 100000;
    }
    return val;
}

export async function addProperty(formData: FormData) {
    try {
        console.log('--- Property Submission Started ---');
        
        // 1. Map fields to match Django model
        const image = formData.get('image');
        if (image && image instanceof File) {
            console.log('Processing image:', image.name, 'Size:', image.size);
            formData.append('main_image', image);
            formData.delete('image');
        }

        const priceStr = formData.get('price_display') as string;
        const priceAmount = parsePrice(priceStr);
        console.log('Price Parsed:', priceStr, '=>', priceAmount);
        formData.append('price_amount', priceAmount.toString());
        
        const type = formData.get('type') as string;
        if (type) {
            formData.append('property_type', type);
        }

        // 3. Handle Amenities (Checkboxes are 'on' or missing)
        const amenities = ['has_parking', 'has_lift', 'has_power_backup', 'has_gym', 'has_security', 'has_swimming_pool'];
        amenities.forEach(key => {
            const val = formData.get(key);
            formData.set(key, val === 'on' ? 'true' : 'false');
        });

        console.log('Forwarding request to Django:', `${DJANGO_API_URL}/api/properties/submit/`);

        const response = await fetch(`${DJANGO_API_URL}/api/properties/submit/`, {
            method: 'POST',
            body: formData,
            // Next.js fetch options for handling larger payloads
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Django Error Response:', errorText);
            return { success: false, error: 'The server rejected the data. Please check all fields.' };
        }

        console.log('Property listed successfully!');
        revalidatePath('/properties');
        revalidatePath('/');
        
        return { success: true };
    } catch (error: any) {
        console.error('Fatal Submission Error:', error.message);
        if (error.message.includes('fetch')) {
            return { success: false, error: 'Connection to backend failed. Please try a smaller image.' };
        }
        return { success: false, error: 'Something went wrong during upload. Please try again.' };
    }
}

export async function getProperties(filters: { area?: string; type?: string; status?: string; bhk?: string; min_price?: string; max_price?: string } = {}) {
    try {
        const queryParams = new URLSearchParams();
        if (filters.area) queryParams.append('area', filters.area);
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.bhk) queryParams.append('bhk', filters.bhk);
        if (filters.min_price) queryParams.append('min_price', filters.min_price);
        if (filters.max_price) queryParams.append('max_price', filters.max_price);

        const url = `${DJANGO_API_URL}/api/properties/?${queryParams.toString()}`;
        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) return [];
        
        const data = await response.json();
        return data.results || data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
}

export async function getPropertyById(id: string) {
    try {
        const response = await fetch(`${DJANGO_API_URL}/api/properties/${id}/`, {
            cache: 'no-store'
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function addInquiry(formData: FormData) {
    try {
        console.log('--- Sending Inquiry ---');
        console.log('DEBUG: Target Backend URL is:', DJANGO_API_URL);
        const response = await fetch(`${DJANGO_API_URL}/api/inquiries/submit/`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Django Inquiry Error:', errorText);
            return { success: false, message: 'Failed to send inquiry. Please check your details.' };
        }

        console.log('Inquiry sent successfully!');
        return { success: true };
    } catch (error: any) {
        console.error('Inquiry Connection Error:', error.message);
        return { success: false, message: 'Something went wrong. Please check your internet.' };
    }
}
