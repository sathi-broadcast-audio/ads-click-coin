// api.js - সংশোধিত ফাইল
const REST_URL = "https://star-chigger-146667.upstash.io";
const REST_TOKEN = "gQAAAAAAAjzrAAIgcDIwMTkxYjJiNzc5Y2Q0M2JiOWY5ZDQ1NjFlZTE4MThlNg";

export async function getData(key) {
    try {
        const response = await fetch(`${REST_URL}/get/${key}`, {
            headers: { Authorization: `Bearer ${REST_TOKEN}` }
        });
        const data = await response.json();
        // ডাটাবেসে ডাটা না থাকলে null রিটার্ন করবে
        return data.result ? JSON.parse(data.result) : null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export async function setData(key, value) {
    try {
        // REST API-তে সেট করার জন্য POST মেথড ব্যবহার করা শ্রেয়
        await fetch(`${REST_URL}/set/${key}`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${REST_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
    } catch (error) {
        console.error("Error setting data:", error);
    }
}
