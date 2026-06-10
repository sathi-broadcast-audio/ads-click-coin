// সুপাবেস কানেকশন
const supabaseUrl = 'https://lqtubwgarrabiwhusytj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdHVid2dhcnJhYml3aHVzeXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzI5MTksImV4cCI6MjA5NjY0ODkxOX0.0TNRfDZCn-y1VY-nw3KcUctqMOi6nxqgelo143rHZDQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// পেজ লোড ও ইউজার ডাটা হ্যান্ডলিং
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    const userName = tg.initDataUnsafe.user?.first_name || 'Player';
    
    // হোম পেজের নাম আপডেট
    const headerP = document.querySelector('header p');
    if (headerP) headerP.innerText = `Welcome back, ${userName}!`;
    
    // প্রোফাইল পেজের নাম আপডেট
    const profileName = document.getElementById('user-name');
    if (profileName) profileName.innerText = userName;
});
