import { Fragment, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react';
import Image from "next/image"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
function TodoItem(props) {
    const { id, heading, description, done } = props
    const [show, setShow] = useState(false);
    const [header, setHeader]= useState(heading);
    const [descrip, setDescrip]= useState(description);
    const router = useRouter()

    const editorRef = useRef(descrip);
    const log = async () => {
      if (editorRef.current) {
        const description = await editorRef.current.getContent();
       await  setDescrip(description);
            console.log(descrip);
      }
    };

    //delete todo:


    const updateTodo = (id) =>{
        setShow(!show)
    }

    const handleChange = (e) =>{
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        switch(name){
            case "heading":
                setHeader(value);
            break;   
            case "description":
                setDescrip(value);
            break;   
        }
    }

    const deleteTodo = async (todoId) =>{
        const resp = await fetch(`/api/removeitems/todos/${todoId}`, {
            method: 'DELETE'
          })
          .then(res => console.log("SUCCESS:: "+ res.json()))
          .catch(e => console.log("ERROR:" + e))
          
          router.push("/")
    }
    //togle todo:
    const togleDone = async (todoId, done) =>{
        
        const resp = await fetch(`/api/toggle/${todoId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/todo")
    }

    const handleSave = async ()=>{
        const data = {
            heading: header,
            description: descrip,
            done: done
        }
        const resp = await fetch(`api/todo/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        .then(res => console.log("SUCCESS:: " + res.json()))
        .catch(e => console.log("ERROR " + e))
        router.push("/");
    }
    
    return (
        <Fragment>
            <Fragment>
            
            </Fragment>
            <Fragment>
            {/* <td className="py-1">{ show ? header : <input type="text" name="heading" id="heading" value={header} onChange={handleChange} />  }</td>
            <td className="py-1">{show ? descrip : <input type="text" name="description" id="description" value={descrip} onChange={handleChange} /> }</td> */}
            <td className="py-7">
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={descrip}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }} />
                <button onClick={log}>Edit</button>
            </td>

            <td className="py-1">
            {
            done === "true" ? 
            <Image src={check} alt="check" titl="check" width="25" height="25" onClick={() => togleDone(id, "false")}  />
            :
            <Image src={uncheck} alt="uncheck" titl="uncheck" width="25" height="25" onClick={() => togleDone(id, "true")}  />
            }
            
            </td>
            <td style={{visibility: show ? "hidden" : "visible"}}><button onClick={handleSave}>Save</button></td>
            <td className="px-4 py-2 my-1 font-semibold  rounded hover:bg-red-500 hover:text-black hover:border-transparent">
                <button className="id" 
                onClick={() => deleteTodo(id)} >Delete</button>
            </td>
            <td className="px-4 py-2 my-1 font-semibold  rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                <button className="id" 
                onClick={() => updateTodo(id)} >Show form</button>
            </td>
            </Fragment>
        </Fragment>
    )
}
export default TodoItem