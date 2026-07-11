
const GRAPHQL_URL = 'https://api.github.com/graphql'

export async function getPopularRepos() {
    console.log("token check: ", process.env.GH_ACCESS_TOKEN);

    const query = `
        query getPopularRepos {
        search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first:10) {
            edges {
                node {
                    ... on Repository {
                        id
                        nameWithOwner
                        stargazerCount
                        description
                        url
                        isArchived
                        

                        languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                            nodes {
                                name
                            }
                        }
                        openIssues: issues(states: OPEN){
                            totalCount
                        }
                        openPRs: pullRequests(states: OPEN){
                            totalCount
                        }

                        repositoryTopics(first: 10) {
                            nodes {
                                topic {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `;

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GH_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ query }),
        // next: { revalidate: 3600 } // hourly query
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data from Github');
    }

    const json = await response.json();
    return json.data.search.edges.map((edge: { node: any; }) => edge.node);
}

