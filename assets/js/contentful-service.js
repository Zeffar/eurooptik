let client = null;

async function initializeContentful() {
    if (client) {
        return client;
    }

    let spaceId = "__CONTENTFUL_SPACE_ID__";
    let accessToken = "__CONTENTFUL_ACCESS_TOKEN__";

    try {
        const config = await import('./config.js');
        spaceId = config.CONTENTFUL_SPACE_ID;
        accessToken = config.CONTENTFUL_ACCESS_TOKEN;
        console.log("Loaded credentials from local config.js");
    } catch (error) {
        console.log("config.js not found. Using production placeholders.");
    }

    if (spaceId.startsWith("__")) {
        console.warn("Contentful API keys are not set. API calls will fail.");
        return null; 
    }

    client = contentful.createClient({
        space: spaceId,
        accessToken: accessToken,
    });
    
    return client;
}

export { initializeContentful };

export async function fetchDataFromContentful() {
    await initializeContentful();

    if (!client) return { doctors: [], locations: [] };

    try {
        const [doctorResponse, locationResponse] = await Promise.all([
            client.getEntries({ content_type: 'doctor', include: 2, order: 'fields.numeDoctor' }),
            client.getEntries({ content_type: 'locatie', order: 'fields.idFiltru' })
        ]);

        const doctors = doctorResponse.items.map(item => {
            const { fields } = item;
            const filterId = fields.categorie?.fields?.idFiltru;
            const category = filterId ? [filterId.toString()] : [];
        
            return {
                name: fields.numeDoctor || '',
                role: fields.titluDoctor || '',
                image: fields.fotografieDoctor?.fields?.file?.url ? `https:${fields.fotografieDoctor.fields.file.url}` : '',
                specializations: fields.specializari || [],
                categories: category 
            };
        });

        const locations = locationResponse.items.map(item => ({
            name: item.fields.numeLocatie,
            filterId: item.fields.idFiltru.toString() 
        }));

        return { doctors, locations };

    } catch (error) {
        console.error('Error fetching doctors/locations from Contentful:', error);
        return { doctors: [], locations: [] };
    }
}

export async function fetchServicesFromContentful() {
    await initializeContentful();
    if (!client) return { servicesData: {}, categories: [] };

    try {
        const [serviceEntries, categoryEntries] = await Promise.all([
            client.getEntries({ content_type: 'serviciu', include: 2, limit: 1000 }),
            client.getEntries({ content_type: 'categorieServiciu', order: 'fields.idServiciu' }) 
        ]);

        const servicesData = serviceEntries.items.reduce((acc, item) => {
            const service = item.fields;
            const categorySlug = service.categorie?.fields?.idServiciu; 

            if (!categorySlug || !service.numeServiciu || !service.pretServiciu) {
                return acc;
            }
            
            const serviceName = service.numeServiciu;
            const servicePrice = service.pretServiciu;
            const subCategory = service.subcategorie;

            if (!acc[categorySlug]) acc[categorySlug] = {};

            if (subCategory?.fields?.numeSubcategorieServiciu) {
                const subCategoryName = subCategory.fields.numeSubcategorieServiciu;
                if (!acc[categorySlug][subCategoryName]) acc[categorySlug][subCategoryName] = {};
                acc[categorySlug][subCategoryName][serviceName] = servicePrice;
            } else {
                if (!acc[categorySlug].items) acc[categorySlug].items = {};
                acc[categorySlug].items[serviceName] = servicePrice;
            }
            return acc;
        }, {});

        const categories = categoryEntries.items.map(item => ({
            name: item.fields.numeCategorieServiciu,
            slug: item.fields.idServiciu?.toString() || null 
        })).filter(cat => cat.slug && cat.name);

        console.log("Services integration successful!");

        return { servicesData, categories };

    } catch (error) {
        console.error('Error fetching services from Contentful:', error);
        return { servicesData: {}, categories: [] };
    }
}

export async function fetchTestimonialsFromContentful() {
    await initializeContentful();
    if (!client) return [];

    try {
        const response = await client.getEntries({
            content_type: 'testimonial', 
            limit: 6,                   
            order: '-sys.createdAt',  
        });

        if (!response.items) return [];

        const testimonials = response.items.map(item => {
            const { numeClient, continutTestimonial, pozaTestimonial } = item.fields;
            
            if (!numeClient || !continutTestimonial || !pozaTestimonial?.fields?.file?.url) {
                return null;
            }

            return {
                id: item.sys.id,
                author: numeClient,
                quote: continutTestimonial,
                imageUrl: `https:${pozaTestimonial.fields.file.url}?w=400&h=400&fit=crop&fm=jpg&q=80`
            };
        }).filter(Boolean); 

        return testimonials;

    } catch (error) {
        console.error('Error fetching testimonials from Contentful:', error);
        return []; 
    }
}