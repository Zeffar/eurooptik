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


function processMember(memberEntry, memberType) {
    if (!memberEntry || !memberEntry.fields) return null;
    
    const { fields } = memberEntry;

    const filterId = fields.categorie?.fields?.idFiltru;
    const category = filterId ? [filterId.toString()] : [];

    return {
        name: fields.nume || fields.nume || '', 
        role: fields.titlu || fields.titlu || '', 
        image: fields.fotografie?.fields?.file?.url ? `https:${fields.fotografie.fields.file.url}` : 
               (fields.fotografie?.fields?.file?.url ? `https:${fields.fotografie.fields.file.url}` : ''),
        specializations: fields.specializari || [],
        categories: category,
        type: memberType 
    };
}


export async function fetchTeamFromContentful() {
    await initializeContentful();
    if (!client) return { members: [], locations: [] };

    try {
        const [teamPageResponse, locationResponse] = await Promise.all([
            client.getEntries({ content_type: 'team', include: 3 }), 
            client.getEntries({ content_type: 'locatie', order: 'fields.idFiltru' })
        ]);

        if (!teamPageResponse.items.length) {
            console.error("Intrarea 'Echipa' nu a fost găsită în Contentful.");
            return { members: [], locations: [] };
        }

        const teamFields = teamPageResponse.items[0].fields;
        let allTeamMembers = [];

        (teamFields.listaDoctori || []).forEach(member => {
            allTeamMembers.push(processMember(member, 'doctor'));
        });
        (teamFields.listaAsistenteMedicale || []).forEach(member => {
            allTeamMembers.push(processMember(member, 'asistenta-medicala'));
        });
        (teamFields.listaInfirmiere || []).forEach(member => {
            allTeamMembers.push(processMember(member, 'infirmiera'));
        });
        (teamFields.listaConsilieri || []).forEach(member => {
            allTeamMembers.push(processMember(member, 'consilier'));
        });
        
        allTeamMembers = allTeamMembers.filter(Boolean);

        const locations = locationResponse.items.map(item => ({
            name: item.fields.numeLocatie,
            filterId: item.fields.idFiltru.toString()
        }));

        return { members: allTeamMembers, locations };

    } catch (error) {
        console.error('Eroare la preluarea datelor echipei din Contentful:', error);
        return { members: [], locations: [] };
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


export async function fetchArticlesFromContentful() {
    await initializeContentful(); 
    if (!client) return {};

    try {
        const articleEntries = await client.getEntries({
            content_type: 'articol',
            include: 3 
        });

        const articlesData = articleEntries.items.reduce((acc, entry) => {
            const article = entry.fields;
            const relatedService = article.serviciu?.fields;

            if (relatedService && relatedService.numeServiciu) {
                const serviceName = relatedService.numeServiciu;
                
                acc[serviceName] = {
                    title: article.denumireArticol,
                    slug: article.slug,
                    doctors: (article.doctori || []).map(doc => doc.fields.nume).filter(Boolean),
                    content: article.continutArticol
                };
            }
            return acc;
        }, {});

        console.log("Articles integration successful!");
        return articlesData;

    } catch (error) {
        console.error('Error fetching articles from Contentful:', error);
        return {};
    }
}


export async function fetchArticleBySlug(slug) {
    await initializeContentful();
    if (!client || !slug) return null;

    try {
        const entry = await client.getEntries({
            content_type: 'articol',
            'fields.slug': slug, 
            include: 3,
            limit: 1 
        });

        if (entry.items.length === 0) {
            console.warn(`No article found with slug: ${slug}`);
            return null;
        }

        const article = entry.items[0].fields;
        
        return {
            title: article.denumireArticol,
            doctors: (article.doctori || []).map(doc => doc.fields.nume).filter(Boolean),
            content: article.continutArticol
        };

    } catch (error) {
        console.error(`Error fetching article with slug ${slug}:`, error);
        return null;
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


export async function fetchPricingData() {
    await initializeContentful();
    if (!client) return {};

    try {
        const response = await client.getEntries({
            content_type: 'tarif',
            include: 2,
            limit: 1000
        });

        if (!response.items) return {};

        const pricingData = response.items.reduce((acc, item) => {
            const tarif = item.fields;

            const locationName = tarif.locatie?.fields?.numeLocatie;
            const consultationTypeName = tarif.tipConsultatie?.fields?.tipConsultatie;
            const price = tarif.pret;

            const createKey = (str) => {
                if (!str) return null;
                return str
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            };

            const locationKey = createKey(locationName);
            const consultationKey = createKey(consultationTypeName);

            if (locationKey && consultationKey && typeof price !== 'undefined') {
                if (!acc[locationKey]) {
                    acc[locationKey] = {};
                }
                acc[locationKey][consultationKey] = price;
            } else {
                console.warn('Skipping a tarif entry due to missing data.', {
                    item,
                    derivedLocationKey: locationKey,
                    derivedConsultationKey: consultationKey
                });
            }

            return acc;
        }, {});

        console.log("Pricing data fetched and processed successfully:", pricingData);
        return pricingData;

    } catch (error) {
        console.error('Error fetching pricing data from Contentful:', error);
        return {};
    }
}


export async function fetchSpecializationsData() {
    await initializeContentful();
    if (!client) return { categories: [], specializations: [] };

    try {
        const [categoryResponse, specializationResponse] = await Promise.all([
            client.getEntries({ content_type: 'categorieSpecialitate', order: 'fields.idFiltru' }),
            client.getEntries({ content_type: 'specialitate', include: 3, order: 'sys.createdAt' })
        ]);

        const createKey = (str) => {
            if (!str) return null;
            return str.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        };

        const categories = categoryResponse.items.map(item => ({
            id: item.fields.idFiltru.toString(),
            name: item.fields.numeCategorieSpecialitate,
            slug: createKey(item.fields.numeCategorieSpecialitate)
        }));

        const specializations = specializationResponse.items.map(item => {
            const fields = item.fields;
            if (!fields.numeSpecialitate || !fields.categorieSpecialitate?.fields) return null;

            const testimonialId = fields.testimonial?.sys?.id || null;
            const testimonialQuote = fields.testimonial?.fields?.continutTestimonial || null;
            const testimonialAuthorImage = fields.testimonial?.fields?.pozaTestimonial?.fields?.file?.url ? `https:${fields.testimonial.fields.pozaTestimonial.fields.file.url}` : null;

            const blogSlug = fields.blog?.fields?.slug || null;
            const blogCategorySlug = fields.blog?.fields?.serviciu?.fields?.categorie?.fields?.idServiciu?.toString() || null;

            return {
                slug: createKey(fields.numeSpecialitate),
                cardTitle: fields.numeSpecialitate,
                cardImage: `https:${fields.pozaSpecialitate?.fields?.file?.url || ''}`,
                categorySlug: createKey(fields.categorieSpecialitate.fields.numeCategorieSpecialitate),
                articleTitle: fields.titluSpecialitate,
                articleDescription: fields.descriereSpecialitate,
                articleImage: `https:${fields.pozaSpecialitate?.fields?.file?.url || ''}`,
                
                testimonialId,
                testimonialQuote,
                testimonialAuthorImage,
                blogSlug,
                blogCategorySlug
            };
        }).filter(Boolean);

        console.log("Specializations data fetched successfully:", { categories, specializations });
        return { categories, specializations };

    } catch (error) {
        console.error('Error fetching specializations data from Contentful:', error);
        return { categories: [], specializations: [] };
    }
}