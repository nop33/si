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

interface TeamProps {
  groups: {
    name: string
    title: string
  }[]
}

const Team = ({ groups }: TeamProps) => {
  const membersQuery = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { contentType: { eq: "member" } } }
        sort: { frontmatter: { name: ASC } }
      ) {
        group(field: { frontmatter: { group: SELECT } }) {
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

  const _groups = groups.map(({ name, title }) => ({
    name,
    title,
    members: membersQuery.allMarkdownRemark.group.find(
      ({ name: groupName }) => groupName === name
    ).nodes,
  }))

  return (
    <div>
      {_groups
        .filter(group => !!group)
        .map(group => {
          return (
            <div className={membersGroup} key={`group_${group.name}`}>
              <h3>{group.title}</h3>
              <div className={membersList}>
                {group.members.map(member => {
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
                          <Link
                            to={member.fields.slug}
                            key={member.fields.slug}
                          >
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
