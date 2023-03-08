import React, {useRef, useState} from "react";
import Item from './Item';
import InputText from './InputText';

interface TList {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState<TList[]>([
        {
            id: 1,
            text: '할일 1',
            completed: false,
        },
        {
            id: 2,
            text: '할일 2',
            completed: false,
        },
        {
            id: 3,
            text: '완료한일 1',
            completed: true,
        }
    ]);
    const nextId = useRef(4);

    const handleClickCheckBox = (id: number) => {
        // 해당 id를 가진 컴포넌트의 completed 상태 변경
        setTasks(tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    }

    const handleClickDeleteButton = (id: number) => {
        // 해당 id를 가진 컴포넌트 삭제
        setTasks(tasks.filter( task => task.id !== id));
    }   
    
    // 입력값 변경 핸들러
    const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    // 입력값 엔터 핸들러
    const handleInputTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            const newList: TList = {
                id: nextId.current,
                text: inputText,
                completed: false,
            }
            //setTasks(tasks.concat(newList));
            setTasks([...tasks, newList]);
            setInputText('');
            nextId.current += 1;
        }
    }    

    return (
        <div>
            {tasks.map( task => 
                <Item 
                    key={`${task.id}task`}
                    id = {task.id}
                    text = {task.text}
                    completed={task.completed}
                    onClickCheckBox={handleClickCheckBox}
                    onClickDeleteButton={handleClickDeleteButton}
                />
            )}
            <InputText 
                onChange={handleInputTextChange}
                onKeyDown={handleInputTextKeyDown}
                inputText={inputText}
            />            
        </div>
    );
}

export default TodoList;