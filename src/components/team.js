import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import SocialLinks from "./social-links"

import {
  membersGroup,
  membersList,
  name,
  role,
  member as memberStyles,
  hasDetailPage,
  photo,
  details,
} from "./team.module.scss"

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
  ]

  return (
    <div>
      {groups.map(group => {
        return (
          <div className={membersGroup} key={`group_${group.name}`}>
            <h3>{group.name}</h3>
            <div className={membersList}>
              {group.nodes.map(member => {
                const personProfilePicture = (
                  <Image
                    fixed={member.frontmatter?.photo?.childImageSharp.fixed}
                    alt={`${member.frontmatter.name} profile image`}
                  />
                )

                const personTextDetails = (
                  <div>
                    <div className={name}>{member.frontmatter.name}</div>
                    <div className={role}>{member.frontmatter.role}</div>
                  </div>
                )
                return (
                  <div
                    className={`${memberStyles} ${
                      !member.frontmatter.disableDetailPage && hasDetailPage
                    }`}
                    key={`team_${member.fields.slug}`}
                  >
                    {member.frontmatter?.photo &&
                      !member.frontmatter.disableDetailPage && (
                        <Link
                          to={member.fields.slug}
                          key={member.fields.slug}
                          className={photo}
                        >
                          {personProfilePicture}
                        </Link>
                      )}
                    {member.frontmatter?.photo &&
                      member.frontmatter.disableDetailPage && (
                        <div className={photo}>{personProfilePicture}</div>
                      )}
                    <div className={details}>
                      {!member.frontmatter.disableDetailPage && (
                        <Link to={member.fields.slug} key={member.fields.slug}>
                          {personTextDetails}
                        </Link>
                      )}
                      {member.frontmatter.disableDetailPage &&
                        personTextDetails}
                      <SocialLinks
                        topSpacing
                        website={member.frontmatter.links?.website}
                        twitter={member.frontmatter.links?.twitter}
                        linkedin={member.frontmatter.links?.linkedin}
                      />
                    </div>
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
