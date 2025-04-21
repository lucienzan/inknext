import React from "react";
import Form from "next/form";
import ClientSearchInput from "./SearchInput";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <div className="relative">
      <Form action="/" scroll={false}>
        <ClientSearchInput initialValue={query || ""} />
        <button
          className="absolute right-1 top-1 rounded bg-primary p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none hover:bg-primary/75 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
        >
          <Search className="size-4" />
        </button>
      </Form>
    </div>
  );
};

export default SearchForm;
