import React from 'react'
import PebGraph from '../../assets/svg/peb_graph'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'

const index = () => {
  return (
    <Layout>
        <Seo title="Manufacturing" />
        <div>
            <PebGraph className={"md:h-screen md:w-screen md:mb-24 flex items-center justify-center w-full flex-col md:flex-row px-10 pt-[90px] pb-5 overflow-visible"}/>
        </div>

    </Layout>

  )
}

export default index