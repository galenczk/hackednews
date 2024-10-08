// app/api/fetch-data/route.ts
import { NextResponse } from 'next/server';

// Returns 3 articles from The News API
export async function GET() {
    const apiKey: string | undefined = process.env.THE_NEWS_API_KEY;

    const params = new URLSearchParams({
        api_token: apiKey!,
        //locale: 'us',
        domains: 'propublica.org',
        categories: 'general',
    });

    try {
        // Remove cache: 'no-store' when done testing to limit API calls
        const response = await fetch(
            `https://api.thenewsapi.com/v1/news/top?${params}`
        );
        
        // Uncomment for no caching
        //const response = await fetch(`https://api.thenewsapi.com/v1/news/top?${params}`, {cache: 'no-cache'});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON data

        return NextResponse.json(data); // Return the data to the client
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
