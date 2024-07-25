document.addEventListener('DOMContentLoaded', async () => {
    // Fetch all blood group cards
    const bloodGroupCards = document.querySelectorAll('.blood-group-card');

    // Attach click event listeners to each blood group card
    bloodGroupCards.forEach(card => {
        card.addEventListener('click', async () => {
            const bloodGroup = card.querySelector('.card-title').innerText.trim();
            await fetchAndDisplayDonors(bloodGroup);
        });
    });
});

async function fetchAndDisplayDonors(bloodGroup) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first.');
            return;
        }

        const response = await fetch(`http://localhost:3000/find_donor/${bloodGroup}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            // Check for error response status and handle it
            if (response.status === 401) {
                alert('Unauthorized. Please login again.');
                window.location.href = 'login.html'; // Redirect to login page if unauthorized
            } else {
                throw new Error('Failed to fetch donors');
            }
        }

        const donors = await response.json();
        displayDonors(donors);
    } catch (error) {
        console.error('Error fetching donors:', error);
        alert('Failed to fetch donors. Please try again.');
    }
}

function displayDonors(donors) {
    const donorListDiv = document.getElementById('donorList');
    donorListDiv.innerHTML = ''; // Clear previous donor list

    if (donors.length === 0) {
        donorListDiv.innerHTML = '<p>No eligible donors found.</p>';
        return;
    }

    const donorList = document.createElement('div');
    donorList.classList.add('row', 'mt-3');

    donors.forEach(donor => {
        const donorCard = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${donor.fullName}</h5>
                        <p class="card-text"><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
                        <p class="card-text"><strong>Phone:</strong> ${donor.phone}</p>
                        <p class="card-text"><strong>Email:</strong> ${donor.email}</p>
                        <p class="card-text"><strong>Last Donation:</strong> ${donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'Not Available'}</p>
                        <p class="card-text"><strong>Status:</strong> ${donor.status}</p>
                    </div>
                </div>
            </div>
        `;
        donorList.innerHTML += donorCard;
    });

    donorListDiv.appendChild(donorList);
}
