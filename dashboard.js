document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            const user = await response.json();
            displayUserInfo(user);
        } else {
            alert('Failed to fetch user information.');
            console.error('Error fetching user information:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching user information.');
    }

    // Add event listener to the update button
    document.getElementById('updateBtn').addEventListener('click', handleUpdate);
});

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');

    // Display user information without edit buttons initially
    userInfoDiv.innerHTML = `
        <p><strong>Full Name:</strong> ${user.fullName}</p>
        <p><strong>Blood Group:</strong> ${user.bloodGroup}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>District:</strong> ${user.district}</p>
        <p><strong>Institution:</strong> ${user.institution}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Last Donation:</strong> ${user.lastDonation ? user.lastDonation.split('T')[0] : 'Not Available'}</p>
        <p><strong>Status:</strong> ${user.status ? user.status : 'Not Available'}</p>
        <button id="updateBtn" class="btn btn-primary mt-3">Update Information</button>
    `;
}

function handleUpdate() {
    const userInfoDiv = document.getElementById('userInfo');

    // Fetch existing user information
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }
        return response.json();
    })
    .then(user => {
        // Replace each information line with input fields for editing
        userInfoDiv.innerHTML = `
            <div class="form-group mb-3">
                <label for="fullName" class="mb-1">Full Name:</label>
                <input type="text" class="form-control" id="fullName" placeholder="Full Name" value="${user.fullName}">
            </div>
            <div class="form-group mb-3">
                <label for="bloodGroup" class="mb-1">Blood Group:</label>
                <input type="text" class="form-control" id="bloodGroup" placeholder="Blood Group" value="${user.bloodGroup}">
            </div>
            <div class="form-group mb-3">
                <label for="gender" class="mb-1">Gender:</label>
                <input type="text" class="form-control" id="gender" placeholder="Gender" value="${user.gender}">
            </div>
            <div class="form-group mb-3">
                <label for="district" class="mb-1">District:</label>
                <input type="text" class="form-control" id="district" placeholder="District" value="${user.district}">
            </div>
            <div class="form-group mb-3">
                <label for="institution" class="mb-1">Institution:</label>
                <input type="text" class="form-control" id="institution" placeholder="Institution" value="${user.institution}">
            </div>
            <div class="form-group mb-3">
                <label for="phone" class="mb-1">Phone:</label>
                <input type="text" class="form-control" id="phone" placeholder="Phone" value="${user.phone}">
            </div>
            <div class="form-group mb-3">
                <label for="email" class="mb-1">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Email" value="${user.email}">
            </div>
            <div class="form-group mb-3">
                <label for="lastDonation" class="mb-1">Last Donation:</label>
                <input type="date" class="form-control" id="lastDonation" placeholder="Last Donation" value="${user.lastDonation ? user.lastDonation.split('T')[0] : ''}">
            </div>
            <div class="form-group mb-3">
                <label for="status" class="mb-1">Status:</label>
                <input type="text" class="form-control" id="status" value="${user.status}" readonly>
            </div>
            <button class="btn btn-success mt-3" id="saveBtn">Save</button>
            <button class="btn btn-secondary mt-3 ms-2" id="cancelBtn">Cancel</button>
        `;

        // Attach event listeners to save and cancel buttons
        document.getElementById('saveBtn').addEventListener('click', saveUserInfo);
        document.getElementById('cancelBtn').addEventListener('click', cancelUpdate);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching user information.');
    });
}

async function saveUserInfo() {
    const token = localStorage.getItem('token');
    const updatedUser = {
        fullName: document.getElementById('fullName').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        gender: document.getElementById('gender').value,
        district: document.getElementById('district').value,
        institution: document.getElementById('institution').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        lastDonation: document.getElementById('lastDonation').value
    };

    try {
        const response = await fetch('http://localhost:3000/update-user', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            const updatedUserData = await response.json();
            displayUserInfo(updatedUserData); // Optionally refresh the view with updated user information
            alert('User information updated successfully!');
        } else {
            alert('Failed to update user information.');
            console.error('Error updating user information:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating user information.');
    }

    // After saving, revert back to update button and disable inputs
    document.getElementById('updateBtn').style.display = 'inline-block';
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';

    // Disable input fields again
    const inputs = document.getElementsByClassName('form-control');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('disabled', 'disabled');
    }
}

function cancelUpdate() {
    // Reload user information without editing
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }
        return response.json();
    })
    .then(user => {
        displayUserInfo(user); // Reload user information without editing
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching user information.');
    });

    // Show the update button and hide save/cancel buttons
    document.getElementById('updateBtn').style.display = 'inline-block';
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
}
