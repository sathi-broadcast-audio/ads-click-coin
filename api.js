// api.js - ডাটাবেসের সাথে যোগাযোগের ফাইল

const REST_URL = "https://star-chigger-146667.upstash.io";
const REST_TOKEN = "gQAAAAAAAjzrAAIgcDIwMTkxYjJiNzc5Y2Q0M2JiOWY5ZDQ1NjFlZTE4MThlNg";

// ডাটাবেস থেকে ডাটা আনার ফাংশন
export async function getData(key) {
    const response = await fetch(`${REST_URL}/get/${key}`, {
        headers: { Authorization: `Bearer ${REST_TOKEN}` }
    });
    const data = await response.json();
    return data.result ? JSON.parse(data.result) : null;
}

// ডাটাবেসে ডাটা পাঠানোর ফাংশন
export async function setData(key, value) {
    await fetch(`${REST_URL}/set/${key}/${JSON.stringify(value)}`, {
        headers: { Authorization: `Bearer ${REST_TOKEN}` }
    });
}
