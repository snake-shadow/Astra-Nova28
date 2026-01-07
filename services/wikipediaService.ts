/**
 * Wikipedia Search Service
 * Fetches real facts from Wikipedia before AI formats them
 */

interface WikipediaData {
    title: string;
    extract: string;
    url: string;
}

/**
 * Search Wikipedia and return FULL article content + URL
 */
export async function searchWikipedia(query: string): Promise<WikipediaData | null> {
    try {
        console.log('📚 Searching Wikipedia for:', query);
        
        // Step 1: Search for the article
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(query)}`;
        
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (!searchData.query?.search?.[0]) {
            console.warn('⚠️ No Wikipedia article found for:', query);
            return null;
        }
        
        const pageTitle = searchData.query.search[0].title;
        console.log('📖 Found Wikipedia article:', pageTitle);
        
        // Step 2: Get FULL article content (removed exintro for complete data)
        const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&explaintext&exsectionformat=plain&titles=${encodeURIComponent(pageTitle)}`;
        
        const contentResponse = await fetch(contentUrl);
        const contentData = await contentResponse.json();
        
        const pages = contentData.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract || '';
        
        // Limit to first 8000 characters to avoid overwhelming Groq
        const limitedExtract = extract.length > 8000 ? extract.substring(0, 8000) + '...' : extract;
        
        const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;
        
        console.log('✅ Wikipedia data retrieved:', limitedExtract.length, 'characters');
        
        return {
            title: pageTitle,
            extract: limitedExtract,
            url: wikiUrl
        };
        
    } catch (error) {
        console.error('❌ Wikipedia search failed:', error);
        return null;
    }
}