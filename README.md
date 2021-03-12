# SI website

This repository contains the code and content of the SI's website. The website was developed using [Gatsby][gatsby] by [Ilias Trichopoulos][ilias] in collaboration with Konrad Seifert and is hosted on [Netlify][netlify].

Changes in the **main** branch of this repository will be deployed on the production website.

## Table of contents

- [Pages](#pages)
- [Content](#content)
- [Images](#images)
- [Updating the content and previewing changes](#updating-the-content-and-previewing-changes)
- [3rd party services](#3rd-party-services)

## Pages

| Page                       | Description                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Home page**              | The page available at https://www.simoninstitute.ch/                                                                                                                     |
| **Blog overview page**     | The page available at https://www.simoninstitute.ch/blog/ listing all blog posts                                                                                         |
| **Blog post page**         | The page displaying the actual blog post                                                                                                                                 |
| **Blog tag page**          | The page displaying all blog posts of a particular tag, available at https://www.simoninstitute.ch/blog/tag/[name-of-the-tag]/                                           |
| **Member detail page**     | The page displaying information about a team member, available at https://www.simoninstitute.ch/about/member/[name-of-team-member]/                                      |
| **Projects overview page** | The page available at https://www.simoninstitute.ch/projects/ listing all projects.                                                                                      |
| **Project detail page**    | The page displaying information about a particular project, available at https://www.simoninstitute.ch/project/[name-of-the-project]/                                    |
| **Projects category page** | A page listing all projects of a particular category, available at https://www.simoninstitute.ch/projects/category/[name-of-the-category]/                               |
| **Projects tag page**      | A page listing all projects that have a particular tag, available at https://www.simoninstitute.ch/projects/tag/[name-of-the-tag]/                                       |
| **Legal page**             | The page available at https://www.simoninstitute.ch/legal/                                                                                                               |
| **About page**             | The page available at https://www.simoninstitute.ch/about/                                                                                                               |
| **Get involved page**      | The page available at https://www.simoninstitute.ch/get-involved/                                                                                                        |
| **Thank you page**         | The page available at https://www.simoninstitute.ch/thank-you/, used as a redirect page for when someone contacts you through the contact form of the Get involved page. |
| **404 page**               | The page someone lands to when the URL they are trying to load does not correspond to any page.                                                                          |

## Content

All the content of the website lives in the `/src/content` folder. The content is grouped in subfolders that represent different content types. Do not change the names of these subfolders because the website will not know where to find the content. The subfolders are:

### blog

Each subfolder inside the `blog` folder represents a blog post.

The name of the folder defines the URL of the blog post. For example, the `src/content/blog/review-of-inception` folder corresponds to the https://www.simoninstitute.ch/blog/post/review-of-inception/ page. Changing the name of the blog post folder will change the URL.

Inside a blog post folder there is an `index.md` file which contains the content of the blog post. See the [blog post documentation][docs-blog-post] for more details about the content structure of a blog post.

### member

Each subfolder inside the `member` folder represents a member of the team.

The name of the folder defines the URL of the member detail page. For example, the `src/content/member/konrad-seifert` folder correspnds to the https://www.simoninstitute.ch/about/member/konrad-seifert/ page. Changing the name of the member folder will change the URL.

Similarly to the blog folder, inside the member folder there is an `index.md` file which contains the content of the team member. See the [member documentation][docs-member] for more details about the member content structure.

### project

Same as above, but for the project content type. The name of the folder defines the URL and changing it will alter the URL. See the [project documentation][docs-project] for more details about the project content structure.

### subpage

The subpage content type allows you to create simple pages with the "standard" layout. The standard layout is the "side-by-side" title and content layout that the [project](#project) pages also use. The subfolders of this folder represent different pages where the name of the subfolder is the URL of the page. For example, the `src/content/subpage/legal` folder corresponds to the https://www.simoninstitute.ch/legal/ page.

As above, each subpage folder contains an `index.md` file with the contents of the page. The content structure is a more simplified version of the [project content structure][docs-project]. See the [subpage documentation][docs-subpage] for more details.

### custom-page

Some pages need a customized layout. The files listed in this subfolder represent the content of each individual page. :warning: Changing the names of these files **will not** change the URLs of the pages and it will break the website because the customized layout template will not know where to find the content of the page.

For more details, see the documentation of the custom pages:

- [Home page][docs-home-page]
- [About page][docs-about-page]
- [Get involved page][docs-get-involved-page]
- [Projects overview page][docs-projects-overview-page]

### \_configuration

Finally, there is the `_configuration` folder. It includes different kinds of configuration options for the website:

- Texts of the 404 page
- List of blog posts tags that are featured in the blog overview and blog tag overview pages.
- The links of the footer
- Metadata including the default SEO title and description
- Navigation menu items

## Images

All images can be found in the `/src/images` folder. The idea of grouping all images together is to enable the feature of an "image gallery" once a CMS is integrated. You can upload images here and reference them in the content of the website.

## Updating the content and previewing changes

To update the content and preview the changes before publishing them, follow this procedure:

- Go to the `update-content` branch (ADD LINK) of this GitHub repository.
- Perform the changes that you want and "commit" your changes.
- Create a pull request against the `main` branch.
- Wait for Netlify to create a preview link.
- Check the preview link to visualize the changes you made.
- Make further changes if needed.
- Once happy with how the changes look like on the preview site, merge the pull request. This will trigger a production deployment and your changes will shortly become live.

## 3rd party services

The website relies on the following services:

- [GitHub][github]: Hosting of the contents and the code of the website
- [Netlify][netlify]: (Free) hosting of the actual website, connected to the GitHub repository.
- [Basin][basin]: Backend of the contact form.
- [Airtable][airtable]: Application form.

[gatsby]: https://www.gatsbyjs.com/
[netlify]: https://www.netlify.com/
[basin]: https://usebasin.com/
[github]: https://github.com/
[airtable]: https://airtable.com/
[ilias]: https://www.iliascreates.com/
[docs-blog-post]: docs/blog-post.md
[docs-member]: docs/member.md
[docs-project]: docs/project.md
[docs-subpage]: docs/subpage.md
[docs-home-page]: docs/home-page.md
[docs-about-page]: docs/about-page.md
[docs-get-involved-page]: docs/get-involved-page.md
[docs-projects-overview-page]: docs/projects-overview-page.md
