import { useEffect } from "react"
import { navigate } from "gatsby"

/** Legacy URL: /projects → /industrial-solutions */
const ProjectsRedirect = () => {
  useEffect(() => {
    navigate("/industrial-solutions", { replace: true })
  }, [])
  return null
}

export default ProjectsRedirect
