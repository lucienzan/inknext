'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string>>
}

const SearchFormReset = ({setInput}: Props) => {
  const reset = () => {
    const form = document.querySelector("#search-form") as HTMLFormElement;
    if (form)
      form.reset();
      setInput("");
  }
  return (
    <button type='button' className='absolute right-15 top-1/2 -translate-y-1/2' onClick={reset}>
      <Link href="/"><Image src="/x.svg" alt="cross icon" width={18} height={20} /></Link>
    </button>
  )
}

export default SearchFormReset
