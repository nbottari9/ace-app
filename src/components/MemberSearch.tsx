"use client"
import { DMSans } from "@/app/fonts";
import { Member, MemberSearchProps } from "@/types/types";
import { Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MemberSearch = ({ props }: { props: MemberSearchProps }) => {

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<Member[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInput(query);

        // Filter the suggestions based on the input query
        if (query.length >= 3) {
            const filteredSuggestions = props.members.filter((m) =>
                m.name.toLowerCase().startsWith(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // If the query is empty, don't show any suggestions
        }
    };

    const handleSuggestionClick = (suggestion: Member) => {
        setInput(suggestion.name); // Set input to the clicked suggestion
        setSuggestions([]); // Clear suggestions
        props.setMember(suggestion)
    };
    return (
        <div className="flex flex-row flex-wrap gap-1 gap-y-4 justify-center items-begin w-1/2 rounded-3xl">
            <Input variant={"flushed"} _placeholder={{ color: "bg-neutral-300", font: DMSans.className }} placeholder="Search..." onChange={handleInputChange} value={input} className={`${DMSans.className} text-black border border-black rounded-md`} />
            {/* Suggestions list */}
            {suggestions.length > 0 && (
                <div className="flex flex-col gap-1 justify-begin w-full">
                    {suggestions.map((suggestion, index) => (
                        <button className="hover:bg-neutral-500 rounded-3xl flex flex-row items-center p-2" onClick={() => handleSuggestionClick(suggestion)} key={index} >
                            <div className={`${DMSans.className} text-black`}>{suggestion.name}</div>
                        </button>
                    ))}
                </div>
            )}
        </div >
    )
}