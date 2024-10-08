let limit = 12; // Number of posts so onscroll can activate (being able to scroll)
let offset = 0; // Where we start fetching data

// Function that fetches data from API using AJAX
function getAPIdata() {
    const APIdata = new XMLHttpRequest(); // New object to send a request
    // APIdata opens a connection to the API
    APIdata.open("GET", `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${offset}`, true);

    // after request, we handle the response
    APIdata.onload = function () {
        if (APIdata.status === 200) {
            // When status is 200, then status is ok
            const posts = JSON.parse(APIdata.responseText); // data becomes a javascript object
            let data = document.getElementById("jsP2"); // Where to put new data (the new posts)

            // function that creates html articles to place each post
            posts.forEach((post) => {
                const article = document.createElement("article"); // Creates an article
                const title = document.createElement("h1"); // Creates an h1 title
                const text = document.createElement("p"); // Creates a paragraph

                title.textContent = post.title; // add context to the role/importance of the text
                text.textContent = post.body; // ex. text vs the title

                article.appendChild(title); // Add the title to the html article
                article.appendChild(text); // Add the text
                data.appendChild(article); // Adds everything into the existing html section
            });
            offset += limit; // Updates offset so more posts can load
        }
    };
    APIdata.send(); // sends AJAX request
}
// Initialize when the page loads
getAPIdata();

// Onscroll fetches more posts when user scrolls
window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 150) {
        getAPIdata();
    }
};
