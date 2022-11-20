import { useRouter } from "next/router"
import { Fragment } from "react"
import UpdateAboutForm from "../../components/updateAbout/UpdateAboutForm"
const UpdateAbout = (props) => {
    console.log(props);
    const router = useRouter()
    const addAboutHandler = async (data) => {
        console.log(data);
        console.log("sending data::"+data)
        const response = await fetch("/api/new-about", {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                "content-Type" : "application/json"
            }
        }) 
        const res = await response.json()
        router.push("/")
    }
    return (
        <Fragment>
            <UpdateAboutForm addAboutHandler={addAboutHandler} />
        </Fragment>
    )
}
export default UpdateAbout