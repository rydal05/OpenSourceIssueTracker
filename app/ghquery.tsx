import { error } from "console";
import { Repository } from "./page";

const GRAPHQL_URL = 'https://api.github.com/graphql'

export async function getRepoVerbose(repoId: string) {
    console.log("token check: ", process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN);

    const query = `
        query getRepoVerbose($repoId: ID!) {
            node(id: $repoId) {
                ... on Repository {
                    id
                    nameWithOwner
                    description
                    stargazerCount
                    url

                    issues(first:100, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                        totalCount
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                        nodes {
                            id
                            title
                            number
                            url
                            createdAt
                        }
                    }
                    
                    
                    languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                        nodes {
                            name
                        }
                    }
                    
                }
            }
        }  
    `;
    const response = await fetch('https://github.com', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {repoId}
        }),
    });

    if(!response.ok){
        throw new Error('Failed to fetch repo data');
    }

    const json = await response.json();
    const repo = json.data?.node;

    if(!repo){
        throw new Error('Repo ID malformed')
    }

    return {
        id: repo.id,
        name: repo.nameWithOwner,
        description: repo.description,
        stars: repo.stargazerCount,
        url: repo.url,
        totalIssuesCount: repo.issues.totalCount,
        recentIssues: repo.issues.nodes,
        hasNextIssuesPage: repo.issues.pageinfo.hasNextPage,
        issuesCursor: repo.issues.pageInfo.endCursor
    };
}

export async function getPopularRepos() {
    console.log("token check: ", process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN);

    const query = `
        query getPopularRepos {
        search(query: "stars:>10000 sort:stars-desc pushed:>=2026-06-01 archived:false is:public", type: REPOSITORY, first:50) {
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
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ query }),
        // next: { revalidate: 3600 } // hourly query
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data from Github');
    }

    const json = await response.json();
    return json.data.search.edges.map((edge: { node: Repository; }) => edge.node);
}