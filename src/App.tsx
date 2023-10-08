import { AppBar, Container, Toolbar, Typography, Stack, TextField, Button } from "@mui/material"
import {useState} from 'react';
import TodoItem from "./components/TodoItem";

const App = () => {

  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const [title, setTitle] = useState<TodoItemType['title']>("");

  const completeHandler = (id: TodoItemType['id']): void =>{

     const newTodos:TodoItemType[] = todos.map((i)=>{
        if(i.id === id) i.isCompleted = !i.isCompleted;
        return i;
     });

     setTodos(newTodos);
  }
  const deleteHandler = (id: TodoItemType['id']): void =>{

    const newTodos:TodoItemType[] = todos.filter(i=>i.id !== id);

   setTodos(newTodos);

  }
  const addTodo = (): void =>{

    if(title.length <= 2) {
      alert('Enter atleast more than 2 characters in title!');
    }else{

      const newTodo:TodoItemType = {
        title,
        isCompleted: false,
        id: String(Math.random()*1000)
      }
  
      setTodos(prev=>[...prev, newTodo]);
      setTitle("");
    }

  }

  const editHandler =(id: TodoItemType['id'], newTitle: TodoItemType['title']): void=>{
    
    const newTodos: TodoItemType[] = todos.map((i)=>{
      if(i.id === id) i.title = newTitle;
      return i;
    })

    setTodos(newTodos);

  }

  return (
    <Container maxWidth='sm' sx={{height:'100vh'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack height='80%' direction='column' spacing='1rem' p='1rem'>
        {
          todos.map((i)=> <TodoItem key={i.id} todo={i} deleteHandler={deleteHandler} completeHandler={completeHandler} editHandler={editHandler}/>)
        }
      </Stack>
      <TextField fullWidth label='Add Task' value={title}  onChange={(e)=>setTitle(e.target.value)} />
      <Button fullWidth variant="contained" sx={{margin:'1rem 0rem'}} onClick={addTodo} >Add Task</Button>
    </Container>
  )
}

export default App
