import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import SocialLinks from "./social-links"

import * as styles from "./team.module.scss"

const Team = () => {
  const membersQuery = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { contentType: { eq: "member" } } }) {
        group(field: frontmatter___group) {
          name: fieldValue
          nodes {
            fields {
              slug
            }
            frontmatter {
              name
              group
              role
              photo {
                childImageSharp {
                  gatsbyImageData(width: 85, height: 85, layout: FIXED)
                }
              }
              links {
                website
                twitter
                linkedin
              }
              disableDetailPage
            }
          }
        }
      }
    }
  `)

  const membersGroups = membersQuery.allMarkdownRemark.group

  const groups = [
    membersGroups.find(group => group.name === "Governing board"),
    membersGroups.find(group => group.name === "Staff"),
    membersGroups.find(group => group.name === "Collaborators"),
    membersGroups.find(group => group.name === "Advisers"),
    membersGroups.find(group => group.name === "Alumni"),
  ]

  return (
    <div>
      {groups.map(group => {
        return (
          <div className={styles.membersGroup} key={group.name}>
            <h3>{group.name}</h3>
            <div className={styles.membersList}>
              {group.nodes.map(member => {
                if (member.frontmatter.disableDetailPage) {
                  return (
                    <div className={styles.member} key={member.fields.slug}>
                      <GatsbyImage
                        image={
                          member.frontmatter.photo.childImageSharp
                            .gatsbyImageData
                        }
                        alt={`${member.frontmatter.name} profile image`}
                      />
                      <div className={styles.details}>
                        <div>{member.frontmatter.name}</div>
                        <SocialLinks
                          topSpacing
                          website={member.frontmatter.links.website}
                          twitter={member.frontmatter.links.twitter}
                          linkedin={member.frontmatter.links.linkedin}
                        />
                      </div>
                    </div>
                  )
                }
                return (
                  <Link
                    className={styles.member}
                    to={member.fields.slug}
                    key={member.fields.slug}
                  >
                    <GatsbyImage
                      image={
                        member.frontmatter.photo.childImageSharp.gatsbyImageData
                      }
                      alt={`${member.frontmatter.name} profile image`}
                    />
                    <div className={styles.details}>
                      {member.frontmatter.name}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Team
