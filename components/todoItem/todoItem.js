import { Fragment } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import check from "/images/check.png";
import uncheck from "/images/uncheck.jpg";
function TodoItem(props) {
    const { id, heading, description, done } = props
    const router = useRouter()
    //delete todo:
    const deleteTodo = async (todoId) =>{
        
        const resp = await fetch(`/api/delete/${todoId}`, {
          method: 'DELETE'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        
        router.push("/")
    }
    //togle todo:
    const togleDone = async (todoId, done) =>{
        console.log(done);
        
        const resp = await fetch(`/api/toggle/${todoId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/")
    }
    
    return (
        <Fragment>
            <td className="py-5 font-bold text-blue-600">{heading}</td>
            <td className="py-5">{description}{done}</td>
            <td className="py-5">
            {
            done === "true" ? 
            <Image src={check} alt="check" titl="check" width="25" height="25" onClick={() => togleDone(id, "false")}  />
            :
            <Image src={uncheck} alt="uncheck" titl="uncheck" width="25" height="25" onClick={() => togleDone(id, "true")}  />
            }
            
            </td>
            <td className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                <button className="id" 
                onClick={() => deleteTodo(id)} >Delete</button>
            </td>
        </Fragment>
    )
}
export default TodoItem