
const spaceId = "__CONTENTFUL_SPACE_ID__";
const accessToken = "__CONTENTFUL_ACCESS_TOKEN__";

const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
});

if (spaceId.startsWith("__")) {
    console.warn("Contentful API keys are not set. This is expected in local development. The site will not fetch data.");
}


async function fetchDataFromContentful() {
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

async function fetchServicesFromContentful() {
    try {
        const [serviceEntries, categoryEntries] = await Promise.all([
            client.getEntries({ content_type: 'serviciu', include: 2, limit: 1000 }),
            client.getEntries({ content_type: 'categorieServiciu', order: 'fields.idServiciu' }) 
        ]);

        const servicesData = serviceEntries.items.reduce((acc, item) => {
            const service = item.fields;
            const categorySlug = service.categorie?.fields?.idServiciu; 

            if (!categorySlug) {
                return acc;
            }
            if (!service.numeServiciu || !service.pretServiciu) {
                return acc;
            }
            
            const serviceName = service.numeServiciu;
            const servicePrice = service.pretServiciu;
            const subCategory = service.subcategorie;

            if (!acc[categorySlug]) {
                acc[categorySlug] = {};
            }

            if (subCategory && subCategory.fields && subCategory.fields.numeSubcategorieServiciu) {
                const subCategoryName = subCategory.fields.numeSubcategorieServiciu;
                if (!acc[categorySlug][subCategoryName]) {
                    acc[categorySlug][subCategoryName] = {};
                }
                acc[categorySlug][subCategoryName][serviceName] = servicePrice;
            } else {
                if (!acc[categorySlug].items) {
                    acc[categorySlug].items = {};
                }
                acc[categorySlug].items[serviceName] = servicePrice;
            }
            return acc;
        }, {});

        const categories = categoryEntries.items.map(item => ({
            name: item.fields.numeCategorieServiciu,
            slug: item.fields.idServiciu?.toString() || null 
        })).filter(cat => cat.slug && cat.name);

        console.log("✅ Services integration successful!");

        return { servicesData, categories };

    } catch (error) {
        console.error('Error fetching services from Contentful:', error);
        return { servicesData: {}, categories: [] };
    }
}