```tsx
import { useEffect, useState } from 'react';
import api from '../api'; // jeśli api.ts jest w src/

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/Tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await api.post('/Tasks', { name: newTask });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Błąd dodawania zadania:', error);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await api.put(`/Tasks/${task.id}`, {
        ...task,
        isCompleted: !task.isCompleted
      });
      fetchTasks();
    } catch (error) {
      console.error('Błąd aktualizacji:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/Tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Błąd usuwania:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#121212',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px'
      }}
    >
      {/* ZŁOTY TYTUŁ */}
      <h1
        style={{
          fontSize: '48px',
          marginBottom: '30px',
          color: '#FFD700',
          fontWeight: 'bold'
        }}
      >
        ☁️ Cloud App Dashboard
      </h1>

      {/* INPUT + BUTTON */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Wpisz nowe zadanie..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #444',
            marginRight: '10px',
            width: '260px',
            background: '#1e1e1e',
            color: 'white',
            outline: 'none'
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: '12px 18px',
            borderRadius: '8px',
            border: 'none',
            background: '#FFD700',
            color: '#000',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Dodaj Zadanie
        </button>
      </div>

      {/* LISTA TASKÓW */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              background: '#f8f9fa',
              margin: '8px 0',
              padding: '12px 20px',
              borderRadius: '8px',
              borderLeft: task.isCompleted
                ? '6px solid #28a745'
                : '6px solid #ffc107',
              width: '350px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#000',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              userSelect: 'none'
            }}
          >
            <span
              style={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                fontWeight: 500
              }}
            >
              {task.name}
            </span>

            <div>
              <button
                onClick={() => toggleTask(task)}
                style={{
                  marginRight: '8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {task.isCompleted ? '✅' : '⏳'}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'red',
                  fontSize: '16px'
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
