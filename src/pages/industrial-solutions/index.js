import { useEffect } from "react"
import { navigate } from "gatsby"

const IndustrialSolutionsRedirect = () => {
  useEffect(() => {
    navigate("/capabilities", { replace: true })
  }, [])
  return null
}

export default IndustrialSolutionsRedirect
