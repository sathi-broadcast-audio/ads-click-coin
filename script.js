const supabaseUrl = 'https://sfcfliatfpgrlsfyhnax.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmY2ZsaWF0ZnBncmxzZnlobmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMDA1OTQsImV4cCI6MjA5NjU3NjU5NH0.K3wEIvh5vNTm_KPmB0njCv4FDwtMKROTkCN2wj-d7Qk';

const supabase = window.supabase ? supabase.createClient(supabaseUrl, supabaseKey) : null;

document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram?.WebApp;
    if (tg) tg.expand();

    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
        document.getElementById("userName")?.innerText = savedUser.first_name || "User";
        document.getElementById("userId")?.innerText = savedUser.id || "000000";
    }
});
