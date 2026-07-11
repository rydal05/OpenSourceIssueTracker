import { useEffect, useState } from "react";
import { sanitize } from "isomorphic-dompurify";
import { marked } from 'marked';
import { Repository } from "./page";

export default function GitHubMarkDown({ curRepo }: { curRepo: Repository }) {
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const rawUrl = `https://raw.githubusercontent.com/${curRepo.nameWithOwner}/${curRepo.defaultBranchRef.name}/README.md`;
    
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        async function fetchMarkdown() {
            try {
                const response = await fetch(rawUrl);

                // if (!response.ok) {
                //     throw new Error(`GitHub returned status: ${response.status}`);
                // }

                const rawMarkdown = await response.text();
                
                const htmlString = await marked.parse(rawMarkdown);
                const cleanHtml = sanitize(htmlString);

                if (isMounted) {
                    setHtmlContent(cleanHtml);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching markdown: ', err);
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        }

        fetchMarkdown();

        return () => {
            isMounted = false;
        };
    }, [rawUrl]);

    if (loading) {
        return <div>Loading README...</div>;
    }

    if (error) {
        return (
            <div>
                <p>This repository does not feature a README in the traditional location, or the request to find it has failed.</p>
            </div>
        );
    }

    return (
        <div>
            <article 
                className="w-full max-w-full overflow-scroll h-250"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
        </div>
    );
}