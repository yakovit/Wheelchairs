// טוען את רשימת המועדפים מ-localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const container = document.getElementById("favoritesContainer");

// בדיקה אם יש מועדפים
if (favorites.length === 0) {
    container.innerHTML = "<p>אין מועדפים להצגה.</p>";
} else {
    // יצירת כרטיסיות לכל פריט במועדפים
    favorites.forEach(title => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">פרטים נוספים על ${title}.</p>
                <button class="btn btn-danger remove-favorite" data-title="${title}">הסר מהמועדפים</button>
            </div>
        `;
        container.appendChild(card);
    });

    // הוספת פונקציה להסרת מועדפים
    document.querySelectorAll(".remove-favorite").forEach(button => {
        button.addEventListener("click", function () {
            const title = this.getAttribute("data-title");
            removeFromFavorites(title);
            this.parentElement.parentElement.remove(); // הסרת הכרטיסיה מהעמוד
        });
    });
}

// פונקציה להסרת מועדפים מ-localStorage
function removeFromFavorites(title) {
    const index = favorites.indexOf(title);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${title} הוסר מהמועדפים.`);
    }

    // עדכון הודעת "אין מועדפים" אם הרשימה ריקה
    if (favorites.length === 0) {
        container.innerHTML = "<p>אין מועדפים להצגה.</p>";
    }
}
