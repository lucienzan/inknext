// ClientSearchInput.tsx
'use client'

import React, { useState } from "react"
import SearchFormReset from "./SearchFormReset"

const ClientSearchInput = ({ initialValue }: { initialValue: string }) => {
  const [input, setInput] = useState(initialValue)

  return (
    <>
      <input
        type="text"
        className="input-group pr-25"
        name="query"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && (
        <SearchFormReset setInput={setInput} />
      )}
    </>
  )
}

export default ClientSearchInput
