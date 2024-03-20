// Home.tsx
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://todo-list-api-14tz.onrender.com/';

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [expandedTasks, setExpandedTasks] = useState<{ [key: string]: boolean }>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [update, setUpdate] = useState(false);
  const [info, setInfo] = useState('');

  const logout = () => {
    localStorage.clear()
    window.location.reload();
  }

  const clean = () => {
    setTitle("")
    setDescription("")
  }

  const showAlert = (msj: string) => {
    setInfo(msj)

    setTimeout(() => {
      setInfo('');
    }, 3000);
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}todo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTasks();
  }, [update]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No hay token disponible');
        return;
      }

      await axios.post(
        `${API_BASE_URL}todo`,
        {
          title: title,
          description: description,
          is_done: false
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );

      setUpdate((prev) => !prev)
      clean()
      showAlert("Tarea Agregada Correctamente");

    } catch (error) {
      console.error('Error al agregar una tarea:', error);
    }
  }

  const handleDelete = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No hay token disponible');
        return;
      }

      await axios.delete(`${API_BASE_URL}todo/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUpdate((prev) => !prev)
      showAlert("Tarea Eliminada Correctamente");

    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleCheck = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No hay token disponible');
        return;
      }

      await axios.patch(`${API_BASE_URL}todo/${taskId}`,
        {
          is_done: true
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );

      setUpdate((prev) => !prev)

    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleToggleDescription = (taskId: string) => {
    setExpandedTasks({
      ...expandedTasks,
      [taskId]: !expandedTasks[taskId] // Cambiar el estado de expansión de la tarea
    });
  };

  return (
    <>

      <div className='customLogOut'>
        <button type='button' className='btn-logout' onClick={() => logout()}>
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m17 16 4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="stroke-374151"></path></svg>
        </button>
      </div>


      <div className='customTodoTitle'>
        <h2>✨ToDo List✨</h2>
      </div>


      <div className='custonInfo'>
        {info}
      </div>

      <form id='addTodo-form' onSubmit={handleAdd}>
        <div className='addTodo-leftDiv'>
          <input className="" type="text" id='addTitle' name="addtitle" placeholder='Agrega una nueva tarea...'
            required maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          <input className="" type="text" id='addDescrip' name="addDescrip" placeholder='Agrega una descripción...'
            required maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="">
          <input type="submit" className="customSubmit" value="Añadir" />
        </div>
      </form>

      <div className='container'>
        <div className='todos'>
          <ul>
            {tasks.length === 0 ? (
              <li>No tienes tareas pendientes 😎</li>
            ) : (
              tasks.map((task: any) => (
                <li key={task.id} onClick={() => handleToggleDescription(task.id)}>
                  <div className={`customLi ${task.is_done ? 'done' : ''}`}>
                    <div className='customTitle'>
                      {task.title}
                    </div>
                    <div className='customdivbuttons'>
                      <button type='button' className='customBTN-Delete' onClick={() => handleDelete(task.id)}>
                        <svg height="24" viewBox="0 0 34 34" width="24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 17"><path d="M24 31H8a3 3 0 0 1-3-3V9a1 1 0 0 1 2 0v19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 1 2 0v19a3 3 0 0 1-3 3ZM28 7H4a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2Z" fill="#ffffff" className="fill-101820"></path><path d="M20 7a1 1 0 0 1-1-1V3h-6v3a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM16 26a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v14a1 1 0 0 1-1 1ZM21 24a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1ZM11 24a1 1 0 0 1-1-1V13a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1Z" fill="#ffffff" className="fill-101820"></path></g></svg>
                      </button>
                      {!task.is_done && (
                        <button type='button' className='customBTN-edit' onClick={() => handleCheck(task.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="none"><path d="M21.414 6 9 18.414 2.586 12 4 10.586l5 5 11-11L21.414 6Z" fill="#ffffff" className="fill-000000"></path></svg>
                        </button>
                      )}
                    </div>
                  </div>
                  {expandedTasks[task.id] && <div className='customDescription'>{task.description}</div>}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

    </>
  );
};

export default Home;