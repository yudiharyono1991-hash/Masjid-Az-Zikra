export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Masjid Tazkia YouTube Channel RSS feed
    const channelId = "UC5107eQh328s76H_mZ34Sog";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }
    
    const xml = await response.text();
    
    // Parse video IDs and titles from XML
    const videoMatches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)];
    const titleMatches = [...xml.matchAll(/<title>([^<]+)<\/title>/g)];
    const thumbMatches = [...xml.matchAll(/<media:thumbnail[^>]+url="([^"]+)"/g)];
    
    const videos = videoMatches.slice(0, 6).map((m, i) => ({
      id: m[1],
      title: titleMatches[i + 1]?.['1'] || `Video ${i + 1}`,
      thumbnail: thumbMatches[i]?.['1'] || `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,
    }));
    
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate'); // Vercel cache 30 min
    return res.status(200).json({ videos, channelId });
  } catch (err: any) {
    console.error("YouTube RSS fetch error:", err.message);
    // Return fallback hardcoded videos if fetch fails
    return res.status(200).json({ 
      videos: [
        { id: "UBxFbTbs8i4", title: "Kajian Rutin Masjid Tazkia", thumbnail: `https://img.youtube.com/vi/UBxFbTbs8i4/hqdefault.jpg` },
        { id: "UBxFbTbs8i4", title: "Video Terbaru Masjid Tazkia", thumbnail: `https://img.youtube.com/vi/UBxFbTbs8i4/maxresdefault.jpg` },
      ],
      fallback: true
    });
  }
}
