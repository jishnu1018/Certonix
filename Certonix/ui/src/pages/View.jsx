import { useState} from "react"
import logo from '../assets/images/images.png'
import Nav from '../components/Nav.jsx'

const View = () => {
  const [certificateId, setCertificateId] = useState("")
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)

  const fetchCertificate = async (id) => {
    setLoading(true)
    setError("")
    setCertificate(null)

    try {
      const response = await fetch(`/api/view?certificateid=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Certificate not found")
      }
      
      setCertificate(data)
      setShowCertificate(true)
      

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (showCertificate && certificate) {
    return (
   
      
      <div>

      <div className="bg-blue-500 ml-[100px] rounded-md p-[10px] text-xl mt-[20px] w-[60px]" onClick={() => window.location.reload()}>Back</div>

      
            <div className="bg-gray-200 flex justify-center border border-gray-400 mt-[120px] ml-[80px] mr-[80px] h-[600px]">
                <div className=" border border-gray-400 mt-[50px] mb-[50px] w-[1500px]">
                    <h3 className="text-center font-medium mt-[40px]">Kerala Blockchain Academy</h3>
                    <img src={logo} alt="logo" className="h-[190px] mt-[50px] ml-[660px]"/> 

                    <div className="text-center mt-[40px]">
                        <p >This is to certify that <b>{certificate.candidatename}</b></p>
                        <p className="pt-[20px]">has successfully completed <b>{certificate.coursename}</b></p>
                        <p className="pt-[20px]">with <b>{certificate.grade}</b> on <b>{certificate.issuedate.split("-").reverse().join("-")}</b></p>
                    </div>
                    
                </div>
            </div>

        </div>


    )
  }

  return (
    <div className="bg-purple-200 min-h-screen">
      <Nav/>
      <div className="flex justify-center">
        <div className="mt-[180px]">
            <h1 className="text-3xl font-medium text-center">Certificate Dapp</h1>
            <img src={logo} alt="logo" className="h-[150px] mt-[70px] ml-[100px]"/> 
    
            <div className="mt-9">
                <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID"
                className="p-2 border rounded-md text-lg"
                />

                <button
                onClick={() => fetchCertificate(certificateId)}
                className="ml-4 p-2 bg-blue-500 text-white rounded-md"
                >
                Search
                </button>
            </div>
        </div>
      </div>
      {loading && <p className="text-center mt-10 text-lg">Loading...</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}
    </div>
  )
}

export default View

