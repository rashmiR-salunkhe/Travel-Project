
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

const searchableSections = [
    { name: 'packages', selector: '.packages .box', containerSelector: '.packages' },
    { name: 'adventures', selector: '.category .box', containerSelector: '.category' }
];

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') return;

    let found = false;

    for (const section of searchableSections) {
        const elements = document.querySelectorAll(section.selector);
        
        for (const element of elements) {
            const title = element.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                scrollToElement(element, section.containerSelector);
                highlightElement(element);
                found = true;
                searchInput.value = ''; 
                return; 
            }
        }
    }

    if (!found) {
        alert('No matching packages or adventures found. Please try another search term.');
    }
}

function scrollToElement(element, containerSelector) {
    const container = document.querySelector(containerSelector);
    
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

function highlightElement(element) {

    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });

    element.classList.add('search-highlight');

    setTimeout(() => {
        element.classList.remove('search-highlight');
    }, 3000);
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

console.log('Search functionality initialized');

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        subject: this.subject.value,
        message: this.message.value
    };

    try {
        const response = await fetch('http://localhost:8081/contact/submit', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const message = await response.text();
        alert('Success: ' + message);
        document.getElementById('contactForm').reset(); 

    } catch (error) {
        console.error('There was an error!', error);
        alert('There was an error submitting the form. Please try again later.');
    }
});
