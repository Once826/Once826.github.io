const profileData = {
    about: {
        Name: "Botond Brem",
        Birthdate: "August 26, 2000",
        Educations: ["Bachelor's in Informatics", "Master's in Data Science"],
        University: ["Babes-Bolyai University"]
    },
    experience: [
        { role: "Software Engineer", company: "Flow Traders", years: "2023-2024" },
        { role: "Software Development Engineer", company: "Yardi", years: "2022-Present" }
    ],
    hobbies: ["LEGO", "Movies", "Reading"]
};

function createSection(id, title, content) {
    const section = document.getElementById(id);
    const heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    if (typeof content === "string") {
        const paragraph = document.createElement("p");
        paragraph.textContent = content;
        section.appendChild(paragraph);
    } else if (Array.isArray(content)) {
        const list = document.createElement("ul");
        content.forEach(item => {
            const listItem = document.createElement("li");
            if (typeof item === "object") {
                listItem.textContent = `${item.role} at ${item.company} (${item.years})`;
            } else {
                listItem.textContent = item;
            }
            list.appendChild(listItem);
        });
        section.appendChild(list);
    } else if (typeof content === "object") {
        const list = document.createElement("ul");
        for (const [key, value] of Object.entries(content)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${key}: ${value}`;
            list.appendChild(listItem);
        }
        section.appendChild(list);
    }
}

// Populate sections dynamically
document.addEventListener("DOMContentLoaded", () => {
    createSection("about", "About Me", profileData.about);

    createSection("experience", "Experience & Education", profileData.experience);
    createSection("hobbies", "Hobbies & Passions", profileData.hobbies);

    // Animation on scroll
    const sections = document.querySelectorAll("section");
    const revealOnScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const sectionId = link.getAttribute("href").slice(1);

        if (sectionId === "home") {
            sections.forEach(sec => sec.classList.remove("hidden"));
        } else {
            const section = document.getElementById(sectionId);

            sections.forEach(sec => sec.classList.add("hidden"));

            section.classList.remove("hidden");
            const rect = section.getBoundingClientRect();

            window.scrollTo({
                top: rect.top + window.scrollY,
                behavior: "smooth"
            });
        }
    });
});