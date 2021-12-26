import {useState,useEffect} from 'react'

const useFetch = (url,method="GET") =>{
    const [data,setData] = useState(null)
    const [isPending,setISPending] = useState(false)
    const [error,setError] = useState(null)
    const[options,setOptions] = useState(null)
    //use useRef to wrap an object/array argument
    // which is a useeffect dependacy 
    // const options = useRef(_options).current
    const postData = (postData) =>{
        setOptions({
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(postData)
        })

    }

    useEffect(()=>{
        const controller = new AbortController()
        const fetchData = async (fetchOptions) =>{
            setISPending(true)
            try{
                const res = await fetch(url,{...fetchOptions,signal:controller.signal}) //associate the abort controller with fetch request 
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                const json = await res.json()
                setISPending(false)
                setData(json)    
                setError(null)
            } catch(err){
                if(err.name==="AbortError"){
                    console.log('the fetch was aborted')
                }
                else{
                console.log("it entered error block")
                setISPending(false)
                setError('Could not fetch the data')
                console.log(err.message)
                }
            }
        }
        if(method==="GET"){
            fetchData()
        }
        if(method==="POST" && options){
            fetchData(options)
        }

        return ()=>{
            controller.abort()
        }
    },[url,options,method])

    return {data:data,isPending:isPending ,error,postData }

}

export default useFetch

/*handling post request 
    1) First we need to accept a argument called method (get or post) , we set the default value to get 
    2) create a postData function, this function will be returned from the hook
    3) create  a new state called options and setOptions
    4) postData function will the options {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringfy(postdata)} body will have the data )
    5) next we have to trigger the fetch request 
    6) if method == get we invoke fetchData 
    7) if it is post request then we have to set the method to "POST" && if we have otpion then we call fetchdata and pass in the options 
    8)we add the Options in fetch request with spread operator 
    9) we need to pass options and methods in the use Effect hook dependencies 



*/