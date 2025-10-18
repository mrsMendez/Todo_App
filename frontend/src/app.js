const API_URL = 'http://localhost:3000/tasks';

async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
      const item = document.createElement('li');
      item.textContent = task.title;
      item.className = task.completed ? 'completed' : '';
      item.onclick = () => toggleTask(task.id, !task.completed);

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Eliminar';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      };

      item.appendChild(delBtn);
      list.appendChild(item);
    });
  } catch (err) {
    console.error('Error al cargar tareas', err);
  }
}

async function addTask() {
  const input = document.getElementById('new-task');
  const title = input.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    input.value = '';
    loadTasks();
  } catch (err) {
    console.error('Error al agregar tarea', err);
  }
}

async function toggleTask(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    loadTasks();
  } catch (err) {
    console.error('Error al actualizar tarea', err);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();
  } catch (err) {
    console.error('Error al eliminar tarea', err);
  }
}

window.onload = loadTasks;
