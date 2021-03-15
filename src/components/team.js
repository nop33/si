import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import SocialLinks from "./social-links"

import styles from "./team.module.scss"

const Team = () => {
  const membersQuery = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fields: { contentType: { eq: "member" } } }
        sort: { fields: [frontmatter___name], order: DESC }
      ) {
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
                  fixed(width: 85, height: 85, quality: 100) {
                    ...GatsbyImageSharpFixed
                  }
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
    <div className={styles.groups}>
      {groups.map(group => {
        return (
          <div className={styles.membersGroup} key={`group_${group.name}`}>
            <h3>{group.name}</h3>
            <div className={styles.membersList}>
              {group.nodes.map(member => {
                if (member.frontmatter.disableDetailPage) {
                  return (
                    <div
                      className={styles.member}
                      key={`team_${member.fields.slug}`}
                    >
                      {member.frontmatter?.photo && (
                        <Image
                          fixed={
                            member.frontmatter?.photo?.childImageSharp.fixed
                          }
                          alt={`${member.frontmatter.name} profile image`}
                        />
                      )}
                      <div className={styles.details}>
                        <div><b>{member.frontmatter.name}</b></div>
                        <div>{member.frontmatter.role}</div>
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
                  <div>
                    <Link
                      className={styles.member}
                      to={member.fields.slug}
                      key={member.fields.slug}
                    >
                      {member.frontmatter?.photo && (
                        <Image
                          fixed={member.frontmatter?.photo?.childImageSharp.fixed}
                          alt={`${member.frontmatter.name} profile image`}
                        />
                      )}
                      <div className={styles.details}>
                        <div><b>{member.frontmatter.name}</b></div>
                        <div>{member.frontmatter.role}</div>
                      </div>
                    </Link>
                    <SocialLinks
                      topSpacing
                      website={member.frontmatter.links.website}
                      twitter={member.frontmatter.links.twitter}
                      linkedin={member.frontmatter.links.linkedin}
                    />
                  </div>
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
