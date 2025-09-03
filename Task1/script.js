const API_BASE = 'https://studentapi-m7a7.onrender.com';
let students = [];
let editingStudentId = null;

const yearMap = {
    1: "First Year",
    2: "Second Year",
    3: "Third Year",
    4: "Fourth Year"
};

document.getElementById('student-form').addEventListener('submit', onFormSubmit);

async function loadStudents() {
    try {
        const res = await fetch(`${API_BASE}/student/all`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load students');

        students = data.students || [];
        displayStudents();
    } catch (e) {
        showMessage('Error loading students: ' + e.message, 'error');
    } 
}

loadStudents();

function displayStudents() {
    const container = document.getElementById('students-container');
    if (!students.length) {
        container.innerHTML = '<p>No students found.</p>';
        return;
    }

    const rows = students.map(student => {
        const canModify = !student.isDefault; 

        return `
            <tr>
                <td>${student.studentName || ''}</td>
                <td>${student.college || ''}</td>
                <td>${student.cgpa || ''}</td>
                <td>${student.phone || ''}</td>
                <td>${student.sapid || ''}</td>
                <td>${student.batch || ''}</td>
                <td>${student.year || ''}</td>
                <td>${student.address || ''}</td>
                <td class="actions">
                    ${
                      canModify
                        ? `<button class="btn-edit" onclick="editStudent('${student._id}')">Edit</button>
                           <button class="btn-delete" onclick="deleteStudent('${student._id}')">Delete</button>`
                        : '<span style="color: #666;">Default</span>'
                    }
                </td>
            </tr>`;
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
    let yearValue = document.getElementById('year').value;
    return {
        studentName: document.getElementById('studentName').value,
        college: document.getElementById('college').value,
        cgpa: parseFloat(document.getElementById('cgpa').value),
        phone: document.getElementById('phone').value,
        sapid: document.getElementById('sapid').value,
        batch: document.getElementById('batch').value,
        year: yearMap[yearValue] || '',
        address: document.getElementById('address').value,
    };
}

async function addStudent() {
    const newStudent = getFormData();

    if (students.some(s => s.sapid === newStudent.sapid)) {
        return showMessage('SAP ID already exists. Please use a unique SAP ID.', 'error');
    }

    try {
        const res = await fetch(`${API_BASE}/student/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newStudent)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to add student');

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

    document.getElementById('studentName').value = student.studentName || '';
    document.getElementById('college').value = student.college || '';
    document.getElementById('cgpa').value = student.cgpa || '';
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('sapid').value = student.sapid || '';
    document.getElementById('batch').value = student.batch || '';

    const yearReverseMap = {
        "First Year": "1",
        "Second Year": "2",
        "Third Year": "3",
        "Fourth Year": "4"
    };
    document.getElementById('year').value = yearReverseMap[student.year] || '';

    document.getElementById('address').value = student.address || '';

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
        if (!res.ok) throw new Error(data.message || 'Failed to update student');

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
    document.getElementById('form-title').textContent = isEditing ? 'Edit Student' : 'Add New Student';
    document.getElementById('submit-btn').textContent = isEditing ? 'Update Student' : 'Add Student';
    document.getElementById('cancel-btn').style.display = isEditing ? 'inline-block' : 'none';

    if (isEditing) {
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function showMessage(message, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.innerHTML = `<div class="${type}">${message}</div>`;
    setTimeout(() => { msgDiv.innerHTML = ''; }, 5000);
}
