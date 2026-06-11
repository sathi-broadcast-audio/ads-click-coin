import { Redis } from '@upstash/redis';

// আপনার প্রদান করা ডাটাবেস কনফিগারেশন
const redis = new Redis({
  url: 'https://star-chigger-146667.upstash.io',
  token: 'gQAAAAAAAjzrAAIgcDIwMTkxYjJiNzc5Y2Q0M2JiOWY5ZDQ1NjFlZTE4MThlNg',
});

// ডাটা আনার ফাংশন (getData)
export async function getData(key) {
    try {
        const data = await redis.get(key);
        return data; // এটি সরাসরি ডাটা রিটার্ন করবে
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// ডাটা সেভ করার ফাংশন (setData)
export async function setData(key, value) {
    try {
        await redis.set(key, value);
    } catch (error) {
        console.error("Error setting data:", error);
    }
}
