const supabaseUrl = 'https://lqtubwgarrabiwhusytj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdHVid2dhcnJhYml3aHVzeXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzI5MTksImV4cCI6MjA5NjY0ODkxOX0.0TNRfDZCn-y1VY-nw3KcUctqMOi6nxqgelo143rHZDQ';
// সুপাবেস ক্লায়েন্ট ইনিশিয়ালাইজ (আপনার প্রয়োজন হলে ব্যবহার করুন)
// const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    
    // ইউজার নাম সেট করা
    const userName = tg.initDataUnsafe.user?.first_name || 'Player';
    const headerP = document.querySelector('header p');
    if (headerP) headerP.innerText = `Welcome back, ${userName}!`;
    
    // ব্যালেন্স আপডেট (উদাহরণ)
    const balanceDisplay = document.getElementById('balance-display');
    if (balanceDisplay) balanceDisplay.innerText = "৳ 0.00";
});

function processWithdraw() {
    alert("Withdrawal request sent!");
}
