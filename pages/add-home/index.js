import { useRouter } from "next/router"
import { Fragment } from "react"
import HomeForm from "../../components/homeForm/HomeForm"
const AddHome = () => {
    const router = useRouter()
    const addHomeHandler = async (data) => {
        console.log("sending data::"+data)
        const response = await fetch("/api/new-home", {
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
            <HomeForm addHomeHandler={addHomeHandler} />
        </Fragment>
    )
}
export default AddHome