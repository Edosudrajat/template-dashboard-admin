// Chart
const ctx = document.getElementById('mainChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Mahasiswa',
            data: [20, 22, 24, 23, 25, 26],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderRadius: 8
        }, {
            label: 'Dosen',
            data: [8, 9, 9, 10, 10, 10],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: { grid: { display: false } }
        }
    }
});

// Sidebar toggle
let sidebarOpen = true;
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('collapseIcon');
    const logoContainer = document.getElementById('logoContainer');
    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {
        sidebar.classList.remove('w-20');
        sidebar.classList.add('w-64');
        icon.classList.remove('bx-chevron-right');
        icon.classList.add('bx-chevron-left');
        logoContainer.classList.remove('justify-center');
        document.querySelectorAll('.sidebar-text').forEach(el => {
            el.classList.remove('hidden', 'opacity-0');
        });
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('justify-center', 'px-0');
            el.classList.add('px-4');
        });
    } else {
        sidebar.classList.remove('w-64');
        sidebar.classList.add('w-20');
        icon.classList.remove('bx-chevron-left');
        icon.classList.add('bx-chevron-right');
        logoContainer.classList.add('justify-center');
        document.querySelectorAll('.sidebar-text').forEach(el => {
            el.classList.add('hidden', 'opacity-0');
        });
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.add('justify-center', 'px-0');
            el.classList.remove('px-4');
        });
    }
}

// Page switching
function switchPage(pageName) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active', 'bg-white/20');
    });

    document.getElementById('page-' + pageName).classList.remove('hidden');
    event.currentTarget.classList.add('active', 'bg-white/20');

    // 🔥 Simpan halaman yang aktif
    localStorage.setItem("activePage", pageName);

    // Search bar tampil hanya di mahasiswa
    const searchBar = document.getElementById('searchBar');
    if (pageName === 'mahasiswa') {
        searchBar.classList.remove('hidden');
    } else {
        searchBar.classList.add('hidden');
    }
}

// 🔥 Load halaman terakhir yang dibuka
function loadPage() {
    const savedPage = localStorage.getItem("activePage") || "dashboard";

    document.querySelectorAll(".page-content").forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById("page-" + savedPage).classList.remove("hidden");

    // set nav item active
    document.querySelectorAll(".nav-item").forEach(item => {
        if (item.getAttribute("onclick") === `switchPage('${savedPage}')`) {
            item.classList.add("active", "bg-white/20");
        }
    });

    // search bar logic
    const searchBar = document.getElementById('searchBar');
    if (savedPage === "mahasiswa") searchBar.classList.remove("hidden");
    else searchBar.classList.add("hidden");
}

// Load theme
function loadTheme() {
    const theme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    if (theme === 'dark') {
        body.classList.add('dark');
        themeIcon.classList.remove("bx-moon");
        themeIcon.classList.add("bx-sun");
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        themeIcon.classList.remove("bx-moon");
        themeIcon.classList.add("bx-sun");
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove("bx-sun");
        themeIcon.classList.add("bx-moon");
        localStorage.setItem('theme', 'light');
    }
}

// Run on start
loadTheme();
loadPage();