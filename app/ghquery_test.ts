//tsx --env-file=.env ./app/ghquery_test.ts


import { useState } from "react";
import { startChatbot } from "./gemini"
import { getPopularRepos } from "./ghquery";

async function test() {
    try {
        const repos = await getPopularRepos();
        console.log(repos);
        startChatbot(repos);
    } catch (error) {
        console.error("Error fetching popular repos: ", error);
    }


      
}

test();