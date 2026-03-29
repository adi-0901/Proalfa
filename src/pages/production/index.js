import { useEffect } from "react"
import { navigate } from "gatsby"

/** Legacy URL: /production → /capabilities */
const ProductionRedirect = () => {
  useEffect(() => {
    navigate("/capabilities", { replace: true })
  }, [])
  return null
}

export default ProductionRedirect
