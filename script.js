import { getData, setData } from './api.js';

// টেলিগ্রাম ওয়েব অ্যাপের ইউজার আইডি নেওয়া
const tg = window.Telegram.WebApp;
tg.ready();
const userId = tg.initDataUnsafe.user?.id || "guest_user";

// ১. মূল আপডেট ফাংশন (যা ব্যালেন্স, রেফারেল ও উইথড্র হিস্ট্রি দেখাবে)
async function updateUI() {
    const userData = await getData(`user_${userId}`) || { 
        balance: 0, 
        tasks: [], 
        referrals: [], 
        history: [] // উইথড্র হিস্ট্রি রাখার জায়গা
    };
    
    // ব্যালেন্স আপডেট
    const balanceElement = document.getElementById('balance');
    if (balanceElement) balanceElement.innerText = userData.balance.toFixed(2);
    
    // রেফারেল লিংক সেট করা
    const refInput = document.getElementById('referralLinkInput');
    if (refInput) refInput.value = `https://t.me/AdsClickCoinBot?start=${userId}`;
    
    // রেফারেল লিস্ট দেখানো (রেফারেল পেজের জন্য)
    const refList = document.getElementById('refer-list');
    if (refList) {
        if (userData.referrals.length === 0) {
            refList.innerHTML = "<p>এখনো কোনো রেফার নেই।</p>";
        } else {
            refList.innerHTML = userData.referrals.map(ref => `
                <div class="card">
                    <p>User ID: ${ref.id}</p>
                    <p>Status: ${ref.balance >= 5 ? '✅ Counted' : '⏳ Pending'}</p>
                </div>
            `).join('');
        }
    }

    // উইথড্র হিস্ট্রি দেখানো (উইথড্র/ওয়ালেট পেজের জন্য)
    const historyList = document.getElementById('withdraw-history');
    if (historyList) {
        if (userData.history.length === 0) {
            historyList.innerHTML = "<p>কোনো হিস্ট্রি নেই।</p>";
        } else {
            historyList.innerHTML = userData.history.map(h => `
                <div class="card">
                    <p>Amount: ${h.amount} Tk</p>
                    <p>Number: ${h.number}</p>
                    <p>Status: <b>${h.status}</b></p>
                </div>
            `).join('');
        }
    }
}

// ২. টাস্ক ক্লিক হ্যান্ডেলার
window.handleTask = async (adLink, taskId) => {
    alert("বিজ্ঞাপন লোড হচ্ছে, ব্যাক করে আবার ক্লিক করুন!");
    window.open(adLink, '_blank');

    setTimeout(async () => {
        let userData = await getData(`user_${userId}`) || { balance: 0, tasks: [] };
        
        if (!userData.tasks.includes(taskId)) {
            userData.balance += 0.50;
            userData.tasks.push(taskId);
            await setData(`user_${userId}`, userData);
            alert("অভিনন্দন! আপনি ০.৫০ টাকা পেয়েছেন।");
            updateUI();
        } else {
            alert("আপনি এই টাস্কটি আগেই করেছেন!");
        }
    }, 30000);
};

// ৩. উইথড্র হ্যান্ডলার (হিস্ট্রি যুক্ত করার লজিক)
window.submitWithdraw = async () => {
    const walletNum = document.getElementById('walletNum').value;
    if (!walletNum) return alert("নম্বর দিন!");

    let userData = await getData(`user_${userId}`) || { balance: 0, history: [] };
    
    if (userData.balance >= 50) {
        userData.balance -= 50;
        userData.history.push({ amount: 50, status: "Pending", number: walletNum });
        await setData(`user_${userId}`, userData);
        alert("উইথড্র রিকোয়েস্ট সফল!");
        updateUI();
    } else {
        alert("ন্যূনতম ৫০ টাকা ব্যালেন্স প্রয়োজন!");
    }
};

updateUI();
