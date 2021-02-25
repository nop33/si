import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./team.module.scss"

const Team = () => {
  const membersQuery = useStaticQuery(graphql`
    query {
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
                  fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
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
    <div className={styles.groups}>
      {groups.map(group => {
        return (
          <div className={styles.membersGroup} key={group.name}>
            <h3>{group.name}</h3>
            <div className={styles.membersList}>
              {group.nodes.map(member => {
                return (
                  <Link
                    className={styles.member}
                    to={member.fields.slug}
                    key={member.fields.slug}
                  >
                    <Image
                      fixed={member.frontmatter.photo.childImageSharp.fixed}
                    />
                    <div className={styles.name}>{member.frontmatter.name}</div>
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
