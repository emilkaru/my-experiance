async function constructList(language) {
    const storyContainer = document.getElementById("storyContainer");
    const storyInfo = await loadJSON("story.json");
    let output = "";
    for (const block of storyInfo) {
        output += "<div class=\"eventBlock\">"
        for (const section of block[language]) {
            switch (section.type) {
                case "title":
                    output += `<p class="title">${section.text}</p>`;
                    break
                case "text":
                    output += `<p class="paragraph">${section.text}</p>`;
                    break
                case "images":
                    output += `<div class="imageGallery">`
                    for (const image of section.images) {
                        output += 
                            `<div class="imageWrapper">
                                <img src="${image.image}" alt="${image.description}">
                                <p class="description">${image.description}</p>
                            </div>`
                    }
                    output += `</div>`
                    
            }
        }
        output += "</div>";
    }
    storyContainer.innerHTML = output;
}


async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {constructList("est")});
