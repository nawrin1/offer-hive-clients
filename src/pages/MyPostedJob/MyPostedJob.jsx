import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";


const MyPostedJob = () => {
    const { user } = useContext(AuthContext);
    const [allPosted, setAllPosted] = useState([]);

    const url = `https://online-marketplace-server-beta.vercel.app/jobs?email=${user?.email}`;

    useEffect(() => {



        fetch(url)
            .then(res => res.json())
            .then(data => {setAllPosted(data)
                console.log(data)
           })
    }, [url]);
    const handleDelete=_id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://online-marketplace-server-beta.vercel.app/jobs/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Deleted successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                           
                            const remaining =allPosted.filter(posted => posted._id != _id);
                            setAllPosted(remaining);
        
        
        
                        }
                    })

            }
          });



    }
    
    
    return (<div>
        <Helmet><title>Offer Hive | My Posted Job</title></Helmet>
        < div className="min-h-screen max-w-6xl mx-auto my-7">
            <h2 className="text-4xl text-center font-Sora font-bold text-emerald-900">My Posted Job</h2>
            
    {
        allPosted.map(posted=><>
        <div className="p-8 bg-cyan-200 my-4 mx-4 rounded-2xl">
<div className="p-4 bg-cyan-100 rounded-2xl">
<div className="flex lg:flex-row  flex-col justify-between ">
            <div>
                <h2 className=" text-2xl font-Sora font-semibold text-purple-900 ">{posted.jobtitle}</h2>
            </div>
            <div>
                <h2  className="lg:text-xl md:text-xl text-[14px] font-bold">Posted by: {posted.email}</h2>
            </div>
            </div>
            <div>
                <div className="text-xl font-Sora font-semibold mb-6">
                    <h2>Category: {posted.category}</h2>
                </div>
                <div className="lg:text-xl md:text-xl text-[14px] ">
                    {posted.description.slice(0,100)}.....

                </div>
                <div className="text-[16px] font-Sora font-semibold mt-6">
                <div className="flex justify-between flex-col md:flex-row lg:flex-row">
                   <div className="mb-4">
                        <h2>Deadline: {posted.deadline}</h2>
                        <h2>Price: {posted.max}-{posted.min}</h2>
                    </div>
                    <div className="flex gap-2 ">
                        <div>
                            <Link to={`/update/${posted._id}`} ><button className="btn btn-outline font-Sora font-medium bg-green-900 text-white">Update</button></Link>
                        </div>
                        <div>
                            <button className="btn btn-outline font-Sora font-medium bg-red-700 text-white " onClick={()=>handleDelete(posted._id)}>Delete</button>
                        </div>
                        
                    </div>
                    
                </div>

                </div>

            </div>
</div>

        </div>
        </>)
    }

      
      





   





            
        </div>
        </div>
    );

};

export default MyPostedJob;