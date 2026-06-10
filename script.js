import { getData, setData } from './api.js';

// টেলিগ্রাম ওয়েব অ্যাপের ইউজার আইডি নেওয়া
const tg = window.Telegram.WebApp;
tg.ready();
const userId = tg.initDataUnsafe.user?.id || "guest_user";

// পেজ লোড হলে ব্যালেন্স আপডেট করা (ইন্ডেক্স বা ওয়ালেট পেজের জন্য)
async function updateBalanceDisplay() {
    const userData = await getData(`user_${userId}`) || { balance: 0, tasks: [] };
    const balanceElement = document.getElementById('balance');
    if (balanceElement) balanceElement.innerText = userData.balance.toFixed(2);
}

// টাস্ক ক্লিক হ্যান্ডেলার
window.handleTask = async (adLink, taskId) => {
    // পপ-আন্ডার দেখানোর মেসেজ
    alert("বিজ্ঞাপন লোড হচ্ছে, ব্যাক করে আবার ক্লিক করুন!");
    window.open(adLink, '_blank');

    // ৩০ সেকেন্ড পর পেমেন্ট যোগ করার লজিক
    setTimeout(async () => {
        let userData = await getData(`user_${userId}`) || { balance: 0, tasks: [] };
        
        // একই টাস্ক যেন বারবার না করা যায়
        if (!userData.tasks.includes(taskId)) {
            userData.balance += 0.50; // প্রতি টাস্কের দাম ৫০ পয়সা
            userData.tasks.push(taskId);
            
            await setData(`user_${userId}`, userData);
            alert("অভিনন্দন! আপনি ০.৫০ টাকা পেয়েছেন।");
            updateBalanceDisplay();
        } else {
            alert("আপনি এই টাস্কটি আগেই করেছেন!");
        }
    }, 30000); // ৩০ সেকেন্ড অপেক্ষা
};

// অ্যাপ ওপেন হওয়ার সাথে সাথে ব্যালেন্স লোড করা
updateBalanceDisplay();
