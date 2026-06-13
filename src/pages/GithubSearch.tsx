import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import PageLayout from "@/custom_components/PageLayout"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeftIcon, ChevronRightIcon, Search, Star } from "lucide-react"

import { useState, type ReactNode } from "react"



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
        type: string,
        login: string
    }
}

interface RepoSearchResult {
    total_count: number,
    items: RepoItem[]
}


export default function GithubSearchPage() {
    let [inputValue, setInputValue] = useState("")
    let [query, setQuery] = useState("")
    let [page, setPage] = useState(1)

    const goToPage = (pageIndex: number) => {
        setPage(pageIndex)
        window.scrollTo({ top: 0, behavior: "smooth", })
    }
    const { error, isLoading, data } = useQuery<RepoSearchResult>({
        queryKey: ['search', query, page],
        retry: false,
        enabled: !!query,
        queryFn: async (): Promise<RepoSearchResult> => {
            let res = await fetch(`https://api.github.com/search/repositories?q=${query}&page=${page}`)
            console.log(res.status)
            if (res.status !== 200) throw Error("error no data valid: es.json()");
            return res.json()
        }
    })


    return <PageLayout title="App Store Researcher">
        {/* {inputValue} */}
        <div className="bg-background flex w-full justify-center py-10 flex-col items-center gap-10">
            {/* Form */}
            <div className="w-full max-w-md ">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setQuery(inputValue)
                    setPage(1)
                    // refetch()
                }}>
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
                <RepoSearchResult data={data} isLoading={isLoading} error={error} >
                    <div className="flex gap-4  justify-center mt-4 ">
                        <Button
                            disabled={page === 1 || isLoading}
                            onClick={() => goToPage(page - 1)}
                            variant='ghost'
                        >
                            <ChevronLeftIcon></ChevronLeftIcon>
                            Prev {page-1}
                        </Button>

                        <span className="text-xs flex items-center text-muted-foreground m-auto">
                           Page: {page}
                        </span>

                        <Button
                            disabled={isLoading}
                            onClick={() => goToPage(page + 1)}
                            variant='ghost'
                        >
                            Next {page+1}
                            <ChevronRightIcon></ChevronRightIcon>
                        </Button>
                    </div>
                </RepoSearchResult>
            </div>

        </div>
    </PageLayout>
}


function RepoSearchResult({ data, isLoading, error, children }: { data?: RepoSearchResult, isLoading: boolean, error: Error | null, children: ReactNode }) {
    if (isLoading) {
        return <div className="flex  flex-col items-center gap-4 text-sm font-mono text-muted-foreground"><Spinner></Spinner>Searching ...</div>
    }
    if (error) {
        return <div className="text-destructive font-mono text-sm text-center">{error.message}</div>
    }

    if (!data) return null;
    return <div className="flex flex-col gap-3 ">
        <span className="text-sm text-muted-foreground ">
            {data.total_count.toLocaleString()} repositories found</span>
        {data.items.map((repo) => {
            return <a target="_blank" href={repo.html_url} className="border border-muted-foreground/25 flex flex-col gap-2 p-4 rounded-xl transition-colors duration-100 hover:bg-muted" key={repo.id}>
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img
                                src={repo.owner.avatar_url}
                                className="size-4 bg-muted rounded-full" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex gap-3 p-1">
                                <img
                                    src={repo.owner.avatar_url}
                                    className="size-10 bg-muted rounded-[8px] border border-amber-50/25" />
                                <div className="flex flex-col">
                                    <p className="text-sm">{repo.owner.login}</p>
                                    <p className="text-sm text-muted-foreground">{repo.owner.type}</p>
                                </div>
                            </div>
                        </TooltipContent>
                    </Tooltip>

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
        {children}
    </div>
}