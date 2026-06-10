// সুপাবেস কনফিগারেশন
const supabaseUrl = 'https://lqtubwgarrabiwhusytj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdHVid2dhcnJhYml3aHVzeXRqIiwicm9sZSI6ImxzdXBhYmFzZSIsImlhdCI6MTc4MTA3MjkxOSwiZXhwIjoyMDk2NjQ4OTE5fQ.0TNRfDZCn-y1VY-nw3KcUctqMOi6nxqgelo143rHZDQ'; // আপনার কি এখানে নিরাপদভাবে সেট করা আছে

const supabase = supabase.createClient(supabaseUrl, supabaseKey);
const tg = window.Telegram.WebApp;
tg.expand();

// ইউজার আইডি নির্ধারণ
const userId = tg.initDataUnsafe.user?.id || 'guest_user';

// ১. ব্যালেন্স লোড করার ফাংশন
async function loadBalance() {
    const { data, error } = await supabase
        .from('users')
        .select('balance')
        .eq('telegram_id', userId)
        .single();
    
    if (data) {
        document.getElementById('balance-display').innerText = `৳${data.balance}`;
    }
}

// ২. উইথড্রল প্রসেস লজিক
async function processWithdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    const method = document.getElementById('method').value;
    const accountNumber = document.getElementById('account-number').value;

    if (amount < 20) {
        alert("Minimum withdrawal amount is ৳20!");
        return;
    }

    // ডাটাবেসে উইথড্র রিকোয়েস্ট পাঠানো
    const { data, error } = await supabase
        .from('withdrawals')
        .insert([{ user_id: userId, amount: amount, method: method, status: 'Pending' }]);

    if (error) {
        alert("Failed to submit request: " + error.message);
    } else {
        alert("Withdrawal request submitted successfully!");
        loadBalance(); // ব্যালেন্স আপডেট করা
    }
}

// ৩. রেফারেল লিঙ্ক কপি ও শেয়ার লজিক
function copyLink() {
    const link = document.getElementById('ref-link').innerText;
    navigator.clipboard.writeText(link);
    alert("Referral link copied!");
}

function shareOnTelegram() {
    const link = document.getElementById('ref-link').innerText;
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=Join%20Ads%20Click%20Coin!`;
}

// ৪. পেজ লোড হলে ব্যালেন্স চেক করা
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('balance-display')) {
        loadBalance();
    }
});
