import { useRouter } from "next/router"
import { Fragment } from "react"
import AboutForm from "../../components/aboutForm/AboutForm"
const AddAbout = () => {
    const router = useRouter()
    const addAboutHandler = async (data) => {
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
            <AboutForm addAboutHandler={addAboutHandler} />
        </Fragment>
    )
}
export default AddAbout