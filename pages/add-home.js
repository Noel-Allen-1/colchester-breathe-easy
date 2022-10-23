import React, {useState, setStatate} from 'react'

export default function Addhome() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handlePost = async (e)=>{
        e.preventDefault();
        setError("");
        setMessage("");

        if(!title || !content){
            return setError("All fields ar required");
        }
        const home ={
            title,
            content,
            published:false,
            createdAt: new Date().toISOString()
        }
        let response = await fetch('/api/homes', {
            method: 'POST',
            body:JSON.stringify(home)
        })
        let data = await response.json();
        if(data.success){
            setTitle('');
            setContent('');
            return setMessage(data.message);
        }else{
            return setError(data.message);
        }
        
    }

  return (
    <div className='container'>
        <form className='form' onSubmit={handlePost}>
            {error ? (<div className='formItem'><h3 className='error'>{error}</h3></div>) : (<div><h3></h3></div>)}

            {message ? (<div className='formItem'><h3 className='message'>{message}</h3></div>) : (<div><h3></h3></div>)}
            <div className='formItem'>
                <label>Title</label>
                <input 
                    type="text" 
                    name="title"
                    value={title}
                    placeholder="title"
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className='formItem'>
                <label>Content</label>
               <textarea 
                name="content" 
                cols={6} 
                rows={7}
                onChange={(e)=>setContent(e.target.value)}
                value={content}/>

            </div>
            <div className='formItem'>
                <button type='submit' >Add Post</button>
            </div>

        </form>
    </div>
  )
}
