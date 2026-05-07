const socket = io();

let currentUser = '';

function joinDashboard() {
    const username = document.getElementById('username').value;

    if (username.trim() === '') {
        alert('Please enter your name');
        return;
    }

    currentUser = username;
    socket.emit('joinDashboard', username);
}

function changeStatus() {
    if (currentUser === '') {
        alert('Please join the dashboard first');
        return;
    }

    const status = document.getElementById('statusSelect').value;

    socket.emit('changeStatus', {
        username: currentUser,
        status: status
    });
}

socket.on('updateUsers', (users) => {
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('user-card');

        div.innerHTML = `
            <h3>${user.username}</h3>
            <p><strong>Status:</strong> ${user.status}</p>
        `;

        usersDiv.appendChild(div);
    });
});

socket.on('notification', (message) => {
    const notificationsDiv = document.getElementById('notifications');

    const p = document.createElement('p');
    p.textContent = message;

    notificationsDiv.prepend(p);
});