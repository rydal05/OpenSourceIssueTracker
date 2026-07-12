import { Repository } from "./page";

const GRAPHQL_URL = 'https://api.github.com/graphql';

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
                    pullRequests(first: 50, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                        totalCount
                        nodes {
                            id
                            title
                            number
                            url
                            createdAt
                        }
                    }
                    issues(first:50, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                        totalCount
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
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { repoId }
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch repo data');
    }

    const json = await response.json();
    const repo = json.data?.node;

    if (!repo) {
        throw new Error('Repo ID malformed');
    }

    return {
        id: repo.id,
        name: repo.nameWithOwner,
        description: repo.description,
        stars: repo.stargazerCount,
        url: repo.url,
        totalIssuesCount: repo.issues.totalCount,
        recentIssues: repo.issues.nodes,
        totalPRsCount: repo.pullRequests.totalCount,
        recentPRs: repo.pullRequests.nodes,
    };
}

export async function getPopularRepos(): Promise<Repository[]> {
  console.log("token check: ", process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN);

  // 1. Shared fragment to keep queries clean and make sure owner details are fetched
  const repoFieldsFragment = `
    fragment RepoFields on Repository {
      id
      owner {
        login
      }
      nameWithOwner
      stargazerCount
      description
      url
      isArchived
      defaultBranchRef {
        name
      }
      languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
        nodes {
          name
        }
      }
      issues(states: OPEN) {
        totalCount
      }
      pullRequests(states: OPEN) {
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
  `;

  // 2. Define the 4 distinct, non-overlapping search parameters
  const queries = [
    `query { search(query: "stars:>10000 sort:stars-desc pushed:>=2026-06-01 archived:false is:public", type: REPOSITORY, first: 50) { edges { node { ...RepoFields } } } } ${repoFieldsFragment}`,
    `query { search(query: "stars:>10000 sort:stars-asc pushed:>=2026-06-01 archived:false is:public", type: REPOSITORY, first: 50) { edges { node { ...RepoFields } } } } ${repoFieldsFragment}`,
    `query { search(query: "stars:1000..10000 sort:stars-desc pushed:>=2026-06-01 archived:false is:public", type: REPOSITORY, first: 50) { edges { node { ...RepoFields } } } } ${repoFieldsFragment}`,
    `query { search(query: "stars:1000..10000 sort:stars-asc pushed:>=2026-06-01 archived:false is:public", type: REPOSITORY, first: 50) { edges { node { ...RepoFields } } } } ${repoFieldsFragment}`
  ];

  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    // 3. Fire all 4 unique search requests in parallel (much faster than sequential awaits)
    const requests = queries.map(q => 
      fetch(GRAPHQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: q }) // Explicitly setting the object property key to 'query'
      }).then(res => {
        if (!res.ok) throw new Error('GitHub fetch chunk failed');
        return res.json();
      })
    );

    const results = await Promise.all(requests);

    // 4. Flatten all the returned node groups into a single array
    const allRawNodes = results.flatMap(json => 
      json.data?.search?.edges?.map((e: any) => e.node) || []
    );

    // 5. Safely map everything to your frontend's implementation model
    return allRawNodes.map((n: any) => ({
      id: n.id,
      owner: n.owner.login,
      nameWithOwner: n.nameWithOwner,
      description: n.description ?? '',
      url: n.url,
      totalIssues: n.issues.totalCount,
      totalPRs: n.pullRequests.totalCount,
      languages: n.languages,
      archived: n.isArchived,
      stars: n.stargazerCount,
      repositoryTopics: n.repositoryTopics,
      defaultBranchRef: n.defaultBranchRef ?? { name: 'main' }
    }));

  } catch (err) {
    console.error("Error executing parallel queries: ", err);
    throw new Error("Failed to compile non-overlapping requests.");
  }
}