export default function getContents({ keyword = "" } = {}) {
    if (keyword) {
        const GET_REPOSITORIES = `
            query {
                viewer {
                repositories(first: 20, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
                    totalCount
                    pageInfo {
                    endCursor
                    hasNextPage
                    }
                    nodes{
                    id
                    name
                    owner {
                        avatarUrl
                        login
                    }
                    description
                    url
                    licenseInfo {
                        name
                        description
                    }
                    forkCount
                    stargazerCount
                    }
                }
                }
            }
            `;
    } else {

    }
    const apiURL = `http://localhost:8000/api/search?q=${keyword}`
    return fetch(apiURL)
      .then((res) => res.json())
      .then((response) => {
        const { result = [] } = response
        if (Array.isArray(result)) {
          const contents = result.map((info) => {
            const { id, provider, name, link, description, image, country, date, price } = info;
            return { id, provider, name, link, description, image, country, date, price };
          });
          return contents
        }
      });
  }