import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import PageLayout from "@/custom_components/PageLayout"
import { Search, Star } from "lucide-react"
import { useState, type SyntheticEvent } from "react"



interface RepoItem {
    id: string
    name: string
    full_name: string,
    description: string,
    language: string,
    html_url: string
    stargazers_count: number
    owner: {
        avatar_url: string,
        type: string
    }
}

interface RepoSearchResult {
    total_count: number,
    items: RepoItem[]
}

type RepoSearchState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success", value: RepoSearchResult }
    | { status: "failure", message: string }

export default function GithubSearchPage() {
    let [inputValue, setInputValue] = useState("")
    let [searchState, setSearchState] = useState<RepoSearchState>({ status: 'idle' })
    const isLoading = searchState.status === "loading"



    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // setInputValue("Success");
        setSearchState({ status: 'loading' })

        try {
            const res = await fetch(`https://api.github.com/search/repositories?q=${inputValue}`)
            if (!res.ok) throw new Error(`Github API Error with StatusCode: ${res.status}`)
            const json: RepoSearchResult = await res.json()
            setSearchState({ status: 'success', value: json })
        } catch (e: any) {
            setSearchState({ status: 'failure', message: String(e) })
        }

    }

    return <PageLayout title="App Store Researcher">
        {/* {inputValue} */}
        <div className="bg-background flex w-full justify-center py-10 flex-col items-center gap-10">
            {/* Form */}
            <div className="w-full max-w-md ">
                <form onSubmit={onSubmit}>
                    <Field orientation='horizontal'>
                        <Input
                            style={{ userSelect: 'text', pointerEvents: 'auto' }}
                            id='link'
                            placeholder="Search repositories..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.toString())}
                            type="text"
                           
                            required
                        ></Input>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner /> : <Search />}
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </Field>
                </form>
            </div>

            <div className="max-w-2xl w-full">
                <RepoSearchResult state={searchState} />
            </div>
        </div>
    </PageLayout>
}


function RepoSearchResult({ state }: { state: RepoSearchState }) {

    switch (state.status) {
        case "idle":
            return <></>
        case "loading":
            return <div className="flex  flex-col items-center gap-4 text-sm font-mono text-muted-foreground"><Spinner></Spinner>Searching ...</div>
        case "success":
            return <div className="flex flex-col gap-2 ">
                <span className="text-sm text-muted-foreground mb-1">
                    {state.value.total_count.toLocaleString()} repositories found</span>
                {state.value.items.map((repo) => {
                    return <a target="_blank" href={repo.html_url} className="border flex flex-col gap-2 p-4 rounded-xl transition-colors duration-100 hover:bg-muted" key={repo.id}>
                        {/* Header */}
                        <div className="flex items-center gap-2">
                            <img
                                src={repo.owner.avatar_url + 'fsf'}
                                className="size-4 bg-muted rounded-full" />
                            <span className="text-sm w-full">{repo.full_name}</span>
                            {!(repo.owner.type === 'User') && <Badge variant='secondary'>{repo.owner.type}</Badge>}
                        </div>
                        <span className="text-sm text-muted-foreground">{repo.description}</span>
                        <div className="flex items-center gap-3">
                            {repo.language && <span className="text-xs text-muted-foreground flex">
                                {repo.language}

                            </span>}
                            <span className="text-xs text-muted-foreground flex gap-2 items-center">
                                <Star className="size-3"></Star>
                                {repo.stargazers_count}
                            </span>
                        </div>
                    </a >

                })}
            </div>
        case "failure":
            return <div className="text-destructive font-mono text-sm">state.message</div>
    }
}