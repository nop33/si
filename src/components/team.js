import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./team.module.scss"

const Team = () => {
  const membersQuery = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fields: { contentType: { eq: "member" } } }) {
        group(field: frontmatter___group) {
          fieldValue
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
    membersGroups.find(group => group.fieldValue === "Governing board"),
    membersGroups.find(group => group.fieldValue === "Staff"),
    membersGroups.find(group => group.fieldValue === "Collaborators"),
    membersGroups.find(group => group.fieldValue === "Advisers"),
    membersGroups.find(group => group.fieldValue === "Alumni"),
  ]

  return (
    <div className={styles.groups}>
      {groups.map(group => {
        return (
          <div className={styles.membersGroup} key={group.fieldValue}>
            <h3>{group.fieldValue}</h3>
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
