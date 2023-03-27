import { useState } from 'react'

const initialValues = { todo: "", done: false };

function Input({ addTodos, todos }) {
    const [inputdata, setInputdata] = useState(initialValues)
    const [Checkvalue, setCheckvalue] = useState(initialValues.done)
    //submit edildiginde datayı kontrol edip todos arrayına ekliyor
    const AddNewTodo = (e) => {
        e.preventDefault()

        if (inputdata.todo.trim().length === 0) {
            return false;
        }

        addTodos([...todos, inputdata])
        setInputdata(initialValues)
    }
    //input area degistiginde benim inputdatadaki todo degiskenim degişiyor 
    const onChangeInput = (e) => {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    };
    const DoneAll = () => {
        //hic yoksa
        if (typeof todos[0] === 'undefined' || todos[0] === null) {
            return false
        }
        //hepsi ayniysa
        if (todos.every(item => item.done === todos[0].done)) {
            //hepsi dogruysa
            if (todos[0].done) {
                addTodos(todos.map((item) => {
                    return { ...item, done: false }
                }))
                setCheckvalue(false)
            //hepsi yanlissa
            } else {
                addTodos(todos.map((item) => {
                    return { ...item, done: true }
                }))
                setCheckvalue(true)
            }
        //hepsi farklıysa
        } else {
            addTodos(todos.map((item) => {
                return { ...item, done: !Checkvalue }
            }))
            setCheckvalue(!Checkvalue)
        }

    }
    return (
        <form onSubmit={AddNewTodo}>
            <input name='checkbox' type="checkbox" onChange={DoneAll} checked={Checkvalue}/>
            <input
                placeholder='What needs to be done?'
                value={inputdata.todo}
                onChange={onChangeInput}
                name="todo"
                required
            />
        </form>
    )
}

export default Input