import { sanitize } from "isomorphic-dompurify";
import { marked } from 'marked';

interface GitHubMarkdownProps {
    ownerRepo: string;
    path: string;
    branch?: string;
}

export default async function GitHubMarkDown({
    ownerRepo,
    path,
    branch = 'main'
}: GitHubMarkdownProps) {
    const rawUrl = `https://githubusercontent.com{ownerRepo}/${branch}/README.md`;

    try {
        const response = await fetch(rawUrl);

        if (!response.ok) {
            throw new Error(`Github returned error status: ${response.status}`);
        }

        const rawMarkdown = await response.text();

        const htmlString = await marked.parse(rawMarkdown);
        const cleanHtml = sanitize(htmlString)

        return (
            <div>
                <article className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: cleanHtml }} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching markdown: ',error);
        return (
            <div>
                <p>This repository does not feature a README in the traditional location, or the request to find it has failed.</p>
            </div>
        );
    }
}