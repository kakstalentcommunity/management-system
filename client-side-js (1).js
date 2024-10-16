// Function to register a new user
async function registerUser(username, password, email, role) {
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, role }),
    });
    return await response.json();
}

// Function to log in a user
async function loginUser(username, password) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return await response.json();
}

// Function to pay fees
async function payFee(studentId, amount, paymentMethod) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/pay_fee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ student_id: studentId, amount, payment_method: paymentMethod }),
    });
    return await response.json();
}

// Function to mark attendance
async function markAttendance(studentId, courseId, status) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/mark_attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ student_id: studentId, course_id: courseId, status }),
    });
    return await response.json();
}

// Example usage:
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const result = await registerUser(username, password, email, role);
    console.log(result);
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const result = await loginUser(username, password);
    if (result.access_token) {
        localStorage.setItem('accessToken', result.access_token);
        console.log('Logged in successfully');
    } else {
        console.error('Login failed');
    }
});
