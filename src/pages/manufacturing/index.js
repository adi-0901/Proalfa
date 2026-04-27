import React from 'react'
import PebGraph from '../../assets/svg/peb_graph'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'

const index = () => {
  return (
    <Layout>
        <Seo
          title="Manufacturing"
          description="Proalfa Dynamic's in-house PEB manufacturing facility in Pune—engineering, fabricating, and delivering pre-engineered steel buildings across Maharashtra and India."
          keywords="steel structure warehouse Pune, prefabricated warehouse Pune, prefab shed construction Pune, steel building construction Pune, structural steel contractor Pune, steel frame warehouse Pune, metal shed builder Pune, steel shed construction Pune, steel building contractor Pune, pre engineered building Pune, PEB manufacturer Pune, industrial shed builder Pune, factory shed construction Pune"
        />
        <div>
            <PebGraph className={"md:h-screen md:w-screen md:mb-24 flex items-center justify-center w-full flex-col md:flex-row px-10 pt-[90px] pb-5 overflow-visible"}/>
        </div>

    </Layout>

  )
}

export default index