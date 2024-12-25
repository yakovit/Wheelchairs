document.getElementById("searchButton").addEventListener("click", function () {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    // משתנה לבדיקה אם יש תוצאות
    let found = false;

    cards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        if (title.includes(searchValue)) {
            card.parentElement.style.display = "block";
            found = true;
        } else {
            card.parentElement.style.display = "none";
        }
    });

    // אם לא נמצאו תוצאות
    if (!found) {
        alert("לא נמצאו תוצאות עבור החיפוש שלך.");
    }
});
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// משתנה מועדפים (הוסר כפילות) ✅
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// עדכון הלבבות במצב טעינה ✅
document.querySelectorAll(".favorite-icon").forEach(icon => {
    const cardTitle = icon.parentElement.querySelector(".card-title").textContent;

    // אם הכרטיסיה במועדפים - הופך את הלב לאדום
    if (favorites.includes(cardTitle)) {
        icon.classList.add("active");
    }

    // האזנה ללחיצה על הלב
    icon.addEventListener("click", function () {
        if (icon.classList.contains("active")) {
            icon.classList.remove("active");
            removeFromFavorites(cardTitle); // ✅
        } else {
            icon.classList.add("active");
            addToFavorites(cardTitle); // ✅
        }
    });
});

// פונקציה להוספה למועדפים ✅
function addToFavorites(title) {
    if (!favorites.includes(title)) {
        favorites.push(title);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${title} נוסף למועדפים!`);
    }
}

// פונקציה להסרה מהמועדפים ✅
function removeFromFavorites(title) {
    const index = favorites.indexOf(title);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${title} הוסר מהמועדפים.`);
    }
}

// עמוד מועדפים (וידוא קיום הקונטיינר) ✅
const favoritesContainer = document.getElementById("favoritesContainer");

if (favoritesContainer) {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>אין מועדפים להצגה.</p>";
    } else {
        favorites.forEach(title => {
            const card = document.createElement("div");
            card.classList.add("card", "mb-3");
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">תיאור קצר על ${title}.</p>
                </div>
            `;
            favoritesContainer.appendChild(card);
        });
    }
}
