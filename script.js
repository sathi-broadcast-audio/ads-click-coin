import { getData, setData } from './api.js';

// টেলিগ্রাম ওয়েব অ্যাপের ইউজার আইডি নেওয়া
const tg = window.Telegram.WebApp;
tg.ready();
const userId = tg.initDataUnsafe.user?.id || "guest_user";

// ১. মূল ব্যালেন্স আপডেট ও রেফারেল কাউন্ট আপডেট করার ফাংশন
async function updateUI() {
    const userData = await getData(`user_${userId}`) || { balance: 0, tasks: [], referrals: [] };
    
    // ব্যালেন্স আপডেট
    const balanceElement = document.getElementById('balance');
    if (balanceElement) balanceElement.innerText = userData.balance.toFixed(2);
    
    // রেফারেল লিংক সেট করা (রেফারেল পেজের জন্য)
    const refInput = document.getElementById('referralLinkInput');
    if (refInput) refInput.value = `https://t.me/AdsClickCoinBot?start=${userId}`;
    
    // রেফারেল হিস্ট্রি দেখানো (রেফারেল পেজের জন্য)
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
}

// ২. টাস্ক ক্লিক হ্যান্ডেলার (আপনার ৮ নম্বর ফাইলের কোড অক্ষুণ্ণ রাখা হয়েছে)
window.handleTask = async (adLink, taskId) => {
    alert("বিজ্ঞাপন লোড হচ্ছে, ব্যাক করে আবার ক্লিক করুন!");
    window.open(adLink, '_blank');

    setTimeout(async () => {
        let userData = await getData(`user_${userId}`) || { balance: 0, tasks: [], referrals: [] };
        
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

// অ্যাপ ওপেন হওয়ার সাথে সাথে ব্যালেন্স ও রেফারেল ডাটা লোড করা
updateUI();
