import {Paper, Typography, Checkbox, Button, Stack, TextField} from '@mui/material';
import {Delete} from '@mui/icons-material';
import { useState } from 'react';

type PropsType = {
    todo: TodoItemType;
    completeHandler: (id: TodoItemType['id']) => void;
    deleteHandler: (id: TodoItemType['id']) => void;
    editHandler: (id:TodoItemType['id'], newTitle: TodoItemType['title']) => void;
}

const TodoItem = ({todo, completeHandler, deleteHandler, editHandler}:PropsType) => {
    
  const [editable, setEditable] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<TodoItemType['title']>(todo.title);



  return (
    <Paper sx={{padding: '1rem'}}>
        <Stack direction={'row'} alignItems={'center'}>
            {!editable ? <Typography>{todo.title}</Typography>
            : <TextField value={textVal} onChange={(e)=>setTextVal(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === 'Enter' && textVal.length>2){
                editHandler(todo.id, textVal);
                setEditable(false);
              }
            }}
            />
            }
            <Checkbox checked={todo.isCompleted} onChange={()=>completeHandler(todo.id)}/>
            <Button sx={{fontWeight:'700'}} onClick={()=>setEditable(!editable)}>{editable ? 'Done' : 'Edit'}</Button>
            <Button onClick={()=>deleteHandler(todo.id)}><Delete/></Button>
        </Stack>
    </Paper>
  )
}

export default TodoItem
