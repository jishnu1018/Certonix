import React,{useState} from 'react'
import Nav from '../components/Nav'

const Issue = () => {

  const [courseName, setCourseName] = useState("Certified Blockchain Associate")
  const [certificateId, setCertificateId] = useState("")
  const [candidateName, setCandidateName] = useState("")
  const [grade, setGrade] = useState("S")
  const [date, setDate] =useState("")


  const handleIssue = async (e) => {
    e.preventDefault()
    console.log("Submitting Course Name:", courseName)
    try {
        const response = await fetch('/api/issue',{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({CourseName:courseName,CertificateId:certificateId,CandidateName:candidateName,Grade:grade,Issuedate:date}),
        })

      if (!response.ok) {
        throw new Error("Error issuing Certificate")
      }

      alert("Certificate issued successfully!!!")
     
      setCourseName("Certified Blockchain Associate")
      setCertificateId("")
      setCandidateName("")
      setGrade("S")
      setDate("")
    } 

    catch (err) {
      console.error(err)
      alert("Something went wrong: " + err.message)
    }
  }


  return (
    <div className='bg-purple-200 min-h-screen' >

        <Nav/>
        
                <form class="bg-gray-100 ml-[100px] mt-[70px] w-[1300px] h-[550px] pl-[20px] pt-[20px] border-solid border-gray-400 border flex flex-col gap-7" onSubmit={handleIssue}>
                <p class="text-3xl font-bold text-purple-950">Issue New Certificate</p>

                <div>
                    <label class="mt-[20px]">Select Course : </label> 
                    <select value={courseName} onChange={(e)=> setCourseName(e.target.value)} class="hover:ring-2  rounded-sm border-solid border-2 border-gray-500 bg-white w-[400px] h-[30px] pl-1" required>          
                        <option value="Certified Blockchain Associate" >Certified Blockchain Associate</option> 
                        <option value="Certified Blockchain Developer">Certified Blockchain Developer</option>
                        <option value="Developer Essentials for Blockchain">Developer Essentials for Blockchain</option>
                    </select> 
                </div>   
                
                <div class="mt-[20px]">
                    <label>Certificate Id : </label> 
                    <input type="text" value={certificateId} onChange={(e)=> setCertificateId(e.target.value)} class="hover:ring-2  rounded-sm border-solid border-2 border-gray-500 bg-white w-[400px] h-[30px] pl-1" required placeholder="Certificate Id"/> 
                </div>
                
                <div class="mt-[20px]">
                    <label>Candidate Name : </label> 
                    <input type="text" value={candidateName} onChange={(e)=> setCandidateName(e.target.value)} class="hover:ring-2  rounded-sm border-solid border-2 border-gray-500 bg-white w-[400px] h-[30px] pl-1" required placeholder="Name"/> 
                </div>
                
                <div class="mt-[20px]">
                    <label>Select Grade : </label> 
                    <select value={grade} onChange={(e)=> setGrade(e.target.value)} class="hover:ring-2  rounded-sm border-solid border-2 border-gray-500 bg-white w-[400px] h-[30px] pl-1" required>
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select> 
                </div>
                
                <div class="mt-[20px]">
                    <label>Issue Date : </label>
                    <input type="date" value={date} onChange={(e)=> setDate(e.target.value)} class="hover:ring-2  rounded-sm border-solid border-2 border-gray-500 bg-white w-[400px] h-[30px] pl-1"/> 
                </div>
                
                <button type='submit' class="mt-[30px] bg-purple-500 h-[30px] w-[150px] text-center  text-white rounded-md ">Issue Certificate</button>
            </form>

    </div>
  )
}

export default Issue