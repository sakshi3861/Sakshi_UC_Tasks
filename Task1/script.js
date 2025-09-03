const API_BASE = 'https://studentapi-m7a7.onrender.com';
let students = [];
let editingStudentId = null;

document.getElementById('student-form').addEventListener('submit', onFormSubmit);

async function loadStudents() {
    try {
        const res = await fetch(`${API_BASE}/student/all`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        students = data.students;
        displayStudents();
    } catch (e) {
        showMessage('Error loading students: ' + e.message, 'error');
    } 
}

loadStudents();

function displayStudents() {
    const container = document.getElementById('students-container');

    const rows = students.map(student => {
    let actions = '';
    if (!student.isDefault) {
        actions = `<button class="btn-edit" onclick="editStudent('${student._id}')">Edit</button>
                   <button  class="btn-delete" onclick="deleteStudent('${student._id}')">Delete</button>`;
    } else {
        actions = '<span style="color: #666;">Default</span>';
    }

    return `
        <tr>
            <td>${student.studentName}</td>
            <td>${student.college}</td>
            <td>${student.cgpa}</td>
            <td>${student.phone}</td>
            <td>${student.sapid}</td>
            <td>${student.batch}</td>
            <td>${student.year}</td>
            <td>${student.address}</td>
            <td>${actions}</td>
        </tr>
    `;
}).join('');

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>College</th><th>CGPA</th><th>Phone</th><th>SAP ID</th>
                    <th>Batch</th><th>Year</th><th>Address</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function onFormSubmit(event) {
    event.preventDefault();
    if (editingStudentId) updateStudent();
    else addStudent();
}

function getFormData() {
    return {
        studentName: document.getElementById('studentName').value,
        college: document.getElementById('college').value,
        cgpa: parseFloat(document.getElementById('cgpa').value), 
        phone: document.getElementById('phone').value,
        sapid: document.getElementById('sapid').value,
        batch: document.getElementById('batch').value,
        year: document.getElementById('year').value, 
        address: document.getElementById('address').value
    };
}

async function addStudent() {
    const newStudent = getFormData();

    for (let i = 0; i < students.length; i++) {
    if (students[i].sapid === newStudent.sapid) {
        showMessage('SAP ID already exists. Please use a unique SAP ID.');
        return;
    }
}
    try {
        const res = await fetch(`${API_BASE}/student/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newStudent)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        showMessage('Student added successfully!', 'success');
        resetForm();
        loadStudents();
    } catch (e) {
        showMessage(`Error adding student: ${e.message}`, 'error');
    }
}

function editStudent(id) {
    const student = students.find(s => s._id === id);
    if (!student) return;

    editingStudentId = id;

    document.getElementById('studentName').value = student.studentName;
    document.getElementById('college').value = student.college;
    document.getElementById('cgpa').value = student.cgpa;
    document.getElementById('phone').value = student.phone;
    document.getElementById('sapid').value = student.sapid;
    document.getElementById('batch').value = student.batch;
    document.getElementById('year').value = student.year;
    document.getElementById('address').value = student.address;
    setFormMode(true);
}

async function updateStudent() {
    const updated = getFormData();

    if (students.some(s => s.sapid === updated.sapid && s._id !== editingStudentId)) {
        return showMessage('SAP ID already exists. Please use a unique SAP ID.', 'error');
    }

    try {
        const res = await fetch(`${API_BASE}/student/update/${editingStudentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updated)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        showMessage('Student updated successfully!', 'success');
        loadStudents();
    } catch (e) {
        showMessage(`Error updating student: ${e.message}`, 'error');
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
        const res = await fetch(`${API_BASE}/student/delete/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to delete student');

        showMessage('Student deleted successfully!', 'success');
        loadStudents();
    } catch (e) {
        showMessage(`Error deleting student: ${e.message}`, 'error');
    }
}

function resetForm() {
    document.getElementById('student-form').reset();
}

function setFormMode(isEditing) {
    if (isEditing) {
        document.getElementById('form-title').textContent = 'Edit Student';
        document.getElementById('submit-btn').textContent = 'Update Student';
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } else {
        document.getElementById('form-title').textContent = 'Add New Student';
        document.getElementById('submit-btn').textContent = 'Add Student';
    }
}

function showMessage(message) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = message;
    setTimeout(function() {
        msgDiv.textContent = '';
    }, 5000);
}
