import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title, keywords }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          location {
            city
            state
            country
            countryCode
            latitude
            longitude
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl
  const { city, state, country, countryCode, latitude, longitude } =
    site.siteMetadata.location

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultTitle,
    description: metaDescription,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    areaServed: [
      { "@type": "City", name: city },
      { "@type": "State", name: state },
      { "@type": "Country", name: country },
    ],
  }

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        { name: `description`, content: metaDescription },
        { property: `og:title`, content: title },
        { property: `og:description`, content: metaDescription },
        { property: `og:type`, content: `website` },
        { name: `twitter:card`, content: `summary` },
        { name: `twitter:creator`, content: site.siteMetadata?.author || `` },
        { name: `twitter:title`, content: title },
        { name: `twitter:description`, content: metaDescription },
        ...(keywords ? [{ name: `keywords`, content: keywords }] : []),
        { name: `geo.region`, content: `${countryCode}-MH` },
        { name: `geo.placename`, content: `${city}, ${state}, ${country}` },
        { name: `geo.position`, content: `${latitude};${longitude}` },
        { name: `ICBM`, content: `${latitude}, ${longitude}` },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  keywords: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keywords: PropTypes.string,
}

export default Seo
